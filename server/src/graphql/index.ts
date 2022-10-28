import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {  typeDefs as MetaData,  resolvers as metadataResolvers } from './query/metadata.js';
import {  typeDefs as Item,  resolvers as itemResolvers } from './query/item.js';

export const typeDefs = `#graphql
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [ typeDefs, MetaData, Item],
  resolvers: merge(metadataResolvers, itemResolvers),
});