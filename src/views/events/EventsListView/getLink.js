import React from 'react';
// npm install --save react-qr-code
import QRCode from 'react-qr-code';
// npm install --save use-clipboard-copy
import { useClipboard } from 'use-clipboard-copy';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
/* eslint react/prop-types: 0 */

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  descDesign: {
    background: 'white',
  },
  button: {
    fontSize: '1rem',
    size: 'small',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

export default function GetLinkButton({
  eventid,
}) {
  const clipboard = useClipboard();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const eventURL = `www.ferret.ml/app/feedback/${eventid}`;

  const handleCopyLink = () => {
    clipboard.copy(eventURL); // programmatically copying a value
  };

  return (
    <div>
      <Button
        // style={{
        //   maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
        // }}
        size="small"
        className={classes.button}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<LinkIcon />}
      >
        Get Link
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className={classes.typology} color="primary" size="large">Get Event Link</DialogTitle>
        <DialogContent>
          <Grid
            container
            size="small"
            display="inline"
          >
            <TextField
              style={{
                fontSize: '3px',
                width: '100%',
                height: '100%'
              }}
              size="small"
              variant="outlined"
              ref={clipboard.target}
              value={eventURL}
              readOnly
            />
          </Grid>
          <QRCode value={eventURL} />
          <br />
          <Button
            startIcon={<FileCopyIcon />}
            onClick={handleCopyLink}
            color="primary"
            size="small"
          >
            Copy Feedback Link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
