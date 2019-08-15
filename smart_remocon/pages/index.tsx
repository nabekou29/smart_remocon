import * as React from 'react';
import { NextPage } from 'next';

import { Container } from '@material-ui/core';

import Layout from '../components/templates/Layout';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home">
      <Container maxWidth="sm">
        <h1>Hello Next.js 👋</h1>
      </Container>
    </Layout>
  );
};

export default IndexPage;
