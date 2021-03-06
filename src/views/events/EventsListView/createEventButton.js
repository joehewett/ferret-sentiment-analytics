import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { API, Auth } from 'aws-amplify';
import { createEvent as createEventMutation } from '../../../graphql/mutations';
/* eslint react/prop-types: 0 */

const initialFormState = { name: '', description: '', owner: '' };

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
    marginLeft: theme.spacing(1)
  }
}));

export default function CreateEventButton({
  events,
  setEvents,
  eventCount,
  setEventCount
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function createEvent() {
    if (!formData.name && !formData.description) return;
    if (formData.endDateTime < formData.startDateTime) {
      // eslint-disable-next-line
      alert("Event's Ending Time can't comes before starting time");
      return;
    }
    const user = await Auth.currentAuthenticatedUser();
    formData.owner = user.username;
    console.log('createEventMutation');
    console.log(formData.name);
    console.log(formData.description);
    try {
      await API.graphql({
        query: createEventMutation,
        variables: {
          input: formData
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then(() => {
        setOpen(false);
        console.log('createEventMutation success');
        console.log('data form is: ', formData);
        const myEvents = [...events];
        const myEventCount = eventCount;
        setEvents([...myEvents, formData]);
        console.log('EventCreated');
        setEventCount(myEventCount + 1);
        console.log('yes');
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>Add Event</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className={classes.typology}>Create Events</DialogTitle>
        <DialogContent>
          <form className={classes.root}>
            <div>
              <TextField
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                value={formData.name}
                id="outlined-basic"
                label="Event Name"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                value={formData.description}
                id="outlined-multiline-static"
                label="Event Description"
                multiline
                rows={4}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                value={formData.startDateTime}
                id="datetime-local"
                label="Event's starting Date and Time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                value={formData.endDateTime}
                id="datetime-local"
                label="Event's ending Date and Time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createEvent} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
