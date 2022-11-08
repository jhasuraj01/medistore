import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Branch, Resolvers } from "../types"

export const resolvers: Resolvers = {
  Query: {
    branch: async (parent, args, context, info) => {

      const branchRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .withConverter(DBT.converter<DBT.Branch>())

      const branch = await branchRef.get()
      const branchData = branch.data()

      if(branchData == undefined) return new GraphQLError('Branch is been removed or Doesn\'t exists')

      return {
        id: branch.id,
        name: String(branchData.name)
      }
    },
    branches: async (parent, args, context, info) => {

      const branchesRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .withConverter(DBT.converter<DBT.Branch>())

      const branchesSnapshot = await branchesRef.get()

      if(branchesSnapshot.empty) return []
      
      const branchesData: Branch[] = branchesSnapshot.docs.map(doc => {
        const branchData: DBT.Branch = doc.data()
        return {
          id: doc.id,
          name: branchData.name
        }
      })

      return branchesData
    },
  },
}