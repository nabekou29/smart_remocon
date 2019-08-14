import * as React from 'react';
import Head from 'next/head';
import MyAppBar from '../../components/organisms/MyAppBar';
import { Container } from '@material-ui/core';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <MyAppBar />
    </header>
    <Container maxWidth="sm">{children}</Container>
  </>
);

export default Layout;
