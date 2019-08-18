import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../theme';
import firebaseConfig from '../firebaseConfig';

class MyApp extends App {
  componentDidMount() {
    // Firebase初期化
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // TODO: 認証周りの修正が必要。
    // ログイン状態の変化に応じて画面遷移
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (!user) {
        Router.push('/login');
      }
    });
    if (!firebase.auth().currentUser) {
      Router.push('/login');
    }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode && jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
