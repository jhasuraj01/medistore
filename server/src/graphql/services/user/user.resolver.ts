import { SetupOrganizationResponse, Resolvers, ResponseCode } from '../../types.js';

const organizationName = new RegExp('^[a-zA-Z ]+$')

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
        organizationId: userData.organizationId
      }
    },
  },
  Mutation: {
    setupOrganization: async (parent, args, context, info) => {
    
      let response: SetupOrganizationResponse = {
        ok: false,
        code: ResponseCode.Unauthenticated
      }

      if(!context.user) return {
        ok: false,
        code: ResponseCode.Unauthenticated
      }
  
      if(!organizationName.test(args.name)) return {
        ok: false,
        code: ResponseCode.Invalidinput
      }

      const userRef = context.db.collection('users').doc(context.user.uid)
      const orgRef = context.db.collection('organizations').doc()

      try {
        const result = await context.db.runTransaction(async transaction => {
          const user = await transaction.get(userRef)
          const userData = user.data()
  
          if(user.exists && userData?.organizationId) {
            throw new Error("User Account is Already Set!");
          }
  
          transaction.create(orgRef, {
            name: args.name
          })
  
          transaction.create(userRef, {
            organizationId: orgRef.id,
            privilege: 'admin'
          })
  
        })

        response.ok = true
        response.code = ResponseCode.Ok
        response.organizationId = orgRef.id

        return response

      } catch (error) {
        console.error(error)
      }

      response.ok = false
      response.code = ResponseCode.Unknownerror
      return response
    }
  },
};