import * as React from 'react';
import { NextPage } from 'next';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Container } from '@material-ui/core';
import { GoogleLoginButton } from 'react-social-login-buttons';

import Layout from '../components/templates/Layout';

const LoginPage: NextPage = () => {
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <Layout title="ログイン">
      <Container maxWidth="sm">
        <GoogleLoginButton onClick={login}></GoogleLoginButton>
      </Container>
    </Layout>
  );
};

export default LoginPage;
