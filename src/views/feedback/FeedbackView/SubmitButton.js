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

  function addToDatabase(component, sentiment) {
    try {
      API.graphql({
        query: createFeedbackMutation,
        variables: {
          input: {
            component_id: component.id,
            response: component.response,
            sentiment_score: sentiment
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((status) => {
        console.log('Added feedback for component', status);
      });
    } catch (error) {
      console.log('Error while trying to get sentiment: ', error);
    }
  }

  // First analyse sentiment, then store feedback in database
  async function storeFeedback(component) {
    if (component.type === 'textbox') {
      await interpretFromPredictions(component.response, component.type)
        .then((result) => {
          addToDatabase(component, result);
        });
    } else {
      addToDatabase(component, '');
    }
  }

  // Called when feedback form is submitted
  function handleSubmit() {
    const deepCopy = [...components];
    let validForm = true;

    deepCopy.forEach((component) => {
      if (component.response === '') {
        validForm = false;
      }
    });

    // For each component, store the feedback in the database
    if (validForm) {
      handleClickOpen();
      try {
        deepCopy.forEach((component) => {
          storeFeedback(component);
        });
      } catch (error) {
        console.log(error);
      }

      // Reset the form to blank
      deepCopy.forEach((component) => {
        if (component.type === 'textbox') {
          component.response = '';
        }
      });
      setComponents(deepCopy);
    } else {
      // eslint-disable-next-line no-alert
      alert('Please answer every question in the form.');
    }
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
