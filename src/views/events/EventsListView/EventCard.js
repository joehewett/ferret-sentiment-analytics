/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import { feedbackByComponent, componentsByEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExportButton from './ExportButton';
import GetLinkButton from './getLink';
import DeleteEventButton from './deleteButton';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  ratingIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  eventTitle: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  eventDescription: {
    marginLeft: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    marginTop: theme.spacing(1)
  }
}));

const EventCard = ({
  className, event, eventCount, setEventCount, ...rest
}) => {
  const classes = useStyles();

  const [componentIdList, setComponentIdList] = useState([]);
  const [feedbackIdList, setFeedbackIdList] = useState([]);
  const [averageFeedback, setAverageFeedback] = useState(0);
  const [progress, setProgress] = useState(0);

  async function getFeedbackByComponent(componentid) {
    try {
      await API.graphql({
        query: feedbackByComponent,
        variables: { component_id: componentid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        // console.log(result);
        setFeedbackIdList(result.data.feedbackByComponent.items);
        // console.log('setfeedbackidlist to result from query');
      });
    } catch (error) {
      console.log(error);
    }
  }

  function calculateProgress() {
    const start = Date.parse(event.startDateTime); // this will be event's start time/date
    const end = Date.parse(event.endDateTime); // this will be event's end time/date
    const today = new Date();
    const timeBetweenStartAndEnd = (end - start);
    const timeBetweenStartAndToday = (today - start);

    let p = Math.round((timeBetweenStartAndToday / timeBetweenStartAndEnd) * 100);
    if (p > 100) {
      p = 100;
    }
    if (p < 0) {
      p = 0;
    }
    setProgress(p);
  }

  async function getComponentsByEvent(eventid) {
    try {
      await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const componentIds = result.data.componentsByEvent.items;
        setComponentIdList(componentIds);
        console.log(componentIdList);
        // console.log('setcomponentid to result from query');
        if (componentIds.length !== 0) {
          getFeedbackByComponent(componentIds[0].id);
          // console.log(componentIds[0].id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComponentsByEvent(event.id);
  }, []);

  useEffect(() => {
    console.log(feedbackIdList.length);
    if (feedbackIdList.length !== 0) {
      // console.log('feedbackidlist', feedbackIdList);
      let count = 0;
      let total = 0;
      feedbackIdList.forEach((feedback) => {
        count += 1;
        // console.log('feedbacks', feedback);
        const sentimentInput = JSON.parse(
          feedback.sentiment_score
        );
        // console.log('sentiment', sentimentInput);
        const sentimentScore = sentimentInput.textInterpretation.sentiment.predominant;
        if (sentimentScore === 'POSITIVE') {
          total += 5;
        } else if (sentimentScore === 'NEUTRAL') {
          total += 2.5;
        }
      });
      setAverageFeedback((total / count).toFixed(2));
    }
  }, [feedbackIdList]);

  useEffect(() => {
    calculateProgress();
  }, []);

  const count = feedbackIdList.length;
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <Typography
              className={classes.eventTitle}
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {event.name}
            </Typography>
            <Typography
              className={classes.eventDescription}
              align="center"
              color="textPrimary"
              variant="body1"
            >
              {event.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={0}
            >
              <GetLinkButton
                eventid={event.id}
              />
              <ExportButton event={event} />
              <DeleteEventButton
                eventid={event.id}
                eventCount={eventCount}
                setEventCount={setEventCount}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              className={classes.button}
              href={`/app/dashboard/${event.id}`}
              variant="contained"
              size="medium"
              color="secondary"
            >
              View DashBoard
            </Button>
            <Button
              href={`/app/feedback/${event.id}`}
              variant="contained"
              size="medium"
              color="secondary"
            >
              View Form
            </Button>
          </Grid>
        </Grid>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Progress</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box flexGrow={1}>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="stretch"
              >
                <Grid item className={classes.statsItem}>
                  <Typography
                    color="textSecondary"
                    display="inline"
                    variant="body2"
                  >
                    Progress:
                    {progress}
                    %
                  </Typography>
                </Grid>
                <Grid item className={classes.statsItem}>
                  <Typography
                    color="textSecondary"
                    display="inline"
                    variant="body2"
                  >
                    Event starts
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <strong> {moment(event.startDateTime).fromNow()} </strong>
                  </Typography>
                  <Typography
                    color="textSecondary"
                    display="inline"
                    variant="body2"
                  >
                    and ends
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <strong> {moment(event.endDateTime).fromNow()}</strong>
                  </Typography>
                </Grid>
              </Grid>
              <LinearProgress
                value={progress}
                variant="determinate"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Feedback</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid
                className={classes.statsItem}
                item
              >
                {/* {ratingIcon} */}
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Overall Score :
                  {averageFeedback}
                </Typography>
              </Grid>
              <Grid
                className={classes.statsItem}
                item
              >
                {/* {ratingIcon} */}
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Number of Feedback :
                  {count}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default EventCard;
