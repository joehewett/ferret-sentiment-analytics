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

  async function interpretFromPredictions(input, type = 'textbox') {
    let sentimentAnalysis = '';
    if (type !== 'textbox') return '';
    try {
      await Predictions.interpret({
        text: {
          source: {
            text: input,
          },
          type: 'ALL'
        }
      }).then((result) => {
        sentimentAnalysis = JSON.stringify(result, null, 2);
      }).catch((err) => {
        console.log('Error while parsing sentiment analysis: ', err);
      });
    } catch (err) {
      console.log('Error while getting sentiment analysis: ', err);
    }
    return sentimentAnalysis;
  }

  // First analyse sentiment, then store feedback in database
  async function storeFeedback(component) {
    const resp = component.response;
    console.log('comp resp 1 ', component.response);
    await interpretFromPredictions(component.response, component.type)
      .then((result) => {
        console.log('comp resp ', resp);
        API.graphql({
          query: createFeedbackMutation,
          variables: {
            input: {
              component_id: component.id,
              response: resp,
              sentiment_score: result
            }
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        }).then((status) => {
          console.log('Added feedback for component', status);
        });
      });
  }

  // Called when feedback form is submitted
  function handleSubmit() {
    handleClickOpen();
    const deepCopy = [...components];

    // For each component, store the feedback in the database
    try {
      deepCopy.forEach((component) => {
        storeFeedback(component);
      });
    } catch (error) {
      console.log(error);
    }

    // Reset the form to blank
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
