import * as React from 'react';

import {
  Card,
  // Fab,
  Typography,
  CardContent,
  CardActions,
  Box,
  IconButton,
} from '@material-ui/core';
import { CardProps } from '@material-ui/core/Card';
import { SettingsRemote } from '@material-ui/icons';

import { Remocon } from '../../interfaces';

interface Props extends CardProps {
  remocon: Remocon;
}

const RemoconCard: React.FunctionComponent<Props> = ({ remocon, ...props }) => {
  return (
    <Card {...props}>
      <Box height="60%">
        <CardContent>
          <Typography variant="h6" component="h1">
            {remocon.name}
          </Typography>
        </CardContent>
      </Box>
      <CardActions disableSpacing>
        <IconButton color="primary" size="small">
          <SettingsRemote />
          <Box fontSize={16}>USE</Box>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RemoconCard;
