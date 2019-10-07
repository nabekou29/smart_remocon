import * as api from '../../api';

import { TopActionTypes, initialize, register } from '../../actions/top';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { Remocon } from '../../interfaces/entities';

/** 初期化 */
function* runInitialization() {
  try {
    const remocons: Remocon[] = yield call(api.findAllRemocon);
    yield put(initialize.succeed({ remocons }));
  } catch (error) {
    yield put(initialize.fail(error));
  }
}

/** 登録 */
function* runRegistration(action: ReturnType<typeof register.start>) {
  try {
    const remocon: Remocon = yield call(() =>
      api.createRemocon(action.payload.name)
    );
    yield put(register.succeed(action.payload, { remocon }));
  } catch (error) {
    yield put(register.fail(action.payload, error));
  }
}

export default function* topSaga() {
  yield all([
    takeLatest(TopActionTypes.INITIALIZE_START, runInitialization),
    takeEvery(TopActionTypes.REGISTER_START, runRegistration),
  ]);
}
