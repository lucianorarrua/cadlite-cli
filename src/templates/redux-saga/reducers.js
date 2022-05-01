import createReducer from "store/createReducer";
import * as types from "./types";

const initialState = {
  items: [],
  total: 0,
  loading: false,
  options: [],
  loadingAuto: false,
  deleting: false,
  creating: false,
  updating: false,
  finish: undefined,
  errorMessage: undefined,
};

export default createReducer(initialState, {
  [types.GET_<%= entityName %>](state, action) {
    return {
      ...state,
      [action?.payload?.autocompletable ? "options" : "items"]: action?.payload?.autocompletable
        ? []
        : [...state.items],
      [action?.payload?.autocompletable ? "loadingAuto" : "loading"]: true,
      finish: undefined,
      errorMessage: undefined,
    };
  },
  [types.GET_<%= entityName %>_FAILED](state, action) {
    return {
      ...state,
      loading: false,
      finish: "ERROR_GET",
      errorMessage: action.payload,
    };
  },
  [types.GET_<%= entityName %>_SUCCESS](state, action) {
    return {
      ...state,
      [action?.payload?.autocompletable ? "options" : "items"]: action.payload?.elements || [],
      [action?.payload?.autocompletable ? "loadingAuto" : "loading"]: false,
      total: action.payload?.total || 0,
    };
  },
  [types.GET_ALL_<%= entityName %>S](state, action) {
    return {
      ...state,
      loading: true,
      finish: undefined,
      errorMessage: undefined,
    };
  },
  [types.GET_ALL_<%= entityName %>S_FAILED](state, action) {
    return {
      ...state,
      loading: false,
      finish: "ERROR_GET",
      errorMessage: action.payload,
    };
  },
  [types.GET_ALL_<%= entityName %>S_SUCCESS](state, action) {
    return {
      ...state,
      items: action.payload || [],
      loading: false,
    };
  },
  [types.SAVE_<%= entityName %>](state, action) {
    return {
      ...state,
      creating: true,
      finish: undefined,
    };
  },
  [types.SAVE_<%= entityName %>_FAILED](state, action) {
    return {
      ...state,
      creating: false,
      finish: "ERROR_CREATE",
      errorMessage: action.payload,
    };
  },
  [types.SAVE_<%= entityName %>_SUCCESS](state, action) {
    return {
      ...state,
      creating: false,
      finish: "SUCCESS_CREATE",
    };
  },
  [types.UPDATE_<%= entityName %>](state, action) {
    return {
      ...state,
      updating: true,
      finish: undefined,
    };
  },
  [types.UPDATE_<%= entityName %>_FAILED](state, action) {
    return {
      ...state,
      updating: false,
      finish: "ERROR_UPDATE",
      errorMessage: action.payload,
    };
  },
  [types.UPDATE_<%= entityName %>_SUCCESS](state, action) {
    return {
      ...state,
      updating: false,
      finish: "SUCCESS_UPDATE",
    };
  },
  [types.DELETE_<%= entityName %>](state, action) {
    return {
      ...state,
      deleting: true,
      finish: undefined,
    };
  },
  [types.DELETE_<%= entityName %>_FAILED](state, action) {
    return {
      ...state,
      deleting: false,
      finish: "ERROR_DELETE",
      errorMessage: action.payload,
    };
  },
  [types.DELETE_<%= entityName %>_SUCCESS](state, action) {
    return {
      ...state,
      deleting: false,
      finish: "SUCCESS_DELETE",
    };
  },
});