import * as types from "./types";

const result = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

export const getByFilter = payload => result(types.GET_<%= entityName %>, payload);
export const getByFilterSuccess = payload => result(types.GET_<%= entityName %>_SUCCESS, payload);
export const getByFilterError = payload => result(types.GET_<%= entityName %>_FAILED, payload);

export const getById = payload => result(types.GET_<%= entityName %>_BY_ID, payload);
export const getByIdSuccess = payload => result(types.GET_<%= entityName %>_BY_ID_SUCCESS, payload);
export const getByIdError = payload => result(types.GET_<%= entityName %>_BY_ID_FAILED, payload);

export const createRecord = payload => result(types.SAVE_<%= entityName %>, payload);
export const createRecordSuccess = payload => result(types.SAVE_<%= entityName %>_SUCCESS, payload);
export const createRecordError = payload => result(types.SAVE_<%= entityName %>_FAILED, payload);

export const updateRecord = payload => result(types.UPDATE_<%= entityName %>, payload);
export const updateRecordSuccess = payload => result(types.UPDATE_<%= entityName %>_SUCCESS, payload);
export const updateRecordError = payload => result(types.UPDATE_<%= entityName %>_FAILED, payload);

export const getAll = payload => result(types.GET_ALL_<%= entityName %>S, payload);
export const getAllSuccess = payload => result(types.GET_ALL_<%= entityName %>S_SUCCESS, payload);
export const getAllError = payload => result(types.GET_ALL_<%= entityName %>S_FAILED, payload);

export const deleteRecord = payload => result(types.DELETE_<%= entityName %>, payload);
export const deleteRecordSuccess = payload => result(types.DELETE_<%= entityName %>_SUCCESS, payload);
export const deleteRecordError = payload => result(types.DELETE_<%= entityName %>_FAILED, payload);

export const clearState = (payload = {clearAll = false}) => result(types.CLEAR_STATE, payload);