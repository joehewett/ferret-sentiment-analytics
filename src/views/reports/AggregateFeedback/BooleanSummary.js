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
  Chip
  // makeStyles
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

// const useStyles = makeStyles(() => ({
//   root: {},
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
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

const BooleanSummary = ({ feedback, component }) => {
  const [trueFalse, setTrueFalse] = useState({
    true: 0,
    false: 0,
    truePercentage: 0,
    falsePercentage: 0
  });
  const classes = useStyles();
  console.log('feedback for this box is: ', feedback);
  console.log('component is :', component);

  function countTrueFalse() {
    feedback.forEach((singleFeedback) => {
      if (singleFeedback.response === 'false') {
        let falseCount = trueFalse.false;
        falseCount += 1;
        setTrueFalse((currentCounts) => ({ ...currentCounts, false: falseCount }));
      }
      if (singleFeedback.response === 'true') {
        let trueCount = trueFalse.true;
        trueCount += 1;
        setTrueFalse((currentCounts) => ({ ...currentCounts, true: trueCount }));
      }
    });
    const t = trueFalse.true;
    const f = trueFalse.false;
    let tp = 0;
    let fp = 0;

    // Avoid NaN errors by catching division by 0. If both t & f count > 0, compute percentage
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
    setTrueFalse((currentCounts) => ({
      ...currentCounts,
      truePercentage: tp,
      falsePercentage: fp
    }));
  }

  useEffect(() => {
    countTrueFalse();
  }, []);

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
          <Chip className={classes.greenChip} label={`True: ${trueFalse.truePercentage}%`} />
          <Chip className={classes.redChip} label={`False: ${trueFalse.falsePercentage}%`} />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

BooleanSummary.propTypes = {
  feedback: PropTypes.array
};

export default BooleanSummary;
