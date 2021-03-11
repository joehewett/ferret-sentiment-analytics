/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  makeStyles,
  colors
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: colors.grey[250],
    color: colors.grey[600]
  }
}));

const ParseKeyPhrases = ({ sentimentJson }) => {
  const classes = useStyles();
  const [keyPhrases, setKeyPhrases] = useState('');

  function parseJson(json) {
    let parsedJson = '';
    let kp = [];

    // Null check sentiment score and then parse string back to JSON
    if (json) {
      parsedJson = JSON.parse(json);
      kp = parsedJson.textInterpretation.keyPhrases;
    }

    const fivePhrases = [];
    if (kp.length !== 0) {
      kp.slice(0, 5).forEach((p) => {
        fivePhrases.push(p.text);
      });
    }

    setKeyPhrases(fivePhrases);
    return kp;
  }

  useEffect(() => {
    parseJson(sentimentJson);
  }, []);

  if (keyPhrases.length === 0) {
    return <></>;
  }

  return (
    <>
      {keyPhrases.map((phrase) => (
        <Chip
          key={uuidv4()}
          className={classes.chip}
          label={phrase}
        />
      ))}
    </>
  );
};

ParseKeyPhrases.propTypes = {
  sentimentJson: PropTypes.string
};

export default ParseKeyPhrases;
