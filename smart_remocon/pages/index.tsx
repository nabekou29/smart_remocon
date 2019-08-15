import * as React from 'react';
import { NextPage, NextPageContext } from 'next';

import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  GridList,
  GridListTile,
  ListSubheader,
  IconButton,
} from '@material-ui/core';
import Layout from '../components/templates/Layout';
import RemoconCard from '../components/molecules/RemoconCard';

import * as api from '../utils/api';
import { Remocon } from '../interfaces';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    gridList: {
      width: 500,
      height: 450,
    },
    card: {
      height: '100%',
    },
  })
);

interface Prop {
  remocons: Array<Remocon>;
}

const IndexPage: NextPage<Prop> = ({ remocons }) => {
  const classes = useStyles();
  return (
    <Layout title="Home">
      <div>
        <Container maxWidth="sm">
          <h1>Hello Next.js 👋</h1>
          <GridList cellHeight={160} spacing={8}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="span">リモコン一覧</ListSubheader>
              <IconButton color="primary">
                <AddCircle />
              </IconButton>
            </GridListTile>
            {remocons.map(r => (
              <GridListTile key={r.id} className={classes.gridList}>
                <RemoconCard remocon={r} className={classes.card}></RemoconCard>
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </div>
    </Layout>
  );
};

IndexPage.getInitialProps = async (_: NextPageContext) => {
  const remocons: Array<Remocon> = await api.findAllRemocon();
  return {
    remocons,
  };
};

export default IndexPage;
