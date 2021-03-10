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
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { feedbackByComponent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import MoneyIcon from '@material-ui/icons/Money';
import ScoreIndicator from './ScoreIndicator';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const AverageScore = ({
  className,
  id,
  components,
  ...rest
}) => {
  const classes = useStyles();
  const [averageFeedbackScore, setAverageFeedbackScore] = useState(0);
  const [componentsCounted, setComponentsCounted] = useState(0);
  const [totalAverage, setTotalAverage] = useState(0);

  function calculateAverageScore(feedbackList) {
    if (feedbackList !== 0) {
      let count = 0;
      let total = 0;
      console.log('Feedback List: ', feedbackList);
      feedbackList.forEach((feedback) => {
        count += 1;

        let sentimentInput = '';
        let sentimentScore = 0;

        // Null check sentiment score and then parse string back to JSON
        if (feedback.sentiment_score) {
          sentimentInput = JSON.parse(
            feedback.sentiment_score
          );
          if (sentimentInput) {
            sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
          }
        }

        if (sentimentScore === 'POSITIVE') {
          total += 5;
        } else if (sentimentScore === 'NEUTRAL') {
          total += 2.5;
        }
      });

      if (count > 0) {
        setTotalAverage(totalAverage + (total / count).toFixed(2));
        setComponentsCounted(componentsCounted + 1);
      }
    }
  }

  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        calculateAverageScore(result.data.feedbackByComponent.items);
      });
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  useEffect(() => {
    if (components.length !== 0) {
      components.forEach((component) => {
        if (component.type === 'textbox') {
          getFeedbackByComponent(component.id);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (componentsCounted > 0) {
      const newAverage = totalAverage / componentsCounted;
      console.log('Setting average score: ', newAverage);
      setAverageFeedbackScore(newAverage);
    } else {
      setAverageFeedbackScore(0);
    }
  }, [componentsCounted]);

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
              Average Score
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {averageFeedbackScore}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ScoreIndicator score={averageFeedbackScore} />
        </Box>
      </CardContent>
    </Card>
  );
};

AverageScore.propTypes = {
  className: PropTypes.string
};

export default AverageScore;
