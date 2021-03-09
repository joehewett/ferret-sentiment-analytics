/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
} from '@material-ui/core';
import Component from './Component';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';

export default function FormComponents({
  fetchComponents,
  components,
  setComponents,
  loadedComponents,
  userIsOwner
}) {
  useEffect(() => {
    fetchComponents();
  }, []);

  if (!loadedComponents) return <h1>Loading</h1>;

  if (!components || components.length === 0) {
    return (
      <Card>
        <CardHeader
          subheader="This feedback form doesn't have any questions!"
          title="Feedback Form"
        />
      </Card>
    );
  }

  // eslint-disable-next-line no-constant-condition
  return (
    <Card>
      <CardHeader
        subheader="Please fill in the information below"
        title="Feedback Form"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          {components.map((component) => (
            <Grid
              key={component.id}
              item
              md={12}
              xs={12}
            >
              <Component
                key={component.id}
                component={component}
                components={components}
                setComponents={setComponents}
              />
              <ClearButton
                component={component}
                components={components}
                setComponents={setComponents}
                userIsOwner={userIsOwner}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <SubmitButton components={components} setComponents={setComponents} />
      </Box>
    </Card>
  );
}
