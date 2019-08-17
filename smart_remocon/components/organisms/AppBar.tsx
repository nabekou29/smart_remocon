import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import MenuButtom from './MenuButtom';

const MyAppBar: React.FunctionComponent = () => (
  <Box flexGrow={1}>
    <AppBar position="relative">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6" color="inherit" noWrap>
            スマートリモコン
          </Typography>
        </Box>
        <MenuButtom />
      </Toolbar>
    </AppBar>
  </Box>
);

export default MyAppBar;
