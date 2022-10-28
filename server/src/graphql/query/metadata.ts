import metadata from '../../metadata.js';

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

export const resolvers = {
  Query: {
    metadata: () => metadata,
  }
};