/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SentimentIndicator from '../DashboardView/SentimentIndicator';

const ParseSentiment = ({ sentimentJson }) => {
  const [sentiment, setSentiment] = useState('');

  function parseJson(json) {
    let parsedJson = '';
    let predominant = '';

    // parse json and extract predominant sentiment. Put in state
    if (json) {
      parsedJson = JSON.parse(json);
      predominant = parsedJson.textInterpretation.sentiment.predominant;
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

ParseSentiment.propTypes = {
  sentimentJson: PropTypes.string
};

export default ParseSentiment;
