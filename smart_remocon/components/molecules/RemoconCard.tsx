import * as React from 'react';

import {
  Card,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Box,
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
      <CardContent>
        <Typography variant="h6" component="h1" color="textSecondary">
          {remocon.name}
        </Typography>
        <Box mt="auto">
          <CardActions>
            <IconButton size="small">
              <SettingsRemote />
            </IconButton>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RemoconCard;
