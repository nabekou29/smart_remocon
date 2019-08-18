import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

type Props = {
  login: boolean;
};

const DisplayAuth: React.FC<Props> = ({ children, login }) => {
  const user = firebase.auth().currentUser;
  const logind = user !== null;

  return logind === login ? <>{children}</> : <></>;
};

export default DisplayAuth;
