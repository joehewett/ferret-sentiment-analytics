/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { componentsByEvent, feedbackByComponent } from 'src/graphql/queries';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalFeedback = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [componentidlist, setcomponentidlist] = useState([]);
  const [feedbackidlist, setfeedbackidlist] = useState([]);
  async function getcomponentsByEvent(eventid) {
    try {
      const result = await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setcomponentidlist(result.data.componentsByEvent.items);
      console.log('setcomponentid to result from query');
    } catch (error) {
      console.log(error);
    }
  }
  async function getfeedbackByComponent(componentid) {
    try {
      const result = await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setfeedbackidlist(result.data.feedbackByComponent.items);
      console.log('setfeedbackidlist to result from query');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getcomponentsByEvent(id);
  }, []);
  console.log('componentidlist', componentidlist);
  useEffect(() => {
    if (componentidlist.length !== 0) {
      getfeedbackByComponent(componentidlist[0].id);
    }
  }, []);
  console.log(feedbackidlist);
  const count = feedbackidlist.length;
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
              Total Feedbacks
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalFeedback.propTypes = {
  className: PropTypes.string
};

export default TotalFeedback;
