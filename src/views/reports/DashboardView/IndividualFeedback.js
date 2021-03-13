/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';
import { feedbackByComponent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import moment from 'moment';

const IndividualFeedback = ({ component }) => {
  const [feedback, setFeedback] = useState();
  const [isLoading, setIsLoading] = useState(0);
  async function getFeedbackByComponent(componentId) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentId },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const feedbacks = result.data.feedbackByComponent.items;
        const sortedFeedback = feedbacks.sort((a, b) => {
          return moment(b.createdAt).diff(a.createdAt);
        });
        setFeedback(sortedFeedback[0]);
        setIsLoading(1);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFeedbackByComponent(component.id);
  }, []);
  if (isLoading) {
    return (
      <TableRow
        key={uuidv4}
        hover
      >
        <TableCell>
          {component.text}
        </TableCell>
        <TableCell>
          {feedback.response}
        </TableCell>
        <TableCell>
          {moment(feedback.createdAt).fromNow()}
        </TableCell>
      </TableRow>
    );
  }
  return (
    <TableRow
      key={uuidv4}
      hover
    >
      <TableCell>
        Loading
      </TableCell>
      <TableCell>
        Loading
      </TableCell>
    </TableRow>
  );
};

IndividualFeedback.propTypes = {
  component: PropTypes.object
};

export default IndividualFeedback;
