import * as types from './types'

const result = (type, payload) => {
  return {
    type: type,
    payload: payload
  }
}

export const getByFilter = payload => result(types.GET_<%= entityNameSnakeCase %>, payload)
export const getByFilterSuccess = payload => result(types.GET_<%= entityNameSnakeCase %>_SUCCESS, payload)
export const getByFilterError = payload => result(types.GET_<%= entityNameSnakeCase %>_FAILED, payload)

export const getById = payload => result(types.GET_<%= entityNameSnakeCase %>_BY_ID, payload)
export const getByIdSuccess = payload => result(types.GET_<%= entityNameSnakeCase %>_BY_ID_SUCCESS, payload)
export const getByIdError = payload => result(types.GET_<%= entityNameSnakeCase %>_BY_ID_FAILED, payload)

export const createRecord = payload => result(types.SAVE_<%= entityNameSnakeCase %>, payload)
export const createRecordSuccess = payload => result(types.SAVE_<%= entityNameSnakeCase %>_SUCCESS, payload)
export const createRecordError = payload => result(types.SAVE_<%= entityNameSnakeCase %>_FAILED, payload)

export const updateRecord = payload => result(types.UPDATE_<%= entityNameSnakeCase %>, payload)
export const updateRecordSuccess = payload => result(types.UPDATE_<%= entityNameSnakeCase %>_SUCCESS, payload)
export const updateRecordError = payload => result(types.UPDATE_<%= entityNameSnakeCase %>_FAILED, payload)

export const getAll = payload => result(types.GET_ALL_<%= entityNameSnakeCase %>S, payload)
export const getAllSuccess = payload => result(types.GET_ALL_<%= entityNameSnakeCase %>S_SUCCESS, payload)
export const getAllError = payload => result(types.GET_ALL_<%= entityNameSnakeCase %>S_FAILED, payload)

export const deleteRecord = payload => result(types.DELETE_<%= entityNameSnakeCase %>, payload)
export const deleteRecordSuccess = payload => result(types.DELETE_<%= entityNameSnakeCase %>_SUCCESS, payload)
export const deleteRecordError = payload => result(types.DELETE_<%= entityNameSnakeCase %>_FAILED, payload)

export const clearState = (payload = { clearAll: false }) => result(types.CLEAR_STATE, payload)
