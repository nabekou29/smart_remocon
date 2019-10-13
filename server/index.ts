import * as admin from 'firebase-admin';

import { execSync } from 'child_process';
import fs from 'fs';

const CWD = process.cwd();
/** コード保存用のファイル名 */
const CODE_FILE = 'code.json';
/** 一時保存用のファイル名 */
const TMP_CODE_FILE = 'tmp.json';
/** 一時保存用のコード名 */
const TMP_CODE_NAME = 'tmp';
/** 送信用GPIO */
const SEND_GPIO_NO = 17;
/** 受信用GPIO */
const RECEIVE_GPIO_NO = 26;

const serviceAccount = require('./raspi-home-1823-firebase-adminsdk-6ih25-ce34185a30.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://raspi-home-1823.firebaseio.com',
});

/** 初回の呼び出しを無視する */
const passFirstCall = (f: any) => {
  let called = false;
  let wrap_f = (...args: any[]) => {
    if (called) {
      return f(...args);
    }
    called = true;
  };
  return wrap_f;
};

// 送信
admin
  .database()
  .ref('/send_signal')
  .on(
    'value',
    passFirstCall((snapshot: admin.database.DataSnapshot) => {
      const data = snapshot.val();
      if (data.signal_id) {
        send(data.signal_id);
      }
    })
  );

// 受信・登録
admin
  .database()
  .ref('/receive_new_signal')
  .on(
    'value',
    passFirstCall((snapshot: admin.database.DataSnapshot) => {
      receive().then((signal: number[]) => registerSignal(signal));
    })
  );

console.log('Completed!');

/** 信号の送信 */
async function send(id: string) {
  const command = `python3 ${CWD}/irrp.py -p -g${SEND_GPIO_NO} -f ${CWD}/${CODE_FILE} ${id}`;
  const text = fs.readFileSync(`${CWD}/${CODE_FILE}`, 'utf8');
  const codes = text ? JSON.parse(text) : {};

  // jsonファイルに指定されたIDの信号が登録されていなければ、新たに登録する
  if (!codes.hasOwnProperty || !codes.hasOwnProperty(id)) {
    const remoconDoc = await admin
      .firestore()
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
  console.log(`send: ${id}`);
  execSync(command);
}

/** 信号の受信 */
async function receive(): Promise<number[]> {
  const command = `python3 ${CWD}/irrp.py -r -g${RECEIVE_GPIO_NO} -f ${CWD}/${TMP_CODE_FILE} ${TMP_CODE_NAME} --no-confirm --post 130`;
  console.log('receiving...');
  execSync(command);
  console.log('received!');

  const text = fs.readFileSync(`${CWD}/${TMP_CODE_FILE}`, 'utf8');
  const codes = text ? JSON.parse(text) : {};
  return codes[TMP_CODE_NAME];
}

/** 受信した信号の登録 */
export const registerSignal = async (code: number[]): Promise<any> => {
  const data = {
    code,
    timestamp: admin.database.ServerValue.TIMESTAMP,
  };
  return await admin
    .database()
    .ref('received_signal')
    .set(data);
};
