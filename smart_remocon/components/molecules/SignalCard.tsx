import * as React from 'react';

// import Link from 'next/link';

import {
  Card,
  Typography,
  Box,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { CardProps } from '@material-ui/core/Card';
import { SettingsRemote, Close, Done } from '@material-ui/icons';

import { Signal } from '../../interfaces';
import * as api from '../../utils/api';
import { green } from '@material-ui/core/colors';

interface Props extends CardProps {
  signal: Signal;
}

const SignalCard: React.FC<Props> = ({ signal, ...props }) => {
  const [open, setOpen] = React.useState(false);

  const sendSignal = async () => {
    await api.sendSignal(signal.id);
    setOpen(true);
  };

  const closeMessage = () => {
    setOpen(false);
  };

  return (
    <Card {...props}>
      <Box p={1} display="flex">
        <Box flexGrow={1}>
          <Typography variant="h6" noWrap>
            {signal.name}
          </Typography>
        </Box>
        <IconButton color="primary" size="small" onClick={sendSignal}>
          <SettingsRemote />
          <Box fontSize={16}>SEND</Box>
        </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={closeMessage}
        >
          <SuccessSnackbarContent onClose={closeMessage} />
        </Snackbar>
      </Box>
    </Card>
  );
};

const SuccessSnackbarContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={
        <Box
          id="client-snackbar"
          component="span"
          display="flex"
          alignItems="center"
        >
          <Done />
          送信しました
        </Box>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <Close />
        </IconButton>,
      ]}
      style={{
        backgroundColor: green[400],
      }}
    />
  );
};

export default SignalCard;
