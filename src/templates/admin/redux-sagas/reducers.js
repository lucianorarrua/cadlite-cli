import createReducer from "store/createReducer";
import * as types from "./types";

const DEFAULT_ERROR = "alert.error";

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

const MissionReducer = createReducer(initialState, {
  [types.GET_MISSION](state, action) {
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
  [types.GET_MISSION_FAILED](state, action) {
    return {
      ...state,
      loading: false,
      finish: "ERROR_GET",
      errorMessage: action.payload || DEFAULT_ERROR,
    };
  },
  [types.GET_MISSION_SUCCESS](state, action) {
    return {
      ...state,
      [action?.payload?.autocompletable ? "options" : "items"]: action.payload?.elements || [],
      [action?.payload?.autocompletable ? "loadingAuto" : "loading"]: false,
      total: action.payload?.total || 0,
    };
  },
  [types.GET_ALL_MISSIONS](state, action) {
    return {
      ...state,
      loading: true,
      finish: undefined,
      errorMessage: undefined,
    };
  },
  [types.GET_ALL_MISSIONS_FAILED](state, action) {
    return {
      ...state,
      loading: false,
      finish: "ERROR_GET",
      errorMessage: action.payload || DEFAULT_ERROR,
    };
  },
  [types.GET_ALL_MISSIONS_SUCCESS](state, action) {
    return {
      ...state,
      items: action.payload || [],
      loading: false,
    };
  },
  [types.SAVE_MISSION](state, action) {
    return {
      ...state,
      creating: true,
      finish: undefined,
    };
  },
  [types.SAVE_MISSION_FAILED](state, action) {
    return {
      ...state,
      creating: false,
      finish: "ERROR_CREATE",
      errorMessage: action.payload,
    };
  },
  [types.SAVE_MISSION_SUCCESS](state, action) {
    return {
      ...state,
      creating: false,
      finish: "SUCCESS_CREATE",
    };
  },
  [types.UPDATE_MISSION](state, action) {
    return {
      ...state,
      updating: true,
      finish: undefined,
    };
  },
  [types.UPDATE_MISSION_FAILED](state, action) {
    return {
      ...state,
      updating: false,
      finish: "ERROR_UPDATE",
      errorMessage: action.payload,
    };
  },
  [types.UPDATE_MISSION_SUCCESS](state, action) {
    return {
      ...state,
      updating: false,
      finish: "SUCCESS_UPDATE",
    };
  },
  [types.DELETE_MISSION](state, action) {
    return {
      ...state,
      deleting: true,
      finish: undefined,
    };
  },
  [types.DELETE_MISSION_FAILED](state, action) {
    return {
      ...state,
      deleting: false,
      finish: "ERROR_DELETE",
      errorMessage: action.payload,
    };
  },
  [types.DELETE_MISSION_SUCCESS](state, action) {
    return {
      ...state,
      deleting: false,
      finish: "SUCCESS_DELETE",
    };
  },
});

export default MissionReducer;
