/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const eventsByUser = /* GraphQL */ `
  query EventsByUser(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByUser(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listComponents = /* GraphQL */ `
  query ListComponents(
    $filter: ModelComponentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComponents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        text
        event_id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getComponent = /* GraphQL */ `
  query GetComponent($id: ID!) {
    getComponent(id: $id) {
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
export const componentsByEvent = /* GraphQL */ `
  query ComponentsByEvent(
    $event_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelComponentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    componentsByEvent(
      event_id: $event_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        text
        event_id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
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
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        component_id
        response
        sentiment_score
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const feedbackByComponent = /* GraphQL */ `
  query FeedbackByComponent(
    $component_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    feedbackByComponent(
      component_id: $component_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        component_id
        response
        sentiment_score
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
