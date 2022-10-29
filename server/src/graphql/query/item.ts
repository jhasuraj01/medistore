import { Resolvers } from "../types";

export const typeDefs = `#graphql
  extend type Query {
    itemByID(id: String!): Item!
    itemByName(name: String!): [Item!]!
  }
  type Item {
    id: String!
    name: String!
    quantity: Int!
    costPerUnit: Float!
    pricePerUnit: Float!
    discount: Float!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    itemByID: async (parent, args, context, info) => {
      return {
        id: args.id,
        name: 'Lorem Ipsum',
        quantity: 50,
        costPerUnit: 85,
        pricePerUnit: 1000,
        discount: 0.1
      }
    },
    itemByName: async (parent, args, context, info) => {
      return [
        {
          id: "asjhhhb",
          name: args.name,
          quantity: 50,
          costPerUnit: 85,
          pricePerUnit: 1000,
          discount: 0.1
        }
      ]
    },
  }
};