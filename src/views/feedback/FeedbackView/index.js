import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Profile from './Profile';
import FeedbackForm from './FeedbackForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Feedback = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Feedback"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={8}
            xs={12}
          >
            <FeedbackForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Feedback;
