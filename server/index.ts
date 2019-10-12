import 'firebase/database';
import 'firebase/firestore';

import * as firebase from 'firebase/app';

import { execSync } from 'child_process';
import fs from 'fs';

const CWD = process.cwd();
const CODE_FILE = 'code.json';
const OUTPUT_GPIO_NO = 17;

const firebaseConfig = {
  apiKey: 'AIzaSyCNHcIPxmACC4GOje7tZZW3M-aUUSyd6sk',
  authDomain: 'raspi-home-1823.firebaseapp.com',
  databaseURL: 'https://raspi-home-1823.firebaseio.com',
  projectId: 'raspi-home-1823',
  storageBucket: 'raspi-home-1823.appspot.com',
  messagingSenderId: '398066115568',
  appId: '1:398066115568:web:46c1716c0d169916',
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

firebase
  .database()
  .ref('/send_signal')
  .on('value', (snapshot: any) => {
    console.log('/aircon: ' + JSON.stringify(snapshot.val().signal_id));
    const data = snapshot.val();
    if (data['signal_id']) {
      send(data['signal_id']);
    }
  });

async function send(id: string) {
  const command = `python3 ${CWD}/irrp.py -p -g${OUTPUT_GPIO_NO} -f ${CWD}/${CODE_FILE} ${id}`;
  const text = fs.readFileSync(`${CWD}/${CODE_FILE}`, 'utf8');
  const codes = text ? JSON.parse(text) : {};

  // jsonファイルに指定されたIDの信号が登録されていなければ、新たに登録する
  if (!codes.hasOwnProperty || !codes.hasOwnProperty(id)) {
    const remoconDoc = await firestore
      .collection('signal')
      .doc(id)
      .get();
    if (remoconDoc.exists) {
      const data = remoconDoc.data();
      if (!data) {
        throw new Error();
      }
      codes[id] = data['code'];
      fs.writeFileSync(`${CWD}/${CODE_FILE}`, JSON.stringify(codes));
    }
  }
  console.log(`send: ${command}`);
  // execSync(command);
}