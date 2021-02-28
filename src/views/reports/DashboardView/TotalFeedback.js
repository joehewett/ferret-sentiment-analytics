import React from 'react';
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
import * as queries from 'src/graphql/queries';
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

async function getEvent() {
  try {
    const result = await API.graphql({
      query: queries.getEvent('098ce0d5-45bf-4f2b-8a02-d96a1257dcfe'),
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return result;
  } catch (error) {
    return console.log(error);
  }
}

async function getComponent() {
  try {
    const result = await API.graphql({
      query: queries.getComponent('0234b672-facf-44d3-872c-d29645d40180'),
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return result;
  } catch (error) {
    return console.log(error);
  }
}
async function getFeedback() {
  try {
    const result = await API.graphql({
      query: queries.getFeedback('a19ea111-f359-4434-b522-2b1108376e03'),
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return result;
  } catch (error) {
    return console.log(error);
  }
}
const TotalFeedback = ({ className, ...rest }) => {
  const classes = useStyles();
  let count = 0;
  console.log(count++);
  console.log(getEvent());
  console.log(getComponent());
  console.log(getFeedback());
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
              TOTAL FEEDBACKS
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
