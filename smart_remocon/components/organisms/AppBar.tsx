import * as React from 'react';

import Link from 'next/link';

import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import MenuButtom from './MenuButtom';

const MyAppBar: React.FC = () => {
  return (
    <Box flexGrow={1}>
      <AppBar position="relative">
        <Toolbar>
          <Box flexGrow={1}>
            <Link href="/">
              <Typography variant="h6" color="inherit" noWrap>
                すまりも！
              </Typography>
            </Link>
          </Box>
          <MenuButtom />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
