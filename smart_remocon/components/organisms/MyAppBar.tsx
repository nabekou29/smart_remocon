import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuButtom from './MenuButtom';

const MyAppBar: React.FunctionComponent = () => (
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
