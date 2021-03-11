/* eslint react/prop-types: 0 */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Graph from './Graph';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));


export default function SentimentOverTime({ components, eventId }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [validComponents, setValidComponents] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function findValidComponents() {
    let valids = [];
    components.forEach((component) => {
      if (component.type === 'textbox' && component.sentiment_score !== '') {
        valids.push(component);
      }
    })
    setValidComponents(valids);
    console.log('valids: ', valids);
  }

  useEffect(() => {
    console.log('sanity check;');
    // On load, iterate over components and get all valid textbox components with non null sentiment
    // Render a graph and button for each 
    findValidComponents();
    console.log('sanity check;');
  }, []);

  if (validComponents.length === 0) {
    return <h2>No data to show in graph</h2>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          
          {validComponents.map((component, index) => (
            <Tab
              key={component.id}
              label={`Item ${index}`}
              {...a11yProps(index)}
            />
          ))}

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {validComponents.map((component, index) => (
          <TabPanel
            key={component.id}
            value={value}
            index={index}
            dir={theme.direction}
          >
            <Graph component={component} eventId={eventId} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

SentimentOverTime.propTypes = {
  className: PropTypes.string
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
