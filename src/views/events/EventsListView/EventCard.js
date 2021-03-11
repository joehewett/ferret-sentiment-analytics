import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import GetLinkButton from './getLink';
import DeleteEventButton from './deleteButton';
import ExportButton from './ExportButton';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  ratingIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  eventTitle: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  eventDescription: {
    marginLeft: theme.spacing(1)
  }
}));

const EventCard = ({
  className, event, eventCount, setEventCount, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <Typography
              className={classes.eventTitle}
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {event.name}
            </Typography>
            <Typography
              className={classes.eventDescription}
              align="center"
              color="textPrimary"
              variant="body1"
            >
              {event.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <GetLinkButton
                eventid={event.id}
              />
              <ExportButton event={event} />
              <DeleteEventButton
                eventid={event.id}
                eventCount={eventCount}
                setEventCount={setEventCount}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            {/* {ratingIcon} */}
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Overall Score :
              {event.overallRating}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              className={classes.button}
              href={`/app/dashboard/${event.id}`}
              variant="contained"
              size="medium"
              color="secondary"
            >
              View DashBoard
            </Button>
            <Button
              href={`/app/feedback/${event.id}`}
              variant="contained"
              size="medium"
              color="secondary"
            >
              View Form
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default EventCard;
