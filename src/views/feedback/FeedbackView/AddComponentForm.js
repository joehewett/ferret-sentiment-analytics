/* eslint-disable react/prop-types */
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
  makeStyles,
  withStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputBase,
  Typography
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { createComponent } from '../../../graphql/mutations';

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

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  input: {
    width: '70%',
    marginRight: theme.spacing(2)
  },
  deleteButton: {
    color: '#e0392d'
  },
  margin: {
    margin: theme.spacing(1)
  },
  componentType: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  helpTitle: {
    marginTop: theme.spacing(4)
  }
}));

export default function AddComponentForm({ id, fetchComponents }) {
  const classes = useStyles();
  const [components, setComponents] = useState([]);
  // Store data from the New Component form
  const [newComponentData, setNewComponentData] = useState(newComponentFormState);

  useEffect(() => {
    newComponentFormState.event_id = id;
    // We've now got the event_id from the router, so add that to our new component data.
    setNewComponentData({ ...newComponentData, event_id: id });
    // Get existing components from the database for this feedback form
  }, []);

  // When user clicks Add Component, trigger createComponent mutation with data in state
  async function addComponent() {
    console.log('Adding Component');
    if (!newComponentData.type || !newComponentData.text) {
      // eslint-disable-next-line no-alert
      alert('Please enter a component type and a question.');
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
              <FormControl className={classes.componentType} fullWidth>
                <InputLabel id="component_type_label">Component Type</InputLabel>
                <Select
                  labelId="component_type_label"
                  id="component_type"
                  input={<BootstrapInput />}
                  value={newComponentData.type}
                  onChange={(e) => setNewComponentData({
                    ...newComponentData,
                    type: e.target.value
                  })}
                >
                  {states.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                className={classes.margin}
                fullWidth
                multiline
                helperText="Please add a description to accompany your component"
                name="text"
                onChange={(e) => setNewComponentData({
                  ...newComponentData,
                  text: e.target.value
                })}
                required
                variant="outlined"
                value={newComponentData.text || ''}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography className={classes.helpTitle} variant="h5">Welcome to your feedback form!</Typography>
              <Typography>
                Please use the controls here to select the component type that
                you want to add, and then enter the helper text to go along with your new
                component.
              </Typography>
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
            color="primary"
            variant="contained"
            onClick={addComponent}
            startIcon={<AddBoxIcon />}
          >
            Add Component
          </Button>
        </Box>
      </Card>
    </>
  );
}
