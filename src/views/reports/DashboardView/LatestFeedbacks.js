import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
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

const data = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestFeedbacks = ({ className, ...rest }) => {
  const classes = useStyles();
  // const [feedbacks, setFeedbacks] = useState(0);
  async function getcomponentsByEvent(eventid) {
    try {
      const result = await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function getfeedbackByComponent(componentid) {
    try {
      const result = await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(getcomponentsByEvent('c9bfe57e-0135-4610-9276-9797f700b758'));
  console.log(getfeedbackByComponent('705742a9-38cf-430e-8d8e-224f279a5d5c'));
  const [orders] = useState(data);

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
                  Reference
                </TableCell>
                <TableCell>
                  Attendee ID
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
                <TableCell>
                  View Feedback
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.ref}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.status}
                      size="small"
                    />
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
