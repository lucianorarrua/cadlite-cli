import React, { useState, useMemo, useLayoutEffect } from "react";
import { Col, Row, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { getByFilter, createRecord, updateRecord } from "./redux-sagas/actions";
import { useTable } from "hooks/useTable";
import { DevicePanelProfileIcon } from "components/icons";
import Head from "../components/header/head";
import FormAddEditModal from "./form";
import AssignStagesModal from "./assignStages/index";
import Message from "features/aliados/dashboard/messageModal/messageModal";
import TableAliados from "components/customTable/tableAliados";
import EditButton from "cad-lite/Admin/components/editButton";

import "./index.scss";

const MissionsList = () => {
  const { t } = useTranslation("translations");
  const [missionToAssignStages, setMissionToAssignStages] = useState();

  const {
    onCreate,
    onChange,
    onSearch,
    onUpdate,
    onSelect,
    onCheckChange,
    data: {
      items,
      total,
      loading,
      creating,
      options,
      updating,
      statusLoading,
      loadingAuto,
      innerState: { openModal, showMessage },
    },
    innerStateMethod: { setOpenModal, setShowMessage },
  } = useTable({
    reducer: "Mission",
    getByFilter,
    createRecord,
    updateRecord,
    onFinish: ({ message }) => message && setShowMessage(message),
  });

  useLayoutEffect(() => {
    console.log("🚀 ~ file: list.js ~ line 52 ~ MissionsList ~ items", items)
    if (!!items && !!items.length) {
      setMissionToAssignStages(items[0])
    }
  }, [items])
  
  const onClickAgregarHandler = () => setOpenModal(true);

  const columns = [
    {
      index: "name",
      name: t("missions_admin.mission_name"),
      sort: true,
    },
    {
      index: "active",
      name: t("admin_phone.col_estatus"),
      sort: false,
      render: (status, row) => (
        <Row align="middle">
          <Switch loading={statusLoading[row.id]} onChange={v => onCheckChange(row, v)} checked={status} />
          <p style={{ margin: "0 0 0 10px" }}>
            {status ? t("admin_dashboard.Switch_on") : t("admin_dashboard.Switch_off")}
          </p>
        </Row>
      ),
    },
    {
      index: "option",
      name: t("admin_dashboard.Options"),
      sort: false,
      render: (_, r) => (
        <Row justify="space-between" wrap={false} className="option-row-admin-cadlite">
          <Col onClick={() => setMissionToAssignStages(r)}>
            <DevicePanelProfileIcon />
          </Col>
          <Col>
            <EditButton onClick={() => setOpenModal(r)} />
          </Col>
        </Row>
      ),
    },
  ];

  const AssignStagesModalMemorized = useMemo(
    () => (
      <AssignStagesModal
        show={!!missionToAssignStages}
        missionToAssignStages={missionToAssignStages}
        onClose={() => setMissionToAssignStages()}
        onFinish={{}}
      />
    ),
    [missionToAssignStages, setMissionToAssignStages]
  );

  return (
    <div className="mission-admin-cadlite catalogue-card">
      <Head
        title={t("missions_admin.title")}
        buttonText={t("header_admin.buton")}
        onClick={onClickAgregarHandler}
        options={options}
        handleSearch={onSearch}
        onSelect={onSelect}
        loadingAuto={loadingAuto}
      />
      <div className="catalogue-card-body">
        <TableAliados
          labelPagination={t("perfil_admin.filter_pag")}
          loading={loading}
          columns={columns}
          body={items}
          change={onChange}
          total={total}
        />
      </div>
      <FormAddEditModal
        show={!!openModal}
        isEdit={typeof openModal === "object"}
        data={typeof openModal === "object" ? openModal : {}}
        creating={creating}
        updating={updating}
        onClose={() => setOpenModal(false)}
        onFinish={[onCreate, onUpdate]}
      />
      {AssignStagesModalMemorized}
      <Message showMessage={showMessage} cancel={() => setShowMessage(false)} title={showMessage} />
    </div>
  );
};

export default MissionsList;
