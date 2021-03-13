import React from 'react';
import {
  makeStyles,
  CircularProgress,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: '#f4f6f8',
    height: '100%',
    width: '100%'
  },
  a: {
    textDecoration: 'none'
  },
  root: {
    height: '100%',
    width: '100%'
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <CircularProgress />
      </Grid>
    </Page>
  );
};

export default Loading;
