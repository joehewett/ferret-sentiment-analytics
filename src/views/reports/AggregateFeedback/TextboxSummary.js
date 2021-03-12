/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import SentimentIndicator from '../DashboardView/SentimentIndicator';
import ParseKeyPhrases from './ParseKeyPhrases';
import ParseSentiment from './ParseSentiment';

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

const TextboxSummary = ({ feedback, component }) => {
  const classes = useStyles();
  // Iterate over every component and create a new row in the table
  // Sentiment | Key Phrases
  // Finally show total negative, neutral, positive feedback and percentages
  console.log('all feedback: ', feedback);
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
                  Sentiment
                </TableCell>
                <TableCell>
                  Key Phrases
                </TableCell>
                <TableCell>
                  Response
                </TableCell>
                <TableCell>
                  Received
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedback.map((fb) => (
                <TableRow
                  key={fb.id}
                  hover
                >
                  <TableCell>
                    <ParseSentiment sentimentJson={fb.sentiment_score} />
                  </TableCell>
                  <TableCell>
                    <ParseKeyPhrases sentimentJson={fb.sentiment_score} />
                  </TableCell>
                  <TableCell>
                    {fb.response}
                  </TableCell>
                  <TableCell>
                    {moment(fb.createdAt).fromNow()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Chip className={classes.greenChip} label="test" />
          <Chip className={classes.redChip} label="testing" /> */}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TextboxSummary.propTypes = {
  feedback: PropTypes.array
};

export default TextboxSummary;
