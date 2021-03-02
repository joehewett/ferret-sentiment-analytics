import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
// import {
//   Grid,
//   Card,
//   CardHeader,
//   Divider,
//   TextField,
//   CardContent,
//   Box,
//   Button,
//   IconButton,
//   makeStyles
// } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { componentsByEvent, getEvent } from '../../../graphql/queries';
import AddComponentForm from './AddComponentForm';
import FormComponents from './FormComponents';

const newComponentFormState = { type: '', text: '', event_id: '' };

export default function FeedbackForm() {
  const [components, setComponents] = useState([]);
  // Store data from the New Component form
  const [newComponentData, setNewComponentData] = useState(
    newComponentFormState
  );

  // We don't know what components we're going to have yet
  // so just initialise our feedback to an empty array
  const [loadedComponents, setLoadedComponents] = useState(false);

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const { id } = useParams();
  // const id = '61d4bf80-a051-4f24-96d7-550472139622';

  async function fetchComponents() {
    let feedbackComponents;

    try {
      await API.graphql({
        query: componentsByEvent,
        variables: {
          event_id: id
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        feedbackComponents = result.data.componentsByEvent.items;
      });
    } catch (error) {
      console.log(error);
    }

    setComponents(feedbackComponents);
    setLoadedComponents(true);
  }

  async function checkIfAdmin(eventID) {
    console.log(eventID);
    const user = await Auth.currentAuthenticatedUser();
    try {
      await API.graphql({
        query: getEvent,
        variables: {
          id: eventID
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const { owner } = result.data.getEvent;
        if (owner === user.username) {
          setUserIsAdmin(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    newComponentFormState.event_id = id;
    // We've now got the event_id from the router, so add that to our new component data.
    setNewComponentData({ ...newComponentData, event_id: id });
    // Get existing components from the database for this feedback form
    fetchComponents();
    checkIfAdmin(id);
  }, []);

  if (!loadedComponents) return <h1>Loading</h1>;

  if (userIsAdmin) {
    return (
      <>
        <AddComponentForm id={id} fetchComponents={fetchComponents} />
        <FormComponents
          fetchComponents={fetchComponents}
          components={components}
          setComponents={setComponents}
          loadedComponents={loadedComponents}
        />
      </>
    );
  }
  return (
    <>
      <FormComponents
        fetchComponents={fetchComponents}
        components={components}
        setComponents={setComponents}
        loadedComponents={loadedComponents}
      />
    </>
  );
}
