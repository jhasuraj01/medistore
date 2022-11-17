import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Item, Organization, Resolvers } from "../types"
import { Privilege } from "../types.js";

const organizationName = new RegExp('^[a-zA-Z ]+$')

export const resolvers: Resolvers = {
  Query: {
    organization: async (parent, args, context, info) => {

      const organizationRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.id)
        .withConverter(DBT.converter<DBT.Organization>())

      const organization = await organizationRef.get()
      const organizationData = organization.data()

      if(organizationData == undefined) throw new GraphQLError('Organization is been removed or Doesn\'t exists')

      const result: Organization = {
        id: organization.id,
        name: organizationData.name,
      }

      return result
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
  }
}