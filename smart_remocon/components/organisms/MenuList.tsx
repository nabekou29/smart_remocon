import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import Link from 'next/link';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { AccountCircle, Home } from '@material-ui/icons';

import DisplayAuth from '../atoms/DisplayAuth';

const MenuList: React.FC = () => {
  const logout = () => {
    firebase.auth().signOut();
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
        <DisplayAuth login={true}>
          <Divider />
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>ログアウト</ListItemText>
          </ListItem>
        </DisplayAuth>
      </List>
    </>
  );
};

export default MenuList;
