import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import api from "api/cadlite/missions";

function* watchGetMissionsFilter() {
  yield takeEvery(
    types.GET_MISSION,
    function* (action) {
      try {
        const response = yield call(api.getByFilter, action.payload);
        yield put(
          actions.getByFilterSuccess({ ...response.data.result, autocompletable: action.payload?.autocompletable })
        );
      } catch (error) {
         if (error?.response?.data?.code === 92) { // 92 es el código de error si no hay registros
      return yield put(actions.getByFilterSuccess({ ...[], autocompletable: action.payload?.autocompletable }));
  }
 if (!action.payload?.autocompletable) yield put(actions.getByFilterError(error.response?.data?.message));
      }
    }
  );
}

function* watchGetAllMissions() {
  yield takeEvery(
    types.GET_ALL_MISSIONS,
    function* (action) {
      try {
        const { data } = yield call(api.getAll, action.payload);
        yield put(actions.getAllSuccess(data));
      } catch (error) {
        yield put(actions.getAllError(error.response?.data?.message));
      }
    });
}

function* watchGetById() {
  yield takeEvery(
    types.GET_MISSION_BY_ID,
    function* (action) {
      try {
        const { data } = yield call(api.getById, action.payload);
        yield put(actions.getByIdSuccess(data));
      } catch (error) {
        yield put(actions.getByIdError(error.response?.data?.message));
      }
    });
}

function* watchSaveMission() {
  yield takeEvery(
    types.SAVE_MISSION,
    function* (action) {
      try {
        yield call(api.create, action.payload);
        yield put(actions.createRecordSuccess());
      } catch (error) {
        yield put(actions.createRecordError(error?.response?.data?.message))
      }
    });
}

function* watchUpdateMission() {
  yield takeEvery(
    types.UPDATE_MISSION,
    function* (action) {
      try {
        yield call(api.update, action.payload);
        yield put(actions.updateRecordSuccess());
      } catch (error) {
        yield put(actions.updateRecordError(error?.response?.data?.message))
      }
    });
}

function* missionsSaga() {
  yield all([
    fork(watchGetMissionsFilter),
    fork(watchGetAllMissions),
    fork(watchGetById),
    fork(watchSaveMission),
    fork(watchUpdateMission),
  ]);
}

export default missionsSaga;
