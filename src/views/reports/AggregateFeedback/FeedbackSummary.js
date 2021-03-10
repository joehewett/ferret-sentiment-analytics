/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ComponentSummary from './ComponentSummary';

// For each component, fetch the feedback for that component and then render a ComponentSummary
// Pass component feedback and component type, then inside ComponentSummary, render based on type
const FeedbackSummary = ({
  components,
}) => {
  console.log('components received: ', components);
  return (
    <>
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
