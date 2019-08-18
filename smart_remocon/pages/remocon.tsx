import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

import Layout from '../components/templates/Layout';

import { Remocon, Signal } from '../interfaces';
import * as api from '../utils/api';

interface Prop {
  remocon: Remocon | null;
  signals: Array<Signal>;
}

const RemoconPage: NextPage<Prop> = ({ remocon, signals }) => {
  console.log(remocon);
  console.log(signals);

  if (!remocon) {
    return <Error statusCode={404} />;
  }
  return <Layout title="Remocon">test</Layout>;
};

RemoconPage.getInitialProps = async ({ query }: NextPageContext) => {
  if (typeof query.id === 'string') {
    const data = await api.findRemoconAndSignals(query.id);
    return data;
  }

  return { remocon: null, signals: new Array<Signal>() };
};

export default RemoconPage;
