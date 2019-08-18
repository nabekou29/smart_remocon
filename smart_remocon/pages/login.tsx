import * as React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Container } from '@material-ui/core';

import Layout from '../components/templates/Layout';

const LoginPage: NextPage = () => {
  React.useEffect(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    if (!firebase.auth().currentUser) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          Router.push('/');
        });
    }
  }, []);

  return (
    <Layout title="ログイン">
      <Container maxWidth="sm">...ログイン中</Container>
    </Layout>
  );
};

export default LoginPage;
