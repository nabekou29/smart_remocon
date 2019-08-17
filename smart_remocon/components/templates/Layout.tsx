import * as React from 'react';
import Head from 'next/head';
import AppBar from '../organisms/AppBar';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <>
    <Head>
      <title>{'SmartRemocon | ' + title}</title>
    </Head>
    <header>
      <AppBar />
    </header>
    {children}
  </>
);

export default Layout;
