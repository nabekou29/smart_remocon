import * as React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';

import { DialogProps } from '@material-ui/core/Dialog';
import { Signal } from '../../../../interfaces/entities';
import SuccessSnackbarContent from '../../../presentational/molecules/SuccessSnackbarContent';
import { sendSignal } from '../../../../actions/remocon';
import { useDispatch } from 'react-redux';

interface Props extends DialogProps {
  signal: Signal;
  onClose: () => void;
}
const SetTimerDialog: React.FC<Props> = ({ signal, onClose, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const onSendSignal = (minutes: number) => () => {
    setOpen(false);
    dispatch(sendSignal.start({ signalId: signal.id, minutes }));
    setTimeout(() => setOpen(true), 200);
    onClose();
  };

  const closeMessage = () => {
    setOpen(false);
  };

  const ButtonGroupOptions = [[1, 3, 5, 10], [15, 30, 45, 60]];

  return (
    <Dialog {...props}>
      <DialogTitle>タイマーをセット</DialogTitle>
      <DialogContent>
        {ButtonGroupOptions.map(options => (
          <ButtonGroup size="small">
            {options.map(min => (
              <Button key={min} onClick={onSendSignal(min)}>
                <Box display="flex" alignItems="flex-end">
                  <Box width={20}>{min}</Box>
                  <Box component="span" fontSize={8}>
                    {'min'}
                  </Box>
                </Box>
              </Button>
            ))}
          </ButtonGroup>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          キャンセル
        </Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default SetTimerDialog;
