/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardHeader,
  useTheme
} from '@material-ui/core';
import ComponentSummary from './ComponentSummary';

// For each component, fetch the feedback for that component and then render a ComponentSummary
// Pass component feedback and component type, then inside ComponentSummary, render based on type
const FeedbackSummary = ({ components }) => {
  console.log('components received: ', components);
  const theme = useTheme();

  if (components.length === 0) {
    return (
      <>
        <Typography variant="h2">Feedback Summaries</Typography>
        <Card style={{ marginTop: theme.spacing(2) }}>
          <CardHeader
            title="No feedback has been given for this event."
            subheader="Share the QR code with your attendees so that they can give feedback."
          />
        </Card>
      </>
    );
  }
  return (
    <>
      <Typography variant="h2">Feedback Summaries</Typography>
      {components.map((component) => (
        <ComponentSummary key={component.id} component={component} />
      ))}
    </>
  );
};

FeedbackSummary.propTypes = {
  components: PropTypes.array
};

export default FeedbackSummary;
