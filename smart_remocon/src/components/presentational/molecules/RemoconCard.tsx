import * as React from 'react';

import {
  Box,
  Button,
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
      <Box component="div" display="flex" justifyContent="flex-end">
        <CardActions disableSpacing>
          <Link href={`/remocon?id=${remocon.id}`}>
            <Button variant="outlined" color="primary" size="small">
              <SettingsRemote />
              USE
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default RemoconCard;
