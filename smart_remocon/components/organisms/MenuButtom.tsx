import * as React from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Menu, AccountCircle } from '@material-ui/icons';

import firebase from '../../firebase';

type Props = {};

const MenuButtom: React.FunctionComponent<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState('');
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  firebase.auth().onAuthStateChanged((a: firebase.User | null) => {
    if (a && a.email) {
      setUser(a.email);
    } else {
      setUser('');
    }
  });

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        ref={menuButtonRef}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem button key={'ログイン'} onClick={login}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>ログイン {user}</ListItemText>
          </ListItem>
          <ListItem button key={'ログアウト'} onClick={logout}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>ログアウト</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MenuButtom;
