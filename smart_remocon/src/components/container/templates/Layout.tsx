import * as React from 'react';

import Head from 'next/head';
import Loading from '../../presentational/molecules/Loading';
import MyAppBar from '../organisms/common/AppBar';

type Props = {
  title?: string;
  loading?: boolean;
};

/** ページのレイアウト */
const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
  loading = false,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <MyAppBar />
    </header>
    <Loading open={loading}></Loading>
    {children}
  </>
);

export default Layout;
