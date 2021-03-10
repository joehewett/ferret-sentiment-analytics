/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Button,
  CardContent,
  useTheme,
  colors
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  image: {
    height: 48,
    width: 48
  },
  greenChip: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    background: '#4cd980',
    color: '#ffffff'
  },
  redChip: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    background: '#ff776b',
    color: '#ffffff'
  }
}));

const ScaleSummary = ({ feedback, component }) => {
  const [scoreCounts, setScoreCounts] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [showGraph, setShowGraph] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  function countScores() {
    const scoresCopy = [...scoreCounts];
    feedback.forEach((f) => {
      if (f.response) {
        const score = Number(f.response);
        if (score > 0 && score <= 10) {
          scoresCopy[score - 1] += 1;
          console.log('here');
          if (!showGraph) {
            console.log('switching');
            setShowGraph(true);
          }
        }
      }
    });
    setScoreCounts(scoresCopy);
    console.log('Scores copy is..', scoresCopy);
  }

  useEffect(() => {
    countScores();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: scoreCounts,
        label: 'This year'
      },
    ],
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  };

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

  if (!showGraph) {
    return (
      <Card className={classes.root}>
        <CardHeader
          title={component.text}
          subheader="There is no data to display for this 1-10 scale."
        />
      </Card>
    );
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        title={component.text}
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
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

ScaleSummary.propTypes = {
  feedback: PropTypes.array,
  // component: PropTypes.array,
};

export default ScaleSummary;
