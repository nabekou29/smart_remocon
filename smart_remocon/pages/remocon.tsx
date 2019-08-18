import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

import Layout from '../components/templates/Layout';

import { Remocon, Signal } from '../interfaces';
import * as api from '../utils/api';
import {
  Container,
  GridList,
  GridListTile,
  Box,
  Typography,
  Fab,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import SignalCard from '../components/molecules/SignalCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listTitleTile: {
      height: 'auto !important',
    },
    addButton: {
      margin: theme.spacing(2),
    },
    listTitle: {
      margin: theme.spacing(2),
      alignSelf: 'flex-end',
    },
    card: {
      height: '100%',
    },
  })
);

interface Prop {
  remocon: Remocon | null;
  signals: Array<Signal>;
}

const RemoconPage: NextPage<Prop> = ({ remocon, signals }) => {
  const classes = useStyles();

  if (!remocon) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout title="Remocon">
      <Container maxWidth="sm">
        <GridList cellHeight={140} spacing={8} cols={1}>
          <GridListTile className={classes.listTitleTile} key="Subheader">
            <Box display="flex" justifyContent="space-between">
              <Typography
                className={classes.listTitle}
                component="span"
                variant="h6"
              >
                {remocon.name}
              </Typography>
              <Fab className={classes.addButton} color="primary" size="small">
                <Add />
              </Fab>
            </Box>
          </GridListTile>
          {signals.map(s => (
            <GridListTile key={s.id}>
              <SignalCard signal={s} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </Layout>
  );
};

RemoconPage.getInitialProps = async ({ query }: NextPageContext) => {
  if (typeof query.id !== 'string') {
    return { remocon: null, signals: new Array<Signal>() };
  }

  return await api.findRemoconAndSignals(query.id);
};

export default RemoconPage;
