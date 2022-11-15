import { FieldValue } from "firebase-admin/firestore"
import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Item, Resolvers } from "../types"

export const resolvers: Resolvers = {
  Query: {
    item: async (parent, args, context, info) => {

      const itemRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .doc(args.id)
        .withConverter(DBT.converter<DBT.Item>())

      const item = await itemRef.get()
      const itemData = item.data()

      if(itemData == undefined) throw new GraphQLError('Item is been removed or Doesn\'t exists')

      const result: Item = {
        id: item.id,
        organizationId: itemData.organizationId,
        branchId: itemData.branchId,
        brandName: itemData.brandName,
        companyName: itemData.companyName,
        quantity: itemData.quantity,
        costPerUnit: itemData.costPerUnit,
        pricePerUnit: itemData.pricePerUnit,
        manufactureAt: itemData.manufactureAt,
        expireAt: itemData.expireAt,
        discount: itemData.discount || 0,
      }

      return result
    },
    items: async (parent, args, context, info) => {

      const itemsRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .withConverter(DBT.converter<DBT.Item>())

      const itemsSnapshot = await itemsRef.get()

      if(itemsSnapshot.empty) return []
      
      const branchesData: Item[] = itemsSnapshot.docs.map(doc => {
        const itemData: DBT.Item = doc.data()
        return {
          id: doc.id,
          ...itemData
        }
      })

      return branchesData
    },
  },
  Mutation: {
    addItem: async (parent, args, context, info) => {

      if(context.user === null) throw new GraphQLError('Please Login to Add New Items to Stock');
      
      const itemRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .doc(args.id)
        .withConverter(DBT.converter<DBT.Item>())

      await context.db.runTransaction(async transaction => {
        const item = await transaction.get(itemRef)
        const itemData = item.data()

        if(item.exists && itemData !== undefined)
          throw new GraphQLError("Item Already Exists in Stock!")
        if(context.user === null)
          throw new GraphQLError('Please Login to Add New Items to Stock')

        transaction.set(itemRef, {
          organizationId: args.organizationId,
          branchId: args.branchId,
          brandName: args.brandName,
          companyName: args.companyName,
          costPerUnit: args.costPerUnit,
          pricePerUnit: args.pricePerUnit,
          manufactureAt: args.manufactureAt,
          expireAt: args.expireAt || undefined,
          discount: args.discount || 0,
          quantity: args.quantity,
          createdAt: FieldValue.serverTimestamp(),
          createdBy: context.user.uid,
          updatedAt: FieldValue.serverTimestamp(),
          updatedBy: context.user.uid,
        })
      })

      return true
    },
    updateItem: async (parent, args, context, info) => {

      if(context.user === null) throw new GraphQLError('Please Login to Update Stock Items');

      const itemRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .doc(args.id)
        .withConverter(DBT.converter<DBT.Item>())

        await context.db.runTransaction(async transaction => {
          const item = await transaction.get(itemRef)

          if(!item.exists)
            throw new GraphQLError("Item Doesn't Exists in Stock!")
          if(context.user === null)
            throw new GraphQLError('Please Login to Update Stock Items')

          transaction.update(itemRef, {
            brandName: args.brandName || undefined,
            companyName: args.companyName || undefined,
            costPerUnit: args.costPerUnit || undefined,
            pricePerUnit: args.pricePerUnit || undefined,
            manufactureAt: args.manufactureAt || undefined,
            expireAt: args.expireAt || undefined,
            discount: args.discount || undefined,
            quantity: args.quantity || undefined,
            updatedAt: FieldValue.serverTimestamp(),
            updatedBy: context.user.uid,
          })
        })

      return true
    },
    deleteItem: async (parent, args, context, info) => {

      if(context.user === null) throw new GraphQLError('Please Login to Delete Stock Items');
      
      const itemRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .doc(args.id)
        .withConverter(DBT.converter<DBT.Item>())

      await itemRef.delete()

      return true
    }
  }
}