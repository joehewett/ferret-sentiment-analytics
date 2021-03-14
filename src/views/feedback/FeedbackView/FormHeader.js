/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Card,
  CardHeader
} from '@material-ui/core';
import { API } from 'aws-amplify';
import { getEvent } from '../../../graphql/queries';
import Loading from '../../../components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  input: {
    width: '80%',
    marginRight: theme.spacing(3)
  },
  deleteButton: {
    color: '#e0392d'
  }
}));

export default function FormHeader({ id }) {
  const classes = useStyles();
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function fetchEventInformation() {
    let loadedEvent;
    try {
      API.graphql({
        query: getEvent,
        variables: {
          id
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        loadedEvent = result.data.getEvent;
        console.log(loadedEvent);
        setEvent(loadedEvent);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEventInformation();
  }, []);

  if (id && !isLoading) {
    return (
      <>
        <Card className={classes.root}>
          <CardHeader
            title={event.name}
            subheader={event.description}
          />
        </Card>
      </>
    );
  }
  return (
    <Card>
      <Loading />
    </Card>
  );
}
