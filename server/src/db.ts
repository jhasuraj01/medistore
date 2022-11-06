import { Privilege } from "./graphql/types"

export enum Collections {
  users = "users",
  organizations = "organizations",
  branches = "branches",
  items = "items",
}

export interface Organization {
  name: string
}

export interface Branch {
  name: string
  organizationId: string
}

export interface Item {
  organizationId: string,
  branchId: string,
  brandName: string,
  company: string,
}

export interface User {
  organizationId: string
  branchId?: string
  privilege: Privilege
}

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T
})