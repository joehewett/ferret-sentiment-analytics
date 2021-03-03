import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { componentsByEvent, getEvent } from '../../../graphql/queries';
import AddComponentForm from './AddComponentForm';
import FormComponents from './FormComponents';

export default function FeedbackForm() {
  const [components, setComponents] = useState([]);
  // Store data from the New Component form
  const [loadedComponents, setLoadedComponents] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const { id } = useParams();

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
