import * as React from 'react';
import Head from 'next/head';
import MyAppBar from '../../components/organisms/MyAppBar';

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
      <MyAppBar />
    </header>
    {children}
  </>
);

export default Layout;
