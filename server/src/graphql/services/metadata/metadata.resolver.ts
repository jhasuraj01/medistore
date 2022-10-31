import metadata from '../../../metadata.js';
import { Resolvers } from '../../types';

export const resolvers: Resolvers = {
  Query: {
    metadata: (parent, args, context, info) => {
      return metadata;
    },
  }
};