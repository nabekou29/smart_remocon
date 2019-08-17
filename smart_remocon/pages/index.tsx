import * as React from 'react';
import { NextPage, NextPageContext } from 'next';

import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Container,
  GridList,
  GridListTile,
  // ListSubheader,
  Typography,
  Fab,
} from '@material-ui/core';
import Layout from '../components/templates/Layout';
import RemoconCard from '../components/molecules/RemoconCard';

import * as api from '../utils/api';
import { Remocon } from '../interfaces';
import { Add } from '@material-ui/icons';

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
  remocons: Array<Remocon>;
}

const IndexPage: NextPage<Prop> = ({ remocons }) => {
  const classes = useStyles();
  return (
    <Layout title="Home">
      <div>
        <Container maxWidth="sm">
          <GridList cellHeight={140} spacing={8}>
            <GridListTile
              className={classes.listTitleTile}
              key="Subheader"
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
            {remocons.map(r => (
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

IndexPage.getInitialProps = async (_: NextPageContext) => {
  const remocons: Array<Remocon> = await api.findAllRemocon();
  return {
    remocons,
  };
};

export default IndexPage;
