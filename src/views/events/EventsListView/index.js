import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import EventCard from './EventCard';
import data from './data';

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

const EventsList = () => {
  const classes = useStyles();
  const [events] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Events List"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {events.map((event) => (
              <Grid
                item
                key={event.id}
                lg={4}
                md={6}
                xs={12}
              >
                <EventCard
                  className={classes.eventCard}
                  event={event}
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
