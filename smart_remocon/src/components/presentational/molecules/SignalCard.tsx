import * as React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { Close, Done, SettingsRemote, Timer } from '@material-ui/icons';

import { CardProps } from '@material-ui/core/Card';
import { Signal } from '../../../interfaces/entities';
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { green } from '@material-ui/core/colors';
import { sendSignal } from '../../../actions/remocon';
import { useDispatch } from 'react-redux';

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
        <ButtonGroup size="small">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={onSendSignal}
          >
            <SettingsRemote />
            SEND
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={onSendSignal}
          >
            <Timer />
            TIMER
          </Button>
        </ButtonGroup>
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

interface SuccessSnackbarContentProps extends SnackbarContentProps {
  onClose: () => void;
}
const SuccessSnackbarContent: React.FC<SuccessSnackbarContentProps> = ({
  onClose,
  ...props
}) => {
  return (
    <SnackbarContent
      {...props}
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
