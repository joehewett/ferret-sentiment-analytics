/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import {
// makeStyles,
// colors
// } from '@material-ui/core';
import SentimentIndicator from '../DashboardView/SentimentIndicator';

// const useStyles = makeStyles((theme) => ({
//   chip: {
//     marginRight: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//     background: colors.grey[250],
//     color: colors.grey[600]
//   }
// }));

const ParseKeyPhrases = ({ sentimentJson }) => {
  // const classes = useStyles();
  const [sentiment, setSentiment] = useState('');

  function parseJson(json) {
    let parsedJson = '';
    let predominant = '';

    // Null check sentiment score and then parse string back to JSON
    if (json) {
      parsedJson = JSON.parse(json);
      predominant = parsedJson.textInterpretation.sentiment.predominant;
      console.log('domiannt is', predominant);
    }

    setSentiment(predominant);
  }

  useEffect(() => {
    parseJson(sentimentJson);
  }, []);

  if (sentiment === '') {
    return <></>;
  }

  return (
    <SentimentIndicator predominant={sentiment} />
  );
};

ParseKeyPhrases.propTypes = {
  sentimentJson: PropTypes.string
};

export default ParseKeyPhrases;
