import * as React from 'react';

import {
  Box,
  Card,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { Close, Done, SettingsRemote } from '@material-ui/icons';

import { CardProps } from '@material-ui/core/Card';
import { Signal } from '../../../interfaces/entities';
import { green } from '@material-ui/core/colors';
import { sendSignal } from '../../../actions/remocon';
import { useDispatch } from 'react-redux';

// import Link from 'next/link';

interface Props extends CardProps {
  signal: Signal;
}

const SignalCard: React.FC<Props> = ({ signal, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const onSendSignal = () => {
    setOpen(false);
    dispatch(sendSignal.start({ signalId: signal.id }));
    setTimeout(() => setOpen(true), 200);
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
        <IconButton color="primary" size="small" onClick={onSendSignal}>
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
