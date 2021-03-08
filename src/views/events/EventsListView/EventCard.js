import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
// import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
// import MoodBadIcon from '@material-ui/icons/MoodBad';
// import {
//   green,
//   orange,
//   lime,
//   red
// } from '@material-ui/core/colors';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import GetLinkButton from './getLink';

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
  }
}));

const EventCard = ({ className, event, ...rest }) => {
  const classes = useStyles();
  // const [ratingIcon, setIcon] = useState(0);
  // console.log(event.overallRating);
  // useEffect(() => {
  //   if (event.overallRating < 4) {
  //     setIcon(<MoodBadIcon className={classes.ratingIcon}
  //       fontSize="large" style={{ color: red[500] }} />);
  //   } else if (event.overallRating < 6 && event.overallRating > 3) {
  //     setIcon(<SentimentDissatisfiedIcon className={classes.ratingIcon}
  //       fontSize="large" style={{ color: orange[500] }} />);
  //   } else if (event.overallRating < 8 && event.overallRating > 5) {
  //     setIcon(<SentimentSatisfiedIcon className={classes.ratingIcon}
  //       fontSize="large" style={{ color: lime[700] }} />);
  //   } else if (event.overallRating > 7) {
  //     setIcon(<InsertEmoticonIcon className={classes.ratingIcon}
  //       fontSize="large" style={{ color: green[400] }} />);
  //   }
  // });
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Typography
            className={classes.eventTitle}
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {event.name}
          </Typography>
          <GetLinkButton
            eventid={event.id}
          />
        </Grid>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {event.description}
        </Typography>
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
            {/* {ratingIcon} */}
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Overall Score :
              {event.overallRating}
            </Typography>
          </Grid>
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
      </Box>
    </Card>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object.isRequired
};

export default EventCard;
