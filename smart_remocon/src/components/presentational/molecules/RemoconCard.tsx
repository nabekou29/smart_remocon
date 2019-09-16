import * as React from 'react';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';

import { CardProps } from '@material-ui/core/Card';
import Link from 'next/link';
import { Remocon } from '../../../interfaces/entities';
import { SettingsRemote } from '@material-ui/icons';

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
