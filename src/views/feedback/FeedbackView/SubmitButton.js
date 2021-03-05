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
import { Predictions, API } from 'aws-amplify';
import { useTheme } from '@material-ui/core/styles';
import { createFeedback as createFeedbackMutation } from '../../../graphql/mutations';

export default function SubmitButton({ components, setComponents }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function interpretFromPredictions(input) {
    console.log('Interpeting from predictions', input);
    try {
      Predictions.interpret({
        text: {
          source: {
            text: input,
          },
          type: 'ALL'
        }
      }).then((result) => {
        console.log('got result');
        console.log(result);
        return JSON.stringify(result, null, 2);
      }).catch((err) => {
        console.log('caught error', err);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Called when feedback form is submitted
  async function handleSubmit() {
    handleClickOpen();
    let sentimentAnalysis;
    console.log('Submitting');
    console.log(components);
    const deepCopy = [...components];

    try {
      deepCopy.forEach((component) => {
        if (component.type === 'textbox') {
          sentimentAnalysis = interpretFromPredictions(component.response);
        } else {
          sentimentAnalysis = '';
        }

        API.graphql({
          query: createFeedbackMutation,
          variables: {
            input: {
              component_id: component.id,
              response: component.response,
              sentiment_score: sentimentAnalysis
            }
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }).then((status) => {
          console.log('Added feedback for component', status);
        });
      });
    } catch (error) {
      console.log(error);
    }
    deepCopy.forEach((component) => {
      component.response = '';
    });
    setComponents(deepCopy);
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
