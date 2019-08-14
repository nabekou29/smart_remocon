import * as firebase from 'firebase/app';

import { Remocon } from '../interfaces';
import { remoconDao } from './dao';

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

export const findAllRemocon = (): Promise<Array<Remocon>> => {
  return firestore
    .collection('remocon')
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot) => {
      const result = new Array<Remocon>();
      snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        result.push(remoconDao.encode(doc));
      });
      return result;
    });
};
