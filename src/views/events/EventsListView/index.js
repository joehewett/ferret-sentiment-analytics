import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Card,
  CardHeader
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { eventsByUser } from '../../../graphql/queries';
import Toolbar from './Toolbar';
import EventCard from './EventCard';
// import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  eventCard: {
    height: '100%'
  }
}));

const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

const EventsList = () => {
  const classes = useStyles();
  // const [events] = useState(data);
  const [events, setEvents] = useState([]);
  const [eventCount, setEventCount] = useState(events.length);
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredPosts = filterPosts(events, searchQuery);

  async function fetchEvents() {
    let newEvents;
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql({
        query: eventsByUser,
        variables: {
          owner: user.username,
          limit: 100
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }).then((result) => {
        newEvents = result.data.eventsByUser.items;
        setEvents(newEvents);
      });
    } catch (error) {
      console.log(error);
    }
  }
  // On load, fetch all the events. This only happens when the component mo
  // unts because of the [] passed
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [eventCount]);

  if (filteredPosts.length === 0) {
    return (
      <Page
        className={classes.root}
        title="Events List"
      >
        <Container maxWidth={false}>
          <Card>
            <Toolbar
              events={events}
              setEvents={setEvents}
              eventCount={eventCount}
              setEventCount={setEventCount}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <CardHeader
              subheader="Click Add Event to create your first event."
              title="No Events Found!"
            />
          </Card>
        </Container>
      </Page>

    );
  }
  return (
    <Page
      className={classes.root}
      title="Events List"
    >
      <Container maxWidth={false}>
        <Toolbar
          events={events}
          setEvents={setEvents}
          eventCount={eventCount}
          setEventCount={setEventCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
            pagesize={4}
          >
            {filteredPosts.map((event) => (
              <Grid
                key={event.id}
                item
                lg={4}
                md={6}
                xs={12}
              >
                <EventCard
                  className={classes.eventCard}
                  event={event}
                  eventCount={eventCount}
                  setEventCount={setEventCount}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default EventsList;
