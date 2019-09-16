import * as React from 'react';

import { AccountCircle, Home } from '@material-ui/icons';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import Link from 'next/link';

/** サイドメニュー */
const MenuList: React.FC = () => {
  return (
    <>
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>ホーム</ListItemText>
          </ListItem>
        </Link>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText>ログアウト</ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default MenuList;
