import 'firebase/firestore';
import 'firebase/database';

import * as firebase from 'firebase/app';

import { Remocon, Signal } from '../interfaces/entities';
import { remoconDao, signalDao } from '../utils/dao';

import firebaseConfig from '../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

/**
 * 指定分後に信号を送信します
 * @param signalId 信号ID
 * @param minutes 何分後か
 */
export const sendSignal = async (
  signalId: string,
  minutes: number = 0
): Promise<any> => {
  const data = {
    signal_id: signalId,
    minutes,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  };
  return await firebase
    .database()
    .ref('send_signal')
    .set(data);
};

/** リモコンの作成 */
export const createRemocon = async (name: string): Promise<Remocon> => {
  const data = {
    name,
  };
  const doc = await firebase
    .firestore()
    .collection('remocon')
    .add(data);
  return {
    ...data,
    id: doc.id,
  };
};

/** リモコンの削除 */
export const deleteRemocon = async (id: string): Promise<void> => {
  await firebase
    .firestore()
    .collection('remocon')
    .doc(id)
    .delete();
};

/** リモコンと信号の一覧を取得する */
export const findRemoconAndSignals = async (
  id: string
): Promise<{
  remocon: Remocon | null;
  signals: Signal[];
}> => {
  let remocon: Remocon | null = null;
  const signals = new Array<Signal>();

  const remoconDoc = await firestore
    .collection('remocon')
    .doc(id)
    .get();
  if (remoconDoc.exists) {
    remoconDoc.data();
    remocon = remoconDao.encode(remoconDoc);
  }

  if (!remocon) {
    throw new Error();
  }
  const signalSnapshot = await firestore
    .collection('signal')
    .where('remocon_id', '==', id)
    .get();

  signalSnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
    signals.push(signalDao.encode(doc));
  });

  return { remocon, signals };
};

/** リモコンの一覧を取得する */
export const findAllRemocon = async (): Promise<Remocon[]> => {
  const snapshot = await firestore.collection('remocon').get();

  const result = new Array<Remocon>();
  snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
    result.push(remoconDao.encode(doc));
  });
  return result;
};
