import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  TextField,
  CardContent,
  Box,
  Button,
  IconButton,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import { componentsByEvent } from '../../../graphql/queries';
import { createComponent, deleteComponent as deleteComponentMutation } from '../../../graphql/mutations';

const states = [
  {
    value: 'textbox',
    label: 'Textbox'
  },
  {
    value: 'boolean',
    label: 'Yes or No'
  },
  {
    value: 'scale',
    label: 'Scale 1-10'
  }
];

const newComponentFormState = { type: '', text: '', event_id: '' };

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.light,
    // minHeight: '20%',
    // paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3)
  },
  input: {
    width: '70%',
    marginRight: theme.spacing(3)
  },
  deleteButton: {
    color: '#e0392d'
  }
}));

export default function FeedbackForm() {
  const classes = useStyles();
  const [components, setComponents] = useState([]);
  // Store data from the New Component form
  const [newComponentData, setNewComponentData] = useState(
    newComponentFormState
  );

  // We don't know what components we're going to have yet
  // so just initialise our feedback to an empty array
  const [loadedComponents, setLoadedComponents] = useState(false);
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

  useEffect(() => {
    newComponentFormState.event_id = id;
    // We've now got the event_id from the router, so add that to our new component data.
    setNewComponentData({ ...newComponentData, event_id: id });
    // Get existing components from the database for this feedback form
    fetchComponents();
  }, []);

  // When user clicks Add Component, trigger createComponent mutation with data in state
  async function addComponent() {
    console.log('Adding Component');
    if (!newComponentData.type || !newComponentData.text) {
      console.log('Not filled');
      return;
    }

    try {
      await API.graphql({
        query: createComponent,
        variables: {
          input: newComponentData
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        console.log('Added new component: ', result);
        fetchComponents();
        // let newID = 0;
        // newID = result.data.createComponent.id;
      });
      console.log('createCompontent success');
      setComponents([...components, newComponentData]);
      setNewComponentData(newComponentFormState);
    } catch (error) {
      console.log(error);
    }
  }

  // Load in the components that have already been created for this form

  // Called when feedback form is submitted
  async function handleSubmit() {
    console.log('Submitting');
    // const deepCopy = [...components];

    // try {
    //     await API.graphql({
    //         query: createFeedback,
    //         variables: {
    //             input: newComponentData
    //         },
    //         authMode: "AMAZON_COGNITO_USER_POOLS"
    //     }).then((result) => {
    //         console.log("Added new component: ", result)
    //         newID = result.data.createComponent.id
    //     });
    // } catch(error) {

    // }
    // deepCopy.map((component) => {
    //   component.response = '';
    // });
    // // TODO - actually store this form data in the database
    // setComponents(deepCopy);
  }

  async function deleteComponent(cid) {
    console.log('Deleting component ', cid);
    try {
      await API.graphql({
        query: deleteComponentMutation,
        variables: { input: { id: cid } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then(() => {
        const newComponentsArray = components.filter(
          (newComponent) => newComponent.id !== cid
        );
        setComponents(newComponentsArray);
      });
    } catch (error) {
      console.log('Error while trying to delete component ', cid, ' - ', error);
    }
  }

  if (!loadedComponents) return <h1>Loading</h1>;

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          subheader="Customise your feedback form by adding components"
          title="Create Component"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Component"
                name="type"
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
                onChange={(e) => setNewComponentData({
                  ...newComponentData,
                  type: e.target.value
                })}
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please add a description to acompany your component"
                name="text"
                onChange={(e) => setNewComponentData({
                  ...newComponentData,
                  text: e.target.value
                })}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={addComponent}
            startIcon={<AddBoxIcon />}
          >
            Add Component
          </Button>
        </Box>
      </Card>
      <Card>
        <CardHeader
          subheader="Please fill in the information below"
          title="Feedback Form"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {components.map((component) => (
              <Grid
                key={component.id}
                item
                md={10}
                xs={10}
              >
                <TextField
                  className={classes.input}
                  helperText={component.text}
                  name="firstName"
                  onChange={(e) => {
                    console.log('Making a component with id: ', component.id);
                    // Create an onChange handler that updates the feedback state with with this
                    // inputs information
                    const deepCopy = [...components];
                    const i = deepCopy
                      .map((x) => {
                        return x.id;
                      })
                      .indexOf(component.id);
                    console.log('i', i);
                    deepCopy[i].response = e.target.value;
                    setComponents(deepCopy);
                  }}
                  required
                  value={component.response}
                  variant="outlined"
                />
                <IconButton
                  variant="contained"
                  className={classes.deleteButton}
                  onClick={() => {
                    deleteComponent(component.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SendIcon />}
          >
            Submit Form
          </Button>
        </Box>
      </Card>
    </>
  );
}
