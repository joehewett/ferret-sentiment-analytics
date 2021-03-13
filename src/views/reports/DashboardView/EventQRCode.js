import React from 'react';
import QRCode from 'react-qr-code';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const EventQRCode = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const eventURL = `https://www.ferret.ml/app/feedback/${id}`;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              QR Code of the Event
            </Typography>
            <QRCode size={64} value={eventURL} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

EventQRCode.propTypes = {
  className: PropTypes.string
};

export default EventQRCode;
