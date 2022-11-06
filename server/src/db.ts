export enum Collections {
  users = "users",
  organizations = "organizations",
  branches = "branches",
  items = "items",
}

export enum Privilege {
  admin = "admin",
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
  privilege: Privilege
}

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T
})