/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button
} from '@material-ui/core';
import { CSVLink } from 'react-csv';
import { API } from 'aws-amplify';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { getEvent } from '../../../graphql/queries';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1)
  },
}));

const ExportButton = ({ event }) => {
  const classes = useStyles();
  const [eventData, setEventData] = useState([]);

  async function loadEventData() {
    try {
      // const user = await Auth.currentAuthenticatedUser();
      await API.graphql({
        query: getEvent,
        variables: {
          id: event.id
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log('result is: ', result);
        setEventData(JSON.stringify(result.data.getEvent));
      });
    } catch (error) {
      console.log('Error while trying to fetch event data: ', error);
    }
  }
  useEffect(() => {
    loadEventData();
  }, []);

  if (!eventData) {
    return <p>No Data</p>;
  }

  return (
    <CSVLink
      data={eventData}
      target="_blank"
      filename={`ferret_event_${event.id}.csv`}
      // className={classes.button}
    >
      <Button
        variant="contained"
        startIcon={<SystemUpdateAltIcon />}
        className={classes.button}
      >
        Download
      </Button>

    </CSVLink>
  );
};

ExportButton.propTypes = {
  event: PropTypes.object.isRequired
};

export default ExportButton;
