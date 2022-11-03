import { Resolvers } from '../../types.js';

export const resolvers: Resolvers = {
  Query: {
    currentUser: async (parent, args, context, info) => {

      if(context.user == null) return null

      const userRef = context.db.collection('users').doc(context.user.uid)
      const user = await userRef.get()

      if(!user.exists) return null

      const userData = user.data()

      if(userData === undefined) return null

      return {
        organizationId: userData.organization
      }
    },
  }
};