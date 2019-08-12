import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuButtom from './MenuButtom';

type Props = {};

const MyAppBar: React.FunctionComponent<Props> = () => (
  <AppBar position="relative">
    <Toolbar>
      <MenuButtom />
      <Typography variant="h6" color="inherit" noWrap>
        スマートリモコン
      </Typography>
    </Toolbar>
  </AppBar>
);

export default MyAppBar;
