import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Remocon, Signal } from '../interfaces';
import { remoconDao, signalDao } from './dao';
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
export const sendSignal = (
  signalId: string,
  minutes: number = 0
): Promise<any> => {
  return firebase
    .database()
    .ref('send_signal')
    .set({
      signalId: signalId,
      minutes: minutes,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
};

export const findRemoconAndSignals = async (
  id: string
): Promise<{
  remocon: Remocon | null;
  signals: Array<Signal>;
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
    return { remocon, signals };
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

export const findAllRemocon = async (): Promise<Array<Remocon>> => {
  const snapshot = await firestore.collection('remocon').get();

  const result = new Array<Remocon>();
  snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
    result.push(remoconDao.encode(doc));
  });
  return result;
};
