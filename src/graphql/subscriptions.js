/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($owner: String) {
    onCreateEvent(owner: $owner) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($owner: String) {
    onUpdateEvent(owner: $owner) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($owner: String) {
    onDeleteEvent(owner: $owner) {
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
export const onCreateComponent = /* GraphQL */ `
  subscription OnCreateComponent($owner: String) {
    onCreateComponent(owner: $owner) {
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
export const onUpdateComponent = /* GraphQL */ `
  subscription OnUpdateComponent($owner: String) {
    onUpdateComponent(owner: $owner) {
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
export const onDeleteComponent = /* GraphQL */ `
  subscription OnDeleteComponent($owner: String) {
    onDeleteComponent(owner: $owner) {
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
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($owner: String) {
    onCreateFeedback(owner: $owner) {
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
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($owner: String) {
    onUpdateFeedback(owner: $owner) {
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
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($owner: String) {
    onDeleteFeedback(owner: $owner) {
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
