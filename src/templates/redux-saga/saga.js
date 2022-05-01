import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import * as types from './types'
import * as actions from './actions'
import api from 'api/cadlite/missions'

function * watchGetFilter () {
  yield takeEvery(
    types.GET_<%= entityName %>,
    function * (action) {
      try {
        const response = yield call(api.getByFilter, action.payload)
        yield put(
          actions.getByFilterSuccess({ ...response.data.result, autocompletable: action.payload?.autocompletable })
        )
      } catch (error) {
        if (error?.response?.data?.code === 92) { // 92 es el código de error si no hay registros
          return yield put(actions.getByFilterSuccess({ ...[], autocompletable: action.payload?.autocompletable }))
        }
        if (!action.payload?.autocompletable) yield put(actions.getByFilterError(error?.response?.data?.message || 'alert.error'))
      }
    }
  )
}

function * watchGetAll () {
  yield takeEvery(
    types.GET_ALL_<%= entityName %>S,
    function * (action) {
      try {
        const { data } = yield call(api.getAll, action.payload)
        yield put(actions.getAllSuccess(data))
      } catch (error) {
        yield put(actions.getAllError(error?.response?.data?.message || 'alert.error'))
      }
    })
}

function * watchGetById () {
  yield takeEvery(
    types.GET_<%= entityName %>_BY_ID,
    function * (action) {
      try {
        const { data } = yield call(api.getById, action.payload)
        yield put(actions.getByIdSuccess(data))
      } catch (error) {
        yield put(actions.getByIdError(error?.response?.data?.message || 'alert.error'))
      }
    })
}

function * watchSave () {
  yield takeEvery(
    types.SAVE_<%= entityName %>,
    function * (action) {
      try {
        yield call(api.create, action.payload)
        yield put(actions.createRecordSuccess())
      } catch (error) {
        yield put(actions.createRecordError(error?.response?.data?.message || 'alert.error'))
      }
    })
}

function * watchUpdate () {
  yield takeEvery(
    types.UPDATE_<%= entityName %>,
    function * (action) {
      try {
        yield call(api.update, action.payload)
        yield put(actions.updateRecordSuccess())
      } catch (error) {
        yield put(actions.updateRecordError(error?.response?.data?.message || 'alert.error'))
      }
    })
}

function * watchDelete () {
  yield takeEvery(
    types.DELETE_<%= entityName %>,
    function * (action) {
      try {
        yield call(api.delete, action.payload)
        yield put(actions.deleteRecordSuccess())
      } catch (error) {
        yield put(actions.deleteRecordError(error?.response?.data?.message || 'alert.error'))
      }
    })
}

export default function * () {
  yield all([
    fork(watchGetFilter),
    fork(watchGetAll),
    fork(watchGetById),
    fork(watchSave),
    fork(watchUpdate),
    fork(watchDelete)
  ])
}
