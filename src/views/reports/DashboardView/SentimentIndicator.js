/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  negative: {
    background: '#ff776b',
    color: '#ffffff'
  },
  positive: {
    background: '#4cd980',
    color: '#ffffff'
  },
  icons: {
    color: '#ffffff'
  }
}));

export default function SentimentIndicator({ predominant }) {
  const classes = useStyles();

  if (predominant === 'POSITIVE') {
    return (
      <div className={classes.root}>
        <Chip size="small" label={predominant} className={classes.positive} icon={<InsertEmoticonIcon className={classes.icons} />} />
      </div>
    );
  }
  if (predominant === 'NEGATIVE') {
    return (
      <div className={classes.root}>
        <Chip size="small" label={predominant} className={classes.negative} icon={<SentimentVeryDissatisfiedIcon className={classes.icons} />} />
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Chip size="small" label={predominant} icon={<SentimentSatisfiedIcon />} />
    </div>
  );
}
