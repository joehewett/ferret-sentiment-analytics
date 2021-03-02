/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { API } from 'aws-amplify';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  TextField,
  CardContent,
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteComponent as deleteComponentMutation } from '../../../graphql/mutations';
import SubmitButton from './SubmitButton';

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

export default function FormComponents({
  fetchComponents,
  components,
  setComponents,
  loadedComponents,
}) {
  const classes = useStyles();

  useEffect(() => {
    fetchComponents();
  }, []);

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

  if (!components || components.length === 0) {
    return (
      <Card>
        <CardHeader
          subheader="This feedback form doesn't have any questions!"
          title="Feedback Form"
        />
      </Card>
    );
  }

  // eslint-disable-next-line no-constant-condition
  return (
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
                multiline
                helperText={component.text}
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
                variant="outlined"
                value={component.response || ''}
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
        <SubmitButton components={components} setComponents={setComponents} />
      </Box>
    </Card>
  );
}
