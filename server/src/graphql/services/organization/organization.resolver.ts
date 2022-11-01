import { Branch, Organization, Resolvers } from "../../types"

export const resolvers: Resolvers = {
  Query: {
    organization: async (parent, args, context, info) => {
      const orgRef = context.db.collection('organizations').doc(args.id);
      const org = await orgRef.get()

      if(!org.exists) return null

      const orgData = org.data()

      if(orgData === undefined) return null

      return {
        id: orgRef.id,
        name: String(orgData.name)
      }

    },
    organizations: async (parent, args, context, info) => {
        const snapshot = await context.db.collection('/organizations').get();
        const result: Partial<Organization>[] = []

        snapshot.forEach(doc => {
          const data = doc.data()
          result.push({
            id: doc.id,
            name: String(data.name),
          })
        })

        return result
    },
    branch: async (parent, args, context, info) => {

      const branchRef = context.db
        .collection('organizations')
        .doc(args.organizationID)
        .collection('branches')
        .doc(args.branchID)

      const branch = await branchRef.get()

      if(!branch.exists) return null

      const branchData = branch.data()

      if(branchData === undefined) return null

      return {
        id: branch.id,
        name: String(branchData.name)
      }
    },
  },
  Organization: {
    branches: async (parent, args, context, info) => {

      console.log("All Branches: " + parent.id)

      const snapshot = await context.db
        .collection('organizations')
        .doc(parent.id)
        .collection('branches')
        .get()

      const result: Partial<Branch>[] = []

      snapshot.forEach(doc => {
        const data = doc.data()
        result.push({
          id: doc.id,
          name: String(data.name),
        })
      })

      return result
    }
  },
}