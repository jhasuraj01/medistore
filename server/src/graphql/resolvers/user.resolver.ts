import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Resolvers } from "../types.js"

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

      if(userData === undefined) throw new GraphQLError("Please Setup Your Organization to Continue");

      return {
        id: user.id,
        ...userData
      }
    },
  }
}