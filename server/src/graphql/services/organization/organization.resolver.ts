import { Resolvers } from "../../types"

const orgs = [
  {
    id: 'org1',
    name: 'Sun Pharma',
    shops: [ "shop1", "shop2"]
  },
  {
    id: 'org2',
    name: 'Reliance Drugs',
    shops: [ "red1"]
  }
]

const shops = [
  {
    id: "shop1",
    name: "Sun Pharma Shop 1",
    organization: "org1",
  },
  {
    id: "shop2",
    name: "Sun Pharma Shop 2",
    organization: "org1"
  },
  {
    id: "red1",
    name: "Reliance Drugs Shop 1",
    organization: "org2"
  }
]

export const resolvers: Resolvers = {
  Query: {
    organization: async (parent, args, context, info) => {
      return orgs
        .filter(org => org.id === args.id)
        .map(org => ({ id: org.id, name: org.name }))
        [0]
    },
    organizations: async (parent, args, context, info) => {
      return orgs
        .map(org => ({ id: org.id, name: org.name }))
    },
    shop: async (parent, args, context, info) => {
      return shops
        .filter(shop => shop.id === args.id)
        .map(shop => ({ id: shop.id, name: shop.name }))
        [0]
    },
    shops: async (parent, args, context, info) => {
      return shops
        .map(shop => ({ id: shop.id, name: shop.name }))
    },
  },
  Organization: {
    shops: async (parent, args, context, info) => {
      return shops
        .filter(shop => shop.organization === parent.id)
        .map(shop => ({ id: shop.id, name: shop.name }))
    }
  },
  Shop: {
    organization: async (parent, args, context, info) => {
      return orgs
        .filter(org => org.shops.includes(parent.id))
        .map(org => ({ id: org.id, name: org.name }))[0]
    }
  }
}