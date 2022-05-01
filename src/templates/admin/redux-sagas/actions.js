import * as types from "./types";

const result = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

export const getByFilter = payload => result(types.GET_MISSION, payload);
export const getByFilterSuccess = payload => result(types.GET_MISSION_SUCCESS, payload);
export const getByFilterError = payload => result(types.GET_MISSION_FAILED, payload);

export const getById = payload => result(types.GET_MISSION_BY_ID, payload);
export const getByIdSuccess = payload => result(types.GET_MISSION_BY_ID_SUCCESS, payload);
export const getByIdError = payload => result(types.GET_MISSION_BY_ID_FAILED, payload);

export const createRecord = payload => result(types.SAVE_MISSION, payload);
export const createRecordSuccess = payload => result(types.SAVE_MISSION_SUCCESS, payload);
export const createRecordError = payload => result(types.SAVE_MISSION_FAILED, payload);

export const updateRecord = payload => result(types.UPDATE_MISSION, payload);
export const updateRecordSuccess = payload => result(types.UPDATE_MISSION_SUCCESS, payload);
export const updateRecordError = payload => result(types.UPDATE_MISSION_FAILED, payload);

export const getAll = payload => result(types.GET_ALL_MISSIONS, payload);
export const getAllSuccess = payload => result(types.GET_ALL_MISSIONS_SUCCESS, payload);
export const getAllError = payload => result(types.GET_ALL_MISSIONS_FAILED, payload);

export const deleteRecord = payload => result(types.DELETE_MISSION, payload);
export const deleteRecordSuccess = payload => result(types.DELETE_MISSION_SUCCESS, payload);
export const deleteRecordError = payload => result(types.DELETE_MISSION_FAILED, payload);
