import * as React from 'react';
import * as api from '../api';

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

import { Add } from '@material-ui/icons';
import { AppState } from '../reducers';
import Layout from '../components/container/templates/Layout';
import { Remocon } from '../interfaces/entities';
import RemoconCard from '../components/presentational/molecules/RemoconCard';
import { Store } from 'redux';
import { initialize } from '../actions/top';
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

const IndexPage: NextPage<{}> = () => {
  const classes = useStyles({});
  const state = useSelector((app: AppState) => app.top);
  return (
    <Layout title="Home">
      <div>
        <Container maxWidth="sm">
          <GridList cellHeight={140} spacing={8}>
            <GridListTile
              className={classes.listTitleTile}
              key="SubHeader"
              cols={2}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography
                  className={classes.listTitle}
                  component="span"
                  variant="h6"
                >
                  リモコン一覧
                </Typography>
                <Fab className={classes.addButton} color="primary" size="small">
                  <Add />
                </Fab>
              </Box>
            </GridListTile>
            {state.remocons.map(r => (
              <GridListTile key={r.id}>
                <RemoconCard remocon={r} className={classes.card}></RemoconCard>
              </GridListTile>
            ))}
          </GridList>
        </Container>
      </div>
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: NextPageContext & { store: Store }) => {
  ctx.store.dispatch(initialize.start());
  return {};
};

export default IndexPage;
