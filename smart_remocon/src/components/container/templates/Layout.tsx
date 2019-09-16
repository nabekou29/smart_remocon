import * as React from 'react';

import Head from 'next/head';
import MyAppBar from '../organisms/common/AppBar';

type Props = {
  title?: string;
};

/** ページのレイアウト */
const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <MyAppBar />
    </header>
    {children}
  </>
);

export default Layout;
