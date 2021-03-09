/* eslint-disable react/prop-types */
import React from 'react';
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Grid,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  input: {
    width: '80%',
    marginRight: theme.spacing(3)
  },
  deleteButton: {
    color: '#e0392d'
  }
}));

export default function Component({
  component,
  components,
  setComponents,
}) {
  const classes = useStyles();

  const handleInputChange = (e) => {
    console.log('Making a component with id: ', component.id);
    // Create an onChange handler that updates the feedback state with with this
    // inputs information
    const deepCopy = [...components];
    const i = deepCopy
      .map((x) => {
        return x.id;
      })
      .indexOf(component.id);
    console.log('Component: ', i);
    let componentValue;
    if (component.type === 'textbox') {
      componentValue = e.target.value;
    } else if (component.type === 'boolean') {
      componentValue = e.target.checked;
    } else if (component.type === 'scale') {
      componentValue = e.target.innerText;
    }
    deepCopy[i].response = componentValue;
    setComponents(deepCopy);
  };

  if (component.type === 'textbox') {
    return (
      <>
        <Typography>{component.text}</Typography>
        <TextField
          className={classes.input}
          multiline
          required
          onChange={(e) => handleInputChange(e)}
          variant="outlined"
          value={component.response || ''}
        />
      </>
    );
  }

  if (component.type === 'boolean') {
    return (
      <FormControlLabel
        value={component.response}
        onChange={(e) => handleInputChange(e)}
        control={<Checkbox color="primary" />}
        label={component.text}
        labelPlacement="end"
      />
    );
  }

  if (component.type === 'scale') {
    return (
      <Grid item xs={10} sm={9}>
        <Typography>{component.text}</Typography>
        <Slider
          onChange={(e) => handleInputChange(e)}
          defaultValue={5}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Grid>
    );
  }
}
