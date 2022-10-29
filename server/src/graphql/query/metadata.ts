import metadata from '../../metadata.js';
import { Resolvers } from '../types.js';

export const typeDefs = `#graphql
  extend type Query {
    metadata: MetaData!
  }
  type MetaData {
    version: String!
    buildAt: String!
    platform: String!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    metadata: (parent, args, context, info) => {
      return metadata
    },
  }
};