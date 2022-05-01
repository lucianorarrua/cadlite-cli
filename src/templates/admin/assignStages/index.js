import React, { useState, useEffect, useMemo } from "react";
import { Row, Form, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../missionStages/redux-sagas/actions";
import GenericModal from "../../components/genericModal";
import StagesAvailableList from "./components/stagesAvailableList";
import StagesDraggableTree from "./components/stagesDraggableTree";
import missionStageApi from "api/cadlite/missionStageConfig";
import { useNotification } from "hooks/useNotification";
import { useQueryRequest } from "hooks/useQueryRequest";
import { useMutationRequest } from "hooks/useMutationRequest";
import "../index.scss";
import "./index.scss";

const { Text } = Typography;

const AssignStages = ({
  missionToAssignStages,
  onClose,
  onFinish,
  show,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation("translations");
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const { items: availableMissionStages, loading: loadingAvailableMissionStages } = useSelector(state => state.missionStages);

  /* Esto lo puedo manejar local con el hook que hice */
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)
  const {
    data: missionStages,
    loading: loadingMissionStages,
    sendRequest: refreshMissionStages
  } = useQueryRequest({
    request: missionStageApi.getById,
    onError: openErrorNotification,
    requestArgs: [
      missionToAssignStages?.id
    ],
    responsePipeFunction: (data) => data?.data?.elements,
  });
  const {
    loading: creatingLog,
    mutate: submitNoteHandler
  } = useMutationRequest({
    mutationFunction: (text) => selectedUnit?.unitId && text && missionStageApi.saveStages(selectedUnit?.unitId, { text }),
    onError: openErrorNotification,
    onSuccess: successAddLogHandler,
  })

  useEffect(() => {
    dispatch(getAll());
  }, []);

  useEffect(() => {
    /* dispatch(getAll()); */
  }, [missionStages]);

  useEffect(() => {
    missionToAssignStages && refreshMissionStages()
  }, [missionToAssignStages]);

  const clear = () => {
    form.resetFields();
  };

  const cancelModalHandler = () => {
    onClose && onClose();
    clear();
  }

  return (
    <GenericModal
      title={`${t("missions_admin.assign_mission_stages")} (${missionToAssignStages?.name || ''})`}
      visible={show}
      creating={creating}
      updating={updating}
      loading={false}
      form={form}
      className="assign-stages-to-mission-cadlite"
      onCancel={cancelModalHandler}
      closable={true}
      width={850}
    >
      <Row wrap={false} gutter={28}>
        <Col span={8} >
          <StagesAvailableList
            availableMissionStages={availableMissionStages}
          />
        </Col>
        <Col span={16} className="stage-assigned">
          <Text strong>
            {t("missions_admin.assigned")}
          </Text>
          <StagesDraggableTree
            currentMissionStages={missionStages}
          />
        </Col>
      </Row>
    </GenericModal>

  );
};

export default AssignStages;
