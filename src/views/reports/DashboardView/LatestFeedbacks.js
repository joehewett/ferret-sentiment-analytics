/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  TablePagination,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { feedbackByComponent, componentsByEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import SentimentIndicator from './SentimentIndicator';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestFeedbacks = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [components, setComponents] = useState([]);
  const [feedbackIdList, setFeedbackIdList] = useState([]);
  const [queryData, setQueryData] = useState([{}]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log(result);
        setFeedbackIdList(result.data.feedbackByComponent.items);
        // console.log('setfeedbackidlist to result from query');
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
        const componentList = result.data.componentsByEvent.items;
        setComponents(componentList);
        console.log(componentList);
        // console.log('setcomponentid to result from query');
        let done = false;
        if (componentList.length !== 0) {
          componentList.forEach((component) => {
            if (!done) {
              if (component.type === 'textbox') {
                getFeedbackByComponent(components[0].id);
                done = true;
              }
            }
          });
          // console.log(components[0].id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComponentsByEvent(id);
  }, []);

  useEffect(() => {
    // Check we have feedback before parsing out information
    if (feedbackIdList.length !== 0) {
      const tableData = [];
      feedbackIdList.forEach((feedback) => {
        let sentimentInput = '';
        let sentimentScore = 0;

        // Null check sentiment score and then parse string back to JSON
        if (feedback.sentiment_score) {
          sentimentInput = JSON.parse(
            feedback.sentiment_score
          );
          if (sentimentInput) {
            sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
          }
        }

        // Add our parsed data to the table
        const newData = {
          id: feedback.id,
          owner: feedback.owner,
          createdAt: feedback.createdAt,
          sentimentScore
        };
        tableData.push(newData);
      });
      setQueryData(tableData);
    }
  }, [feedbackIdList]);

  if (components.length === 0) {
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Latest Feedbacks" subheader="There is no feedback avaialable for this event." />
        <Divider />

      </Card>
    );
  }

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
              {queryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
                    <SentimentIndicator predominant={data.sentimentScore} />
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
      <TablePagination
        rowsPerPageOptions={[6, 12, 18]}
        component="div"
        count={queryData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

LatestFeedbacks.propTypes = {
  className: PropTypes.string
};

export default LatestFeedbacks;
