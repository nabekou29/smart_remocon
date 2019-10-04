import * as api from '../../api';

import { TopActionTypes, initialize } from '../../actions/top';
import { all, call, put, takeLatest } from 'redux-saga/effects';

/** 初期化 */
function* runInitialization() {
  try {
    const remocons = yield call(api.findAllRemocon);
    yield put(initialize.succeed({ remocons }));
  } catch (error) {
    yield put(initialize.fail(error));
  }
}

export default function* topSaga() {
  yield all([takeLatest(TopActionTypes.INITIALIZE_START, runInitialization)]);
}
