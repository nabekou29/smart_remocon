import * as api from '../../api';

import {
  RemoconActionTypes,
  initialize,
  sendSignal,
} from '../../actions/remocon';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

/** 初期化 */
function* runInitialization(action: ReturnType<typeof initialize.start>) {
  try {
    const { remoconId } = action.payload;
    const { remocon, signals } = yield call(() =>
      api.findRemoconAndSignals(remoconId)
    );
    yield put(initialize.succeed({ remocon, signals }));
  } catch (error) {
    yield put(initialize.fail(error));
  }
}

/** 信号送信 */
function* runSendingSignal(action: ReturnType<typeof sendSignal.start>) {
  try {
    const { signalId } = action.payload;
    yield call(() => api.sendSignal(signalId, 0));
    yield put(sendSignal.succeed());
  } catch (error) {
    yield put(sendSignal.fail(error));
  }
}

export default function* remoconSaga() {
  yield all([
    takeLatest(RemoconActionTypes.INITIALIZE_START, runInitialization),
    takeEvery(RemoconActionTypes.SEND_SIGNAL_START, runSendingSignal),
  ]);
}
