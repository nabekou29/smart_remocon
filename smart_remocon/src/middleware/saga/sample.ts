import * as sampleApi from '../../api/sample';

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { initialize, register, sampleActionTypes } from '../../actions/sample';

/** 初期化 */
function* runInitialization() {
  try {
    const samples = yield call(sampleApi.getSamples);
    yield put(initialize.succeed({ samples }));
  } catch (error) {
    yield put(initialize.fail(error));
  }
}

/** 登録 */
function* runRegistration({ payload }: ReturnType<typeof register.start>) {
  try {
    const sample = yield call(sampleApi.createSample, payload);
    yield put(register.succeed(payload, { sample }));
  } catch (error) {
    yield put(register.fail(payload, error));
  }
}

export default function* sampleSaga() {
  yield all([
    takeLatest(sampleActionTypes.INITIALIZE_START, runInitialization),
    takeEvery(sampleActionTypes.REGISTER_START, runRegistration),
  ]);
}
