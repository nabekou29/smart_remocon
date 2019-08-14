import * as React from 'react';

import { NextPage } from 'next';

import Layout from '../components/templates/Layout';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home">
      <h1>Hello Next.js 👋</h1>
    </Layout>
  );
};

export default IndexPage;
