import 'firebase/auth';

import * as React from 'react';
import * as firebase from 'firebase/app';

import { Container } from '@material-ui/core';
import Layout from '../components/container/templates/Layout';
import { NextPage } from 'next';
import Router from 'next/router';

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
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInWithRedirect(provider);
      } else {
        Router.push('/');
      }
    });
  }, []);

  return <>...ログイン中</>;
};

export default LoginPage;
