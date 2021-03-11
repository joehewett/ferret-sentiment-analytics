/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { API } from 'aws-amplify';
import { componentsByEvent } from 'src/graphql/queries';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const EventProgress = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [event, setEvent] = useState();
  async function getComponentsByEvent(eventid) {
    try {
      const result = await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setEvent(result.data.componentsByEvent.items);
      console.log('setcomponentid to result from query');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComponentsByEvent(id);
  }, []);
  console.log(event);
  // const start = Date.parse(event.startDateTime); // this will be event's start time/date
  // const end = Date.parse(event.endDateTime); // this will be event's end time/date
  // const today = new Date();
  // const timeBetweenStartAndEnd = (end - start);
  // const timeBetweenStartAndToday = (today - start);
  let progress = 100;
  console.log(id);
  if (progress > 100) {
    progress = 100;
  }
  if (progress < 0) {
    progress = 0;
  }

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
              Event Progress
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {progress}
              %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={progress}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

EventProgress.propTypes = {
  className: PropTypes.string
};

export default EventProgress;
