import * as React from 'react';
import * as firebase from 'firebase/app';

import { AccountCircle, Home } from '@material-ui/icons';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import Link from 'next/link';
import Router from 'next/router';

/** サイドメニュー */
const MenuList: React.FC = () => {
  const onLogout = async () => {
    await firebase.auth().signOut();
    Router.push('/login');
  };
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
        <ListItem button onClick={onLogout}>
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
