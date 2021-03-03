import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { API } from 'aws-amplify';
import { grey } from '@material-ui/core/colors';
import { createEvent as createEventMutation } from '../../../graphql/mutations';
/* eslint react/prop-types: 0 */

const initialFormState = { name: '', description: '' };
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
    color: 'red',
  },
  button: {
    fontSize: '1rem',
    size: 'small',
    backgroundColor: grey[100],
  }
}));

export default function GetLinkButton({
  events,
  setEvents,
  eventCount,
  setEventCount,
  eventid,
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
      });
      setOpen(false);
      console.log('createEventMutation success');
      console.log('data form is: ', formData);
      setEvents([...events, formData]);
      console.log('EventCreated');
      setEventCount(eventCount + 1);
      console.log('yes');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        // style={{
        //   maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
        // }}
        className="button"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<LinkIcon />}
      >
        Get Link
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className={classes.typology} size="small">Get Event Link</DialogTitle>
        <DialogContent>
          <Grid
            size="small"
          >
            <p>
              /app/feedback/
              {eventid}
              <Button startIcon={<FileCopyIcon />} />
            </p>
          </Grid>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <LinkIcon />
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
