import * as React from 'react';

import { IconButton, Drawer } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import MenuList from './MyMenuList';

const MenuButtom: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
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
        <MenuList></MenuList>
      </Drawer>
    </>
  );
};

export default MenuButtom;
