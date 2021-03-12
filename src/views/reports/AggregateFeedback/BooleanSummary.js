/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Chip,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
    marginBottom: theme.spacing(2),
    background: '#4cd980',
    color: '#ffffff'
  },
  redChip: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: '#ff776b',
    color: '#ffffff'
  }
}));

const BooleanSummary = ({ feedback, component }) => {
  const [trueFalse, setTrueFalse] = useState({
    true: 0,
    false: 0,
  });
  const [percentages, setPercentages] = useState({
    truePercentage: 0,
    falsePercentage: 0
  });
  const classes = useStyles();

  function countTrueFalse() {
    console.log('feedback for this boolean summary is: ', feedback);
    let falseCount = trueFalse.false;
    let trueCount = trueFalse.true;
    feedback.forEach((singleFeedback) => {
      if (singleFeedback.response === 'false') {
        falseCount += 1;
      }
      if (singleFeedback.response === 'true') {
        trueCount += 1;
      }
    });
    setTrueFalse((currentCounts) => ({
      ...currentCounts,
      false: falseCount,
      true: trueCount
    }));
  }

  function calculatePercentages() {
    const t = trueFalse.true;
    const f = trueFalse.false;
    let tp = 0;
    let fp = 0;

    // Avoid NaN errors by catching division by 0. If both t & f count > 0, compute percentage
    console.log('t is ', t);
    console.log('f is ', f);
    if (t === 0 && f === 0) {
      tp = 0;
      fp = 0;
    } else if (t === 0 && f > 0) {
      tp = 0;
      fp = 100;
    } else if (t > 0 && f === 0) {
      tp = 100;
      fp = 0;
    } else if (t > 0 && f > 0) {
      tp = (t / (t + f)) * 100;
      fp = 100 - tp;
    }

    console.log('tp is ', tp);
    console.log('fp is ', fp);
    setPercentages({ truePercentage: tp.toFixed(2), falsePercentage: fp.toFixed(2) });
  }

  useEffect(() => {
    countTrueFalse();
  }, []);

  useEffect(() => {
    calculatePercentages();
  }, [trueFalse.true, trueFalse.false]);

  return (
    <Card
      className={classes.root}
    >
      <CardHeader title={component.text} />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  True
                </TableCell>
                <TableCell>
                  False
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                // key={data.id}
              >
                <TableCell>
                  {trueFalse.true}
                </TableCell>
                <TableCell>
                  {trueFalse.false}
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
          <Chip className={classes.greenChip} label={`True: ${percentages.truePercentage}%`} />
          <Chip className={classes.redChip} label={`False: ${percentages.falsePercentage}%`} />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

BooleanSummary.propTypes = {
  feedback: PropTypes.array
};

export default BooleanSummary;
