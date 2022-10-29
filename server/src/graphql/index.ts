import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {  typeDefs as MetaData,  resolvers as metadataResolvers } from './query/metadata.js';
import {  typeDefs as Item,  resolvers as itemResolvers } from './query/item.js';
import {  typeDefs as User,  resolvers as userResolvers } from './query/user.js';

export const typeDefs = `#graphql
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [ typeDefs, MetaData, Item, User],
  resolvers: merge(metadataResolvers, itemResolvers, userResolvers),
});