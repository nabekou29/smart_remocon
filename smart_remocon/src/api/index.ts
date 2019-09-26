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
  if (minutes === 0) {
    throw new Error('1以上を指定してください');
  }
  return await firebase
    .database()
    .ref('send_signal')
    .set({
      signal_id: signalId,
      minutes: minutes,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
};

export const findRemoconAndSignals = async (
  id: string
): Promise<{
  remocon: Remocon | null;
  signals: Signal[];
}> => {
  let remocon = null;
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

export const findAllRemocon = async (): Promise<Remocon[]> => {
  const snapshot = await firestore.collection('remocon').get();

  const result = new Array<Remocon>();
  snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
    result.push(remoconDao.encode(doc));
  });
  return result;
};
