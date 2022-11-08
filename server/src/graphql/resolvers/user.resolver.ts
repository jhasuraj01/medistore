import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Privilege, Resolvers } from "../types.js"

const organizationName = new RegExp('^[a-zA-Z ]+$')

export const resolvers: Resolvers = {
  Query: {
    currentUser: async (parent, args, context, info) => {

      if(context.user == null) throw new GraphQLError("Please Login to Continue!");

      const userRef = context.db
        .collection(DBT.Collections.users)
        .doc(context.user.uid)
        .withConverter(DBT.converter<DBT.User>())

      const user = await userRef.get()
      const userData = user.data()

      if(userData === undefined) throw new GraphQLError("User Doesn't Exists!");

      return {
        id: user.id,
        ...userData
      }
    },
  },
  Mutation: {
    setupOrganization: async (parent, args, context, info) => {

      if(!context.user) throw new GraphQLError('Please Login to Setup an Organization');

      if(!organizationName.test(args.name)) throw new GraphQLError("Organization Name is invalid");

      const userRef = context.db
        .collection(DBT.Collections.users)
        .withConverter(DBT.converter<DBT.User>())
        .doc(context.user.uid)
      const orgRef = context.db
        .collection(DBT.Collections.organizations)
        .withConverter(DBT.converter<DBT.Organization>())
        .doc()

      await context.db.runTransaction(async transaction => {
        const user = await transaction.get(userRef)
        const userData = user.data()

        if(user.exists && userData?.organizationId) {
          throw new GraphQLError("Organization Setup is Already Completed!");
        }
  
        transaction.create(orgRef, {
          name: args.name,
        })

        transaction.create(userRef, {
          organizationId: orgRef.id,
          privilege: Privilege.Admin
        })
      })

      return {
        organizationId: orgRef.id
      }
    }
  },
}