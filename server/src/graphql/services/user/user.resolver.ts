import { GraphQLError } from 'graphql';
import { Collections, converter, Organization, Privilege, User } from '../../../db.js';
import { SetupOrganizationResponse, Resolvers, ResponseCode } from '../../types.js';

const organizationName = new RegExp('^[a-zA-Z ]+$')

export const resolvers: Resolvers = {
  Query: {
    currentUser: async (parent, args, context, info) => {

      if(context.user == null) throw new GraphQLError("Please Login to Continue!");

      const userRef = context.db
        .collection('users')
        .withConverter(converter<User>())
        .doc(context.user.uid)

      const user = await userRef.get()

      if(!user.exists) throw new GraphQLError("User Doesn't Exists!");
      
      const userData = user.data()
      if(userData === undefined) throw new GraphQLError("Failed to Fetch Current User!");

      return {
        organizationId: userData.organizationId
      }
    },
  },
  Mutation: {
    setupOrganization: async (parent, args, context, info) => {

      if(!context.user) throw new GraphQLError('Please Login to Setup an Organization');

      if(!organizationName.test(args.name)) throw new GraphQLError("Organization Name is invalid");

      const userRef = context.db
        .collection(Collections.users)
        .withConverter(converter<User>())
        .doc(context.user.uid)
      const orgRef = context.db
        .collection(Collections.organizations)
        .withConverter(converter<Organization>())
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
          privilege: Privilege.admin
        })
      })

      return {
        organizationId: orgRef.id
      }
    }
  },
};