import * as firebase from 'firebase/app';
import { Signal, Remocon } from '../interfaces';

interface Dao<T> {
  encode: (doc: firebase.firestore.QueryDocumentSnapshot) => T;
  decode: (data: T) => {};
}

class SignalDao implements Dao<Signal> {
  encode(doc: firebase.firestore.QueryDocumentSnapshot): Signal {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      remocon_id: data.remocon_id,
    };
  }

  decode(data: Signal): {} {
    return {
      ...data,
    };
  }
}
export const signalDao = new SignalDao();

class RemoconDao implements Dao<Remocon> {
  encode(doc: firebase.firestore.QueryDocumentSnapshot): Remocon {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
    };
  }

  decode(data: Remocon): {} {
    return {
      ...data,
    };
  }
}
export const remoconDao = new RemoconDao();
