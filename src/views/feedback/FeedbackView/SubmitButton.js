/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SendIcon from '@material-ui/icons/Send';
import { useTheme } from '@material-ui/core/styles';

export default function SubmitButton({ components }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Called when feedback form is submitted
  async function handleSubmit() {
    handleClickOpen();
    console.log('Submitting');
    console.log(components);
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
    //   component.response = '';f
    // });
    // // TODO - actually store this form data in the database
    // setComponents(deepCopy);
  }
  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleSubmit}
        startIcon={<SendIcon />}
      >
        Submit Form
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Thank you for submitting your feedback!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your feedback helps organisers to improve this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
