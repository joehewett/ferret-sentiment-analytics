/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { API } from 'aws-amplify';
import { feedbackByComponent } from 'src/graphql/queries';
import BooleanSummary from './BooleanSummary';
import ScaleSummary from './ScaleSummary';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end'
  },
  componentCard: {
    marginTop: theme.spacing(1)
  }
}));

const ComponentSummary = ({
  component,
}) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  async function getFeedbackByComponent(componentId) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentId },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        setFeedback(result.data.feedbackByComponent.items);
        console.log('Feedback for this CompnoentSummary is: ', result.data.feedbackByComponent.items);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFeedbackByComponent(component.id);
    console.log(isLoading);
  }, []);

  if (isLoading) return <h2>Loading</h2>;

  if (feedback.length === 0) {
    return (
      <Card
        className={classes.root}
      >
        <CardHeader title={component.text} subheader="No feedback has been received for this question yet." />
        <Divider />
      </Card>
    );
  }

  if (component.type === 'textbox') {
    return (
      <h2>textbox - under construction</h2>
    );
  }

  if (component.type === 'boolean') {
    return (
      <BooleanSummary feedback={feedback} component={component} />
    );
  }

  if (component.type === 'scale') {
    return (
      <ScaleSummary feedback={feedback} component={component} />
    );
  }

  return (
    <Card
      className={clsx(classes.root)}
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
              <TableRow
                hover
              >
                <TableCell>
                  Testing
                </TableCell>
                <TableCell>
                  Testing 2
                </TableCell>
                <TableCell>
                  Testing 3
                </TableCell>
                <TableCell>
                  Testing 4
                  {/* {moment(data.createdAt).format('DD/MM/YYYY')} */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ComponentSummary.propTypes = {
  component: PropTypes.object
};

export default ComponentSummary;
