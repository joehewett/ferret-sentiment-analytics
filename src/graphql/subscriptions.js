/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      description
      owner
      startDateTime
      endDateTime
      createdAt
      updatedAt
      components {
        items {
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
            startDateTime
            endDateTime
            createdAt
            updatedAt
          }
          owner
          feedbacks {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      description
      owner
      startDateTime
      endDateTime
      createdAt
      updatedAt
      components {
        items {
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
            startDateTime
            endDateTime
            createdAt
            updatedAt
          }
          owner
          feedbacks {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      description
      owner
      startDateTime
      endDateTime
      createdAt
      updatedAt
      components {
        items {
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
            startDateTime
            endDateTime
            createdAt
            updatedAt
          }
          owner
          feedbacks {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateComponent = /* GraphQL */ `
  subscription OnCreateComponent {
    onCreateComponent {
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
        startDateTime
        endDateTime
        createdAt
        updatedAt
        components {
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
      owner
      feedbacks {
        items {
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
        nextToken
      }
    }
  }
`;
export const onUpdateComponent = /* GraphQL */ `
  subscription OnUpdateComponent {
    onUpdateComponent {
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
        startDateTime
        endDateTime
        createdAt
        updatedAt
        components {
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
      owner
      feedbacks {
        items {
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
        nextToken
      }
    }
  }
`;
export const onDeleteComponent = /* GraphQL */ `
  subscription OnDeleteComponent {
    onDeleteComponent {
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
        startDateTime
        endDateTime
        createdAt
        updatedAt
        components {
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
      owner
      feedbacks {
        items {
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
        nextToken
      }
    }
  }
`;
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback {
    onCreateFeedback {
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
        event {
          id
          name
          description
          owner
          startDateTime
          endDateTime
          createdAt
          updatedAt
          components {
            nextToken
          }
        }
        owner
        feedbacks {
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
      owner
    }
  }
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback {
    onUpdateFeedback {
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
        event {
          id
          name
          description
          owner
          startDateTime
          endDateTime
          createdAt
          updatedAt
          components {
            nextToken
          }
        }
        owner
        feedbacks {
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
      owner
    }
  }
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback {
    onDeleteFeedback {
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
        event {
          id
          name
          description
          owner
          startDateTime
          endDateTime
          createdAt
          updatedAt
          components {
            nextToken
          }
        }
        owner
        feedbacks {
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
      owner
    }
  }
`;
