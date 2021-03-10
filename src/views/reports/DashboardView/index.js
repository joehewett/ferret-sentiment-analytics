import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { componentsByEvent } from 'src/graphql/queries';
// import { feedbackByComponent, componentsByEvent } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import Page from 'src/components/Page';
import AverageScore from './AverageScore';
import LatestFeedbacks from './LatestFeedbacks';
import LatestProducts from './LatestProducts';
// import SentimentOvertime from './SentimentOvertime';
import EventProgress from './EventProgress';
import TotalFeedback from './TotalFeedback';
import EventQRCode from './EventQRCode';
import FeedbackRatio from './FeedbackRatio';
import FeedbackSummary from '../AggregateFeedback/FeedbackSummary';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  console.log(id);

  // const [dataForTable, setDataForTable] = useState([]);
  async function getComponentsByEvent(eventid) {
    try {
      await API.graphql({
        query: componentsByEvent,
        variables: { event_id: eventid },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        const componentList = result.data.componentsByEvent.items;
        setComponents(componentList);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComponentsByEvent(id);
  }, []);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageScore components={components} id={id} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalFeedback id={id} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <EventProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <EventQRCode id={id} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            Hello
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <FeedbackRatio />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestFeedbacks id={id} />
          </Grid>
          <Grid
            item
            lg={12}
            xs={12}
          >
            <FeedbackSummary components={components} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
