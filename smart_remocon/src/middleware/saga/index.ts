import 'isomorphic-unfetch';

import { all } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import sampleSaga from './sample';

es6promise.polyfill();

/** ルートのSaga */
function* rootSaga() {
  yield all([sampleSaga()]);
}

export default rootSaga;
