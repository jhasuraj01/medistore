import { Item, Resolvers } from "../../types";

export const resolvers: Resolvers = {
  Query: {
    items: async (parent, args, context, info) => {
      const snapshot = await context.db
        .collection('organizations')
        .doc(args.organizationId)
        .collection('branches')
        .doc(args.branchId)
        .collection('items')
        .get()

      const result: Partial<Item>[] = []

      snapshot.forEach(doc => {
        const data = doc.data()
        result.push({
          id: doc.id,
          name: String(data.name),
        })
      })

      return result
    },
    item: async (parent, args, context, info) => {
      
      const itemRef = context.db
        .collection('organizations')
        .doc(args.organizationId)
        .collection('branches')
        .doc(args.branchId)
        .collection('items')
        .doc(args.itemId)

      const item = await itemRef.get()

      if(!item.exists) return null

      const itemData = item.data()

      if(itemData === undefined) return null

      return {
        id: item.id,
        name: String(itemData.name)
      }
    }
  }
};