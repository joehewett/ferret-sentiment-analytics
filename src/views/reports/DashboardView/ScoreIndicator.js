/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  downIcon: {
    color: colors.red[900]
  },
  upIcon: {
    color: colors.green[900]
  },
  upValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  downValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const ScoreIndictor = ({
  score
}) => {
  const [percentage, setPercentage] = useState();
  const classes = useStyles();

  useEffect(() => {
    setPercentage((score / 5) * 100);
    console.log('score is ', score);
  }, []);

  if (percentage < 0) {
    return (
      <>
        <ArrowDownwardIcon className={classes.downIcon} />
        <Typography
          className={classes.downValue}
          variant="body2"
        >
          {percentage}
          %
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          worse than than average!
        </Typography>
      </>
    );
  }

  if (percentage > 0) {
    return (
      <>
        <ArrowUpwardIcon className={classes.upIcon} />
        <Typography
          className={classes.upValue}
          variant="body2"
        >
          {percentage}
          %
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          better than average!
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography
        color="textSecondary"
        variant="caption"
      >
        We don&apos;t have enough data to tell you if this is a good score or not!
      </Typography>
    </>
  );
};

ScoreIndictor.propTypes = {
  score: PropTypes.number
};

export default ScoreIndictor;
