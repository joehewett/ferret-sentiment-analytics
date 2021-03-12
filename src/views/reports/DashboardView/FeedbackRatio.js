/* eslint react/prop-types: 0 */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { API } from 'aws-amplify';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { componentsByEvent } from 'src/graphql/queries';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const FeedbackRatio = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const bad = 10;
  // const good = 50;
  // const normal = 15;
  // const total = good + normal + bad;
  // const goodPer = Math.round((good / total) * 100);
  // const normalPer = Math.round((normal / total) * 100);
  // const badPer = Math.round((bad / total) * 100);
  // const classes = useStyles();
  const [componentIdList, setComponentIdList] = useState([]);
  const [feedbackIdList, setFeedbackIdList] = useState([]);
  const [positiveFeedback, setPositiveFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [negativeFeedback, setNegativeFeedback] = useState(0);
  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log(result);
        setFeedbackIdList(result.data.feedbackByComponent.items);
        // console.log('setfeedbackidlist to result from query');
      });
    } catch (error) {
      console.log(error);
    }
  }
  // const [dataForTable, setDataForTable] = useState([]);
  async function getComponentsByEvent(eventid) {
    try {
      await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const componentIds = result.data.componentsByEvent.items;
        setComponentIdList(componentIds);
        console.log(componentIdList);
        // console.log('setcomponentid to result from query');
        if (componentIds.length !== 0) {
          getFeedbackByComponent(componentIds[0].id);
          // console.log(componentIds[0].id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComponentsByEvent(id);
  }, []);
  useEffect(() => {
    console.log(feedbackIdList.length);
    if (feedbackIdList.length !== 0) {
      // console.log('feedbackidlist', feedbackIdList);
      let count = 0;
      let positiveCount = 0;
      let neutralCount = 0;
      let negativeCount = 0
      feedbackIdList.forEach((feedback) => {
        count += 1;
        // console.log('feedbacks', feedback);
        const sentimentInput = JSON.parse(
          feedback.sentiment_score
        );
        // console.log('sentiment', sentimentInput);
        const sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
        if (sentimentScore === 'POSITIVE') {
          positiveCount += 1;
        } else if (sentimentScore === 'NEUTRAL') {
          neutralCount += 1;
        } else if (sentimentScore === 'NEGATIVE') {
          negativeCount += 1;
        }
      });
      setPositiveFeedback(Math.round( (positiveCount / count) * 100));
      setNeutralFeedback(Math.round( (neutralCount / count) * 100));
      setNegativeFeedback(Math.round( (negativeCount / count) * 100));
    }
  }, [feedbackIdList]);

  const data = {
    datasets: [
      {
        data: [positiveFeedback, neutralFeedback, negativeFeedback],
        backgroundColor: [
          colors.green[500],
          colors.amber[600],
          colors.red[300]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Good', 'Average', 'Bad']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const score = [
    {
      title: 'Positive',
      value: positiveFeedback,
      icon: InsertEmoticonIcon,
      color: colors.green[500]
    },
    {
      title: 'Neutral',
      value: neutralFeedback,
      icon: SentimentSatisfiedIcon,
      color: colors.amber[600]
    },
    {
      title: 'Negative',
      value: negativeFeedback,
      icon: SentimentVeryDissatisfiedIcon,
      color: colors.red[300]
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Feedback Ratios" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {score.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

FeedbackRatio.propTypes = {
  className: PropTypes.string
};

export default FeedbackRatio;
