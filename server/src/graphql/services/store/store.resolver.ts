import { Resolvers } from "../../types"

export const resolvers: Resolvers = {
  Branch: {
    store: async (parent, args, context, info) => {
      return {
        items: [{
          id: "akjb",
          name: 'Lorem Ipsum - present in store: ' + parent.id,
          quantity: 50,
          costPerUnit: 85,
          pricePerUnit: 1000,
          discount: 0.1
        }]
      }
    }
  }
}