/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import { feedbackByComponent, getEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import Loading from '../../../components/Loading';

const useStyles = makeStyles(() => ({
  root: {}
}));

export default function Graph({ component, eventId }) {
  const classes = useStyles();
  const theme = useTheme();
  const [startingHour, setStartingHour] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [feedback, setFeedback] = useState([]);

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  async function setStartingTime() {
    try {
      await API.graphql({
        query: getEvent,
        variables: { id: eventId },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        setStartingHour(result.data.getEvent.createdAt);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log(result);
        setFeedback(result.data.feedbackByComponent.items);
        console.log('setfeedbackidlist to result from query');
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (component) {
      getFeedbackByComponent(component.id);
      setStartingTime();
    }
  }, []);

  useEffect(() => {
    if (feedback.length !== 0) {
      const sortedFeedback = feedback.sort((a, b) => {
        return moment(a.createdAt).diff(b.createdAt);
      });
      console.log(sortedFeedback);
      const datas = new Map();
      sortedFeedback.forEach((fb) => {
        const sentimentInput = JSON.parse(
          fb.sentiment_score
        );
        // console.log('sentiment', sentimentInput);
        let sentimentScore = '';
        try {
          sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
        } catch {
          sentimentScore = 'NEUTRAL';
        }
        console.log('difference in hours', moment(fb.createdAt).diff(moment(startingHour), 'hours'));
        console.log(sentimentScore);
        const hours = moment(fb.createdAt).diff(moment(startingHour), 'hours');
        let addValue = 0;
        if (sentimentScore === 'POSITIVE') {
          addValue = 5;
        } else if (sentimentScore === 'NEUTRAL') {
          addValue = 2.5;
        }
        if (datas.has(hours + 1)) {
          const newvalue = datas.get(hours + 1)[0] + addValue;
          const newcount = datas.get(hours + 1)[1] + 1;
          if (sentimentScore === 'POSITIVE') {
            const newPositiveCount = datas.get(hours + 1)[2] + 1;
            const oldNeutralCount = datas.get(hours + 1)[3];
            const oldNegativeCount = datas.get(hours + 1)[4];
            datas.set(
              hours + 1,
              [newvalue, newcount, newPositiveCount, oldNeutralCount, oldNegativeCount]
            );
          } else if (sentimentScore === 'NEUTRAL') {
            const oldPositiveCount = datas.get(hours + 1)[2];
            const newNeutralCount = datas.get(hours + 1)[3] + 1;
            const oldNegativeCount = datas.get(hours + 1)[4];
            datas.set(
              hours + 1,
              [newvalue, newcount, oldPositiveCount, newNeutralCount, oldNegativeCount]
            );
          } else {
            const oldPositiveCount = datas.get(hours + 1)[2];
            const oldNeutralCount = datas.get(hours + 1)[3];
            const newNegativeCount = datas.get(hours + 1)[4] + 1;
            datas.set(
              hours + 1,
              [newvalue, newcount, oldPositiveCount, oldNeutralCount, newNegativeCount]
            );
          }
        } else if (sentimentScore === 'POSITIVE') {
          datas.set(hours + 1, [addValue, 1, 1, 0, 0]);
        } else if (sentimentScore === 'NEUTRAL') {
          datas.set(hours + 1, [addValue, 1, 0, 1, 0]);
        } else {
          datas.set(hours + 1, [addValue, 1, 0, 0, 1]);
        }
      });
      console.log(datas);
      console.log(Array.from(datas.keys()));
      const keyArray = Array.from(datas.keys());
      const max = keyArray.reduce((a, b) => {
        return Math.max(a, b);
      });
      console.log(max);
      const newlabels = [];
      const newData = [];
      const newPositive = [];
      const newNeutral = [];
      const newNegative = [];
      let i = 0;
      for (i = 0; i < max; i++) {
        newlabels.push(`Hour ${i}${1}`);
        newData.push(0);
        newPositive.push(0);
        newNeutral.push(0);
        newNegative.push(0);
      }
      console.log(newlabels);
      datas.forEach((value, key) => {
        console.log(`${key}=${value}`);
        newData[key - 1] = Number((value[0] / value[1]).toFixed(1));
        newPositive[key - 1] = Number(value[2]);
        newNeutral[key - 1] = Number(value[3]);
        newNegative[key - 1] = Number(value[4]);
      });
      console.log(newData);
      const barData = {
        datasets: [
          {
            backgroundColor: colors.indigo[500],
            data: newData,
            label: 'Average Sentiment'
          },
          {
            backgroundColor: colors.green[400],
            data: newPositive,
            label: 'Positive Feedbacks'
          },
          {
            backgroundColor: colors.orange[400],
            data: newNeutral,
            label: 'Neutral Feedbacks'
          },
          {
            backgroundColor: colors.red[400],
            data: newNegative,
            label: 'Negative Feedbacks'
          }
        ],
        labels: newlabels
      };
      console.log(barData);
      setData(barData);
    }
  }, [feedback]);

  if (!component) {
    return (
      <Card
        className={classes.root}
      >
        <CardHeader
          title="Sentiment Over Time"
        />
        <Divider />
        <CardContent>
          <Box
            height={400}
            position="relative"
          >
            <Bar
              data={{}}
              options={options}
            />
          </Box>
        </CardContent>
        <Divider />
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card
        className={classes.root}
      >
        <CardHeader
          title="Sentiment Over Time"
        />
        <Divider />
        <CardContent>
          <Box
            height={400}
            position="relative"
          >
            <Loading />
          </Box>
        </CardContent>
        <Divider />
      </Card>
    );
  }

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        title={`Sentiment Over Time: ${component.text}`}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
}

Graph.propTypes = {
  component: PropTypes.object,
  eventId: PropTypes.string
};
