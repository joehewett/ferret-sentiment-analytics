import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API } from 'aws-amplify';
import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';
import { deleteEvent as deleteEventMutation } from '../../../graphql/mutations';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  descDesign: {
    background: 'white',
  },
  typology: {
    fontSize: 24,
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

export default function DeleteEventButton({
  eventid,
  eventCount,
  setEventCount
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function deleteEvent() {
    console.log('delete Event Mutation');
    try {
      await API.graphql({
        query: deleteEventMutation,
        variables: {
          input: { id: eventid }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      console.log('delete Event success');
      setEventCount(eventCount - 1);
      console.log('yes');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        startIcon={<DeleteIcon />}
        className={classes.button}
        color="primary"
        variant="outlined"
        onClick={handleClickOpen}
      >
        DELETE
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className={classes.typology}>Delete Event</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteEvent} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
