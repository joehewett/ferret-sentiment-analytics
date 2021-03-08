/* eslint react/prop-types: 0 */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import { feedbackByComponent, componentsByEvent, getEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SentimentOvertime = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [componentIdList, setComponentIdList] = useState([]);
  const [feedbackIdList, setFeedbackIdList] = useState([]);
  const [startingHour, setStartingHour] = useState();
  const [data, setData] = useState({})
  // let data = {
  //   datasets: [
  //     {
  //       backgroundColor: colors.indigo[500],
  //       data: [],
  //       label: 'Average Sentiment'
  //     },
  //     // {
  //     //   backgroundColor: colors.grey[200],
  //     //   data: [11, 20, 12, 29, 30, 25, 13],
  //     //   label: 'Last year'
  //     // }
  //   ],
  //   labels: []
  // };

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

  async function setStartingTime(eventid) {
    try {
      await API.graphql({
        query: getEvent,
        variables: { id: eventid },
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
        setFeedbackIdList(result.data.feedbackByComponent.items);
        console.log('setfeedbackidlist to result from query');
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
        console.log('setcomponentid to result from query');
        if (componentIds.length !== 0) {
          getFeedbackByComponent(componentIds[0].id);
          console.log(componentIds[0].id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComponentsByEvent(id);
    setStartingTime(id);
  }, []);

  function show() {
    console.log(componentIdList);
    console.log(feedbackIdList);
    console.log(startingHour);
    console.log(data);
  }
  useEffect(() => {
    if (feedbackIdList.length !== 0) {
      let total = 0;
      const sortedFeedback = feedbackIdList.sort((a, b) => {
        return moment(a.createdAt).diff(b.createdAt);
      });
      console.log(sortedFeedback);
      let datas = new Map();
      sortedFeedback.forEach((feedback) => {
        const sentimentInput = JSON.parse(
          feedback.sentiment_score
        );
        // console.log('sentiment', sentimentInput);
        const sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
        console.log('difference in hours', moment(feedback.createdAt).diff(moment(startingHour), 'hours'));
        console.log(sentimentScore);
        const hours = moment(feedback.createdAt).diff(moment(startingHour), 'hours');
        let addValue = 0;
        if (sentimentScore === 'POSITIVE') {
          addValue = 5;
        } else if (sentimentScore === 'NEUTRAL') {
          addValue = 2.5;
        }
        if (datas.has(hours + 1)) {
          const newvalue = datas.get(hours + 1)[0] + addValue;
          const newcount = datas.get(hours + 1)[1] + 1;
          datas.set(hours + 1,[newvalue,newcount]);
        } else {
          total = 0;
          datas.set(hours + 1,[addValue,1]);
        }
      });
      console.log(datas);
      console.log(Array.from(datas.keys()));
      const keyArray = Array.from(datas.keys());
      const max = keyArray.reduce(function(a,b) {
        return Math.max(a,b);
      })
      console.log(max);
      let newlabels = []
      let newData = []
      let i = 0;
      for (i = 0; i < max; i++) {
        newlabels.push(i+1);
        newData.push(0);
      }
      console.log(newlabels);
      datas.forEach(function(value,key) {
        console.log(key + '=' + value);
        newData[key-1] = Number((value[0] / value[1]).toFixed(1));
      })
      console.log(newData);
      const data = {
        datasets: [
          {
            backgroundColor: colors.indigo[500],
            data: newData,
            label: 'Average Sentiment'
          },
          // {
          //   backgroundColor: colors.grey[200],
          //   data: [11, 20, 12, 29, 30, 25, 13],
          //   label: 'Last year'
          // }
        ],
        labels: newlabels
      };
      console.log(data);
      setData(data);
    }
  }, [feedbackIdList]);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Sentiment Overtime"
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
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button onClick={show}>test</Button>
      </Box>
    </Card>
  );
};

SentimentOvertime.propTypes = {
  className: PropTypes.string
};

export default SentimentOvertime;
