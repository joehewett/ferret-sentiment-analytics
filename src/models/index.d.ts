import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Event {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly Feedbacks?: (Feedback | null)[];
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

export declare class Feedback {
  readonly id: string;
  readonly score?: number;
  readonly comment?: string;
  readonly eventID: string;
  constructor(init: ModelInit<Feedback>);
  static copyOf(source: Feedback, mutator: (draft: MutableModel<Feedback>) => MutableModel<Feedback> | void): Feedback;
}