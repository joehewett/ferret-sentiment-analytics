/* eslint-disable react/prop-types */
import React from 'react';
import { API } from 'aws-amplify';
import {
  IconButton,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteComponent as deleteComponentMutation } from '../../../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  deleteButton: {
    color: '#e0392d',
    float: 'right'
  },
}));

export default function ClearButton({
  component,
  components,
  setComponents,
  userIsOwner
}) {
  const classes = useStyles();

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

  if (userIsOwner) {
    return (
      <IconButton
        variant="contained"
        className={classes.deleteButton}
        onClick={() => {
          deleteComponent(component.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  }
  return (
    <div />
    // <IconButton
    //   variant="contained"
    //   className={classes.deleteButton}
    //   onClick={() => {
    //     clearComponent(component.id);
    //   }}
    // >
    //   <DeleteIcon />
    // </IconButton>
  );
}
