export const typeDefs = `#graphql
  extend type Query {
    item(id: String!): Item!
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

export const resolvers = {
  Query: {
    item: async (parent, args, context, info) => {
      return {
        id: args.id,
        name: 'Lorem Ipsum',
        quantity: 50,
        costPerUnit: 85,
        pricePerUnit: 100,
        discount: 0.1
      }
    },
  }
};