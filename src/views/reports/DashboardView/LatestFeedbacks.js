/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { feedbackByComponent, componentsByEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestFeedbacks = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [componentIdList, setComponentIdList] = useState([]);
  const [feedbackIdList, setFeedbackIdList] = useState([]);
  const [queryData, setQueryData] = useState([{}]);
  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log(result);
        setFeedbackIdList(result.data.feedbackByComponent.items);
        console.log('setfeedbackidlist to result from query');
      });
    } catch (error) {
      console.log(error);
    }
  }
  // const [dataForTable, setDataForTable] = useState([]);
  async function getComponentsByEvent(eventid) {
    try {
      await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const componentIds = result.data.componentsByEvent.items;
        setComponentIdList(componentIds);
        console.log(componentIdList);
        console.log('setcomponentid to result from query');
        if (componentIds.length !== 0) {
          getFeedbackByComponent(componentIds[0].id);
          console.log(componentIds[0].id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComponentsByEvent(id);
  }, []);

  // useEffect(() => {
  //   console.log('componentidlist', componentIdList);
  //   console.log(componentIdList.length);
  //   if (componentIdList.length !== 0) {
  //     getFeedbackByComponent(componentIdList[0].id);
  //     console.log(componentIdList[0].id);
  //   }
  // // }, [componentIdList]);
  useEffect(() => {
    console.log('a');
    console.log(feedbackIdList.length);
    if (feedbackIdList.length !== 0) {
      console.log('b');
      console.log('feedbackidlist', feedbackIdList);
      const tableData = [];
      feedbackIdList.forEach((feedback) => {
        console.log('feedbacks', feedback);
        const sentimentInput = JSON.parse(
          feedback.sentiment_score
        );
        console.log('sentiment', sentimentInput);
        const newData = {
          id: feedback.id,
          owner: feedback.owner,
          createdAt: feedback.createdAt,
          sentimentScore: sentimentInput.textInterpretation.sentiment.predominant
        };
        console.log(moment(newData.createdAt).format('DD/MM/YYYY'));
        tableData.push(newData);
        console.log(tableData);
        console.log(newData);
        console.log('c');
      });
      setQueryData(tableData);
      console.log('data', tableData);
    }
    console.log('d');
  }, [feedbackIdList]);
  console.log(queryData);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Feedbacks" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Feedback ID
                </TableCell>
                <TableCell>
                  Attendee Name
                </TableCell>
                <TableCell>
                  Individual Sentiment
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Time
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queryData.map((data) => (
                <TableRow
                  hover
                  key={data.id}
                >
                  <TableCell>
                    {data.id}
                  </TableCell>
                  <TableCell>
                    {data.owner}
                  </TableCell>
                  <TableCell>
                    {data.sentimentScore}
                  </TableCell>
                  <TableCell>
                    {moment(data.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestFeedbacks.propTypes = {
  className: PropTypes.string
};

export default LatestFeedbacks;
