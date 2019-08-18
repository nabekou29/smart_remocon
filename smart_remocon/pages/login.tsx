import * as React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Container } from '@material-ui/core';

import Layout from '../components/templates/Layout';

const LoginPage: NextPage = () => {
  const [didMount, setDodMount] = React.useState(false);

  React.useEffect(() => {
    setDodMount(true);
  }, []);

  return (
    <Layout title="ログイン">
      <Container maxWidth="sm">{didMount ? <Login /> : <></>}</Container>
    </Layout>
  );
};

const Login: React.FC = () => {
  React.useEffect(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    if (!firebase.auth().currentUser) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          Router.push('/');
        });
    } else {
      Router.back();
    }
  }, []);

  return <>...ログイン中</>;
};

export default LoginPage;
