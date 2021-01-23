// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Event, Feedback } = initSchema(schema);

export {
  Event,
  Feedback
};