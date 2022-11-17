import { FieldValue } from "firebase-admin/firestore"
import { GraphQLError } from "graphql"
import * as DBT from "../../db.js"
import { Bill, Resolvers } from "../types"

export const resolvers: Resolvers = {
  Query: {
    bill: async (parent, args, context, info) => {

      const billRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.bills)
        .doc(args.billId)
        .withConverter(DBT.converter<DBT.Bill>())

      const bill = await billRef.get()
      const billData = bill.data()

      if(billData == undefined) throw new GraphQLError('Bill is been removed or Doesn\'t exists')

      const result: Bill = {
        id: bill.id,
        organizationId: billData.organizationId,
        branchId: billData.branchId,
        customerEmail: billData.customerEmail,
        customerPhone: billData.customerPhone,
        customerName: billData.customerName,
        costTotal: billData.costTotal,
        priceTotal: billData.priceTotal,
        discountedPriceTotal: billData.discountedPriceTotal,
        profitLoss: billData.profitLoss,
        totalItems: billData.totalItems,
        createdAt: billData.createdAt,
        items: billData.items,
      }

      return result
    },
    bills: async (parent, args, context, info) => {

      const itemsRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.bills)
        .withConverter(DBT.converter<DBT.Bill>())

      const itemsSnapshot = await itemsRef.get()

      if(itemsSnapshot.empty) return []
      
      const billsData: Bill[] = itemsSnapshot.docs.map(doc => {
        const billData: DBT.Bill = doc.data()
        return {
          id: doc.id,
          ...billData
        }
      })

      return billsData
    },
  },
  Mutation: {
    createBill: async (parent, args, context, info) => {

      if(context.user === null) throw new GraphQLError('Please Login to Add New Items to Stock');
      if(args.items.length === 0) throw new GraphQLError('Can\'t Generate bill for empty cart');

      const billRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.bills)
        .withConverter(DBT.converter<DBT.Bill>())
        .doc()
  
      const itemsRef = context.db
        .collection(DBT.Collections.organizations)
        .doc(args.organizationId)
        .collection(DBT.Collections.branches)
        .doc(args.branchId)
        .collection(DBT.Collections.items)
        .withConverter(DBT.converter<DBT.Item>())

      const bill = await context.db.runTransaction(async transaction => {
        if(context.user === null)
          throw new GraphQLError('Please Login to Add New Items to Stock')

        const bill: DBT.Bill = {
          organizationId: args.organizationId,
          branchId: args.branchId,
          customerEmail: args.customerEmail,
          customerPhone: args.customerPhone,
          customerName: args.customerName,
          costTotal: 0,
          priceTotal: 0,
          discountedPriceTotal: 0,
          profitLoss: 0,
          totalItems: 0,
          createdAt: new Date(),
          createdBy: context.user.uid,
          items: [],
        }

        for (let i = 0; i < args.items.length; i++) {
          const { itemId, quantity } = args.items[i]
          const itemRef = itemsRef.doc(itemId)
          const item = await itemRef.get()
          const itemData = item.data()

          if(itemData === undefined)
            throw new Error(`Invalid Item ID: ${itemId}`)

          if(itemData.quantity < quantity)
            throw new Error(`Item Out of Stock: ${itemId}! Max Available: ${itemData.quantity}`)

          bill.costTotal += itemData.costPerUnit * quantity
          bill.priceTotal += itemData.pricePerUnit * quantity
          bill.discountedPriceTotal += itemData.pricePerUnit * quantity * (1 - itemData.discount)
          bill.totalItems += quantity
          bill.items.push({
            ...itemData,
            id: item.id,
            quantity,
          })

          transaction.update(itemRef, {
            quantity: itemData.quantity - quantity
          })

        }

        bill.profitLoss += bill.priceTotal - bill.costTotal
        transaction.set(billRef, bill)

        return bill
      })

      return {
        organizationId: bill.organizationId,
        branchId: bill.organizationId,
        id: billRef.id,
        customerEmail: bill.customerEmail,
        customerPhone: bill.customerPhone,
        customerName: bill.customerName,
        costTotal: bill.costTotal,
        priceTotal: bill.priceTotal,
        discountedPriceTotal: bill.discountedPriceTotal,
        profitLoss: bill.profitLoss,
        totalItems: bill.totalItems,
        items: bill.items,
        createdAt: bill.createdAt
      }
    },
  }
}