import * as React from 'react';

import {
  Box,
  Container,
  Fab,
  GridList,
  GridListTile,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import { Remocon, Signal } from '../interfaces/entities';

import { Add } from '@material-ui/icons';
import { AppState } from '../reducers';
import Layout from '../components/container/templates/Layout';
import SignalCard from '../components/presentational/molecules/SignalCard';
import { Store } from 'redux';
import { initialize } from '../actions/remocon';
import { useSelector } from 'react-redux';

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

const RemoconPage: NextPage = () => {
  const classes = useStyles({});
  const state = useSelector((state: AppState) => state.remocon);
  return (
    <Layout title="Remocon">
      <Container maxWidth="sm">
        <GridList cellHeight={140} spacing={8} cols={1}>
          <GridListTile className={classes.listTitleTile} key="SubHeader">
            <Box display="flex" justifyContent="space-between">
              <Typography
                className={classes.listTitle}
                component="span"
                variant="h6"
                gutterBottom
              >
                {state.remocon ? state.remocon.name : ''}
              </Typography>
              <Fab className={classes.addButton} color="primary" size="small">
                <Add />
              </Fab>
            </Box>
          </GridListTile>
          {state.signals.map(s => (
            <GridListTile key={s.id}>
              <SignalCard signal={s} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </Layout>
  );
};

RemoconPage.getInitialProps = async (
  ctx: NextPageContext & { store: Store }
) => {
  if (typeof ctx.query.id !== 'string') {
    throw new Error();
  }
  ctx.store.dispatch(initialize.start({ remoconId: ctx.query.id }));
  return {};
};

export default RemoconPage;
