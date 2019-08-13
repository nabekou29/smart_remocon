import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import DisplayAuth from '../atoms/DisplayAuth';

type Props = {};

const MenuButtom: React.FunctionComponent<Props> = () => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <List>
        <DisplayAuth login={true}>
          <ListItem button key={'ログアウト'} onClick={logout}>
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

export default MenuButtom;
