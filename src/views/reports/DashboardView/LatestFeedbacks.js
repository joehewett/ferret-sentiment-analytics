/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
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
  TableRow,
  TablePagination,
  makeStyles,
  TableCell
} from '@material-ui/core';
import IndividualFeedback from './IndividualFeedback';
// import { feedbackByComponent } from 'src/graphql/queries';
// import { API } from 'aws-amplify';
// import SentimentIndicator from './SentimentIndicator';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));
const LatestFeedbacks = ({
  className,
  components,
  id,
  ...rest
}) => {
  const classes = useStyles();
  // const [components, setComponents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      <CardHeader title="Latest Feedback" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  Component Description
                </TableCell>
                <TableCell>
                  Feedback Response
                </TableCell>
                <TableCell>
                  Feedback Submission Time
                </TableCell>
              </TableRow>
              {components.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((component) => (
                <IndividualFeedback component={component} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[6, 12, 18]}
        component="div"
        count={components.length}
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
