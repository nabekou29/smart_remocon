import * as React from 'react';

import Link from 'next/link';

import {
  Card,
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

const RemoconCard: React.FC<Props> = ({ remocon, ...props }) => {
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
        <Link href={`/remocon?id=${remocon.id}`}>
          <IconButton color="primary" size="small">
            <SettingsRemote />
            <Box fontSize={16}>USE</Box>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default RemoconCard;
