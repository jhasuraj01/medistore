import { Resolvers } from '../../types.js';

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return {
        uid: context.user?.uid,
        email: context.user?.email,
        emailVerified: context.user?.email_verified,
        phoneNumber: context.user?.phone_number,
        photoURL: context.user?.picture,
      }
    },
  }
};