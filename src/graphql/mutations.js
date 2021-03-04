/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      components {
        nextToken
      }
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      components {
        nextToken
      }
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      name
      description
      owner
      createdAt
      updatedAt
      components {
        nextToken
      }
    }
  }
`;
export const createComponent = /* GraphQL */ `
  mutation CreateComponent(
    $input: CreateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    createComponent(input: $input, condition: $condition) {
      id
      type
      text
      event_id
      createdAt
      updatedAt
      event {
        id
        name
        description
        owner
        createdAt
        updatedAt
      }
      owner
      feedbacks {
        nextToken
      }
    }
  }
`;
export const updateComponent = /* GraphQL */ `
  mutation UpdateComponent(
    $input: UpdateComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    updateComponent(input: $input, condition: $condition) {
      id
      type
      text
      event_id
      createdAt
      updatedAt
      event {
        id
        name
        description
        owner
        createdAt
        updatedAt
      }
      owner
      feedbacks {
        nextToken
      }
    }
  }
`;
export const deleteComponent = /* GraphQL */ `
  mutation DeleteComponent(
    $input: DeleteComponentInput!
    $condition: ModelComponentConditionInput
  ) {
    deleteComponent(input: $input, condition: $condition) {
      id
      type
      text
      event_id
      createdAt
      updatedAt
      event {
        id
        name
        description
        owner
        createdAt
        updatedAt
      }
      owner
      feedbacks {
        nextToken
      }
    }
  }
`;
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
      id
      component_id
      response
      sentiment_score
      createdAt
      updatedAt
      component {
        id
        type
        text
        event_id
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
      id
      component_id
      response
      sentiment_score
      createdAt
      updatedAt
      component {
        id
        type
        text
        event_id
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
      id
      component_id
      response
      sentiment_score
      createdAt
      updatedAt
      component {
        id
        type
        text
        event_id
        createdAt
        updatedAt
        owner
      }
      owner
    }
  }
`;
