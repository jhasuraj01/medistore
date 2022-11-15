import { DecodedIdToken } from "firebase-admin/auth"
import { Privilege } from "./graphql/types"

export enum Collections {
  users = "users",
  organizations = "organizations",
  branches = "branches",
  items = "items",
  bills = "bills",
}

export interface Organization {
  name: string
}

export interface Branch {
  organizationId: string
  name: string
  createdAt: Date
  createdBy: DecodedIdToken["uid"]
}

export interface Item {
  organizationId: string
  branchId: string
  brandName: string
  companyName: string
  costPerUnit: number
  pricePerUnit: number
  discount: number
  quantity: number
  manufactureAt: Date
  expireAt?: Date
  createdAt: Date
  createdBy: DecodedIdToken["uid"]
  updatedAt: Date
  updatedBy: DecodedIdToken["uid"]
}

export interface Bill {
  organizationId: string
  branchId: string
  customerEmail: string
  customerPhone: string
  customerName: string
  costTotal: number
  priceTotal: number
  discountedPriceTotal: number
  profitLoss: number
  totalItems: number
  items: (Item & {id: string})[]
  createdAt: Date
  createdBy: DecodedIdToken["uid"]
}

export interface User {
  organizationId: string
  branchId?: string
  privilege: Privilege
}

/**
 * Transcode Firebase document to TypeScript
 * @todo Handle Case for Document Reference Type 
 * @throws TypeError: Cannot read property 'constructor' of undefined
 */
const transcode = (data: FirebaseFirestore.DocumentData) => {
  const initialObject: Record<string, any> = {}
  return Object.keys(data).reduce((result, key) => {
    if (data[key].constructor.name === "Timestamp") {
      result[key] = data[key].toDate();
    } else if (Array.isArray(data[key])) {
      result[key] = data[key].map(transcode);
    } else if (typeof data[key] === "object") {
      result[key] = transcode(data[key]);
    } else {
      result[key] = data[key];
    }
    return result
  }, initialObject);
};

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = transcode(snap.data())
    return data as T
  }
})