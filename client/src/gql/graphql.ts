/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: number;
  DateFuture: number;
  DatePast: number;
  Float0To1: number;
  FloatNegative: number;
  FloatNonNegative: number;
  FloatNonPositive: number;
  FloatNonZero: number;
  FloatPositive: number;
  IntNegative: number;
  IntNonNegative: number;
  IntNonPositive: number;
  IntNonZero: number;
  IntPositive: number;
  StringNonEmpty: string;
};

export type Bill = {
  __typename?: 'Bill';
  branchId: Scalars['ID'];
  costTotal: Scalars['FloatNonNegative'];
  createdAt?: Maybe<Scalars['Date']>;
  customerEmail: Scalars['StringNonEmpty'];
  customerName: Scalars['StringNonEmpty'];
  customerPhone: Scalars['StringNonEmpty'];
  id: Scalars['ID'];
  items: Array<Item>;
  organizationId: Scalars['ID'];
  priceTotal: Scalars['FloatNonNegative'];
  profitLoss: Scalars['Float'];
  totalItems: Scalars['IntPositive'];
};

export type Branch = {
  __typename?: 'Branch';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  branchId?: Maybe<Scalars['ID']>;
  organizationId: Scalars['ID'];
  privilege?: Maybe<Privilege>;
};

export type Item = {
  __typename?: 'Item';
  branchId: Scalars['ID'];
  brandName: Scalars['StringNonEmpty'];
  companyName: Scalars['StringNonEmpty'];
  costPerUnit: Scalars['FloatNonNegative'];
  discount: Scalars['Float0To1'];
  expireAt?: Maybe<Scalars['DateFuture']>;
  id: Scalars['ID'];
  manufactureAt: Scalars['DatePast'];
  organizationId: Scalars['ID'];
  pricePerUnit: Scalars['FloatNonNegative'];
  quantity: Scalars['IntPositive'];
};

export type MetaData = {
  __typename?: 'MetaData';
  buildAt: Scalars['String'];
  platform: Scalars['String'];
  version: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem?: Maybe<Scalars['Boolean']>;
  createBill: Bill;
  createBranch: Branch;
  deleteItem?: Maybe<Scalars['Boolean']>;
  setupOrganization: SetupOrganizationResponse;
  updateItem?: Maybe<Scalars['Boolean']>;
};


export type MutationAddItemArgs = {
  branchId: Scalars['ID'];
  brandName: Scalars['StringNonEmpty'];
  companyName: Scalars['StringNonEmpty'];
  costPerUnit: Scalars['FloatNonNegative'];
  discount?: InputMaybe<Scalars['Float0To1']>;
  expireAt?: InputMaybe<Scalars['DateFuture']>;
  id: Scalars['ID'];
  manufactureAt: Scalars['DatePast'];
  organizationId: Scalars['ID'];
  pricePerUnit: Scalars['FloatNonNegative'];
  quantity: Scalars['IntPositive'];
};


export type MutationCreateBillArgs = {
  branchId: Scalars['ID'];
  customerEmail: Scalars['StringNonEmpty'];
  customerName: Scalars['StringNonEmpty'];
  customerPhone: Scalars['StringNonEmpty'];
  items: Array<ItemInput>;
  organizationId: Scalars['ID'];
};


export type MutationCreateBranchArgs = {
  name: Scalars['String'];
  organizationId: Scalars['ID'];
};


export type MutationDeleteItemArgs = {
  branchId: Scalars['ID'];
  id: Scalars['ID'];
  organizationId: Scalars['ID'];
};


export type MutationSetupOrganizationArgs = {
  name: Scalars['String'];
};


export type MutationUpdateItemArgs = {
  branchId: Scalars['ID'];
  brandName?: InputMaybe<Scalars['StringNonEmpty']>;
  companyName?: InputMaybe<Scalars['StringNonEmpty']>;
  costPerUnit?: InputMaybe<Scalars['FloatNonNegative']>;
  discount?: InputMaybe<Scalars['Float0To1']>;
  expireAt?: InputMaybe<Scalars['DateFuture']>;
  id: Scalars['ID'];
  manufactureAt?: InputMaybe<Scalars['DatePast']>;
  organizationId: Scalars['ID'];
  pricePerUnit?: InputMaybe<Scalars['FloatNonNegative']>;
  quantity?: InputMaybe<Scalars['IntPositive']>;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum Privilege {
  Admin = 'admin'
}

export type Query = {
  __typename?: 'Query';
  bill: Bill;
  bills: Array<Bill>;
  branch: Branch;
  branches: Array<Branch>;
  currentUser: CurrentUser;
  item: Item;
  items: Array<Item>;
  metadata: MetaData;
};


export type QueryBillArgs = {
  billId: Scalars['ID'];
  branchId: Scalars['ID'];
  organizationId: Scalars['ID'];
};


export type QueryBillsArgs = {
  branchId: Scalars['ID'];
  organizationId: Scalars['ID'];
};


export type QueryBranchArgs = {
  branchId: Scalars['ID'];
  organizationId: Scalars['ID'];
};


export type QueryBranchesArgs = {
  organizationId: Scalars['ID'];
};


export type QueryItemArgs = {
  branchId: Scalars['ID'];
  id: Scalars['ID'];
  organizationId: Scalars['ID'];
};


export type QueryItemsArgs = {
  branchId: Scalars['ID'];
  organizationId: Scalars['ID'];
};

export type SetupOrganizationResponse = {
  __typename?: 'SetupOrganizationResponse';
  organizationId: Scalars['ID'];
};

export type ItemInput = {
  itemId: Scalars['ID'];
  quantity: Scalars['IntPositive'];
};

export type GetItemQueryVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type GetItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', organizationId: string, branchId: string, id: string, brandName: string, companyName: string, quantity: number, costPerUnit: number, pricePerUnit: number, discount: number, manufactureAt: number, expireAt?: number | null } };

export type CreateBillMutationVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
  customerEmail: Scalars['StringNonEmpty'];
  customerPhone: Scalars['StringNonEmpty'];
  customerName: Scalars['StringNonEmpty'];
  items: Array<ItemInput> | ItemInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'Bill', id: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', organizationId: string } };

export type GetBranchesQueryVariables = Exact<{
  organizationId: Scalars['ID'];
}>;


export type GetBranchesQuery = { __typename?: 'Query', branches: Array<{ __typename?: 'Branch', id: string, name: string }> };

export type GetMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetaDataQuery = { __typename?: 'Query', metadata: { __typename?: 'MetaData', platform: string, buildAt: string, version: string } };

export type GetItemsQueryVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', organizationId: string, branchId: string, id: string, brandName: string, companyName: string, quantity: number, costPerUnit: number, pricePerUnit: number, discount: number, manufactureAt: number, expireAt?: number | null }> };

export type AddItemMutationVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
  addItemId: Scalars['ID'];
  brandName: Scalars['StringNonEmpty'];
  companyName: Scalars['StringNonEmpty'];
  quantity: Scalars['IntPositive'];
  costPerUnit: Scalars['FloatNonNegative'];
  pricePerUnit: Scalars['FloatNonNegative'];
  manufactureAt: Scalars['DatePast'];
  discount?: InputMaybe<Scalars['Float0To1']>;
  expireAt?: InputMaybe<Scalars['DateFuture']>;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem?: boolean | null };

export type UpdateItemMutationVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
  updateItemId: Scalars['ID'];
  brandName?: InputMaybe<Scalars['StringNonEmpty']>;
  companyName?: InputMaybe<Scalars['StringNonEmpty']>;
  quantity?: InputMaybe<Scalars['IntPositive']>;
  costPerUnit?: InputMaybe<Scalars['FloatNonNegative']>;
  pricePerUnit?: InputMaybe<Scalars['FloatNonNegative']>;
  discount?: InputMaybe<Scalars['Float0To1']>;
  manufactureAt?: InputMaybe<Scalars['DatePast']>;
  expireAt?: InputMaybe<Scalars['DateFuture']>;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: boolean | null };

export type DeleteItemMutationVariables = Exact<{
  organizationId: Scalars['ID'];
  branchId: Scalars['ID'];
  deleteItemId: Scalars['ID'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem?: boolean | null };

export type CreateBranchMutationVariables = Exact<{
  name: Scalars['String'];
  organizationId: Scalars['ID'];
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch: { __typename?: 'Branch', id: string, name: string } };

export type SetupOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type SetupOrganizationMutation = { __typename?: 'Mutation', setupOrganization: { __typename?: 'SetupOrganizationResponse', organizationId: string } };


export const GetItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brandName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"costPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"manufactureAt"}},{"kind":"Field","name":{"kind":"Name","value":"expireAt"}}]}}]}}]} as unknown as DocumentNode<GetItemQuery, GetItemQueryVariables>;
export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerPhone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"itemInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerPhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerName"}}},{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetBranchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBranches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetBranchesQuery, GetBranchesQueryVariables>;
export const GetMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"buildAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetMetaDataQuery, GetMetaDataQueryVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"branchId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"brandName"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"costPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"manufactureAt"}},{"kind":"Field","name":{"kind":"Name","value":"expireAt"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const AddItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntPositive"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"costPerUnit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FloatNonNegative"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pricePerUnit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FloatNonNegative"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manufactureAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DatePast"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float0To1"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expireAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateFuture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"brandName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandName"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"costPerUnit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"costPerUnit"}}},{"kind":"Argument","name":{"kind":"Name","value":"pricePerUnit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pricePerUnit"}}},{"kind":"Argument","name":{"kind":"Name","value":"manufactureAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manufactureAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"discount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discount"}}},{"kind":"Argument","name":{"kind":"Name","value":"expireAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expireAt"}}}]}]}}]} as unknown as DocumentNode<AddItemMutation, AddItemMutationVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brandName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StringNonEmpty"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntPositive"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"costPerUnit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FloatNonNegative"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pricePerUnit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FloatNonNegative"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discount"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float0To1"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manufactureAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DatePast"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expireAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateFuture"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"brandName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brandName"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"costPerUnit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"costPerUnit"}}},{"kind":"Argument","name":{"kind":"Name","value":"pricePerUnit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pricePerUnit"}}},{"kind":"Argument","name":{"kind":"Name","value":"discount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discount"}}},{"kind":"Argument","name":{"kind":"Name","value":"manufactureAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manufactureAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"expireAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expireAt"}}}]}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const DeleteItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"branchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteItemId"}}}]}]}}]} as unknown as DocumentNode<DeleteItemMutation, DeleteItemMutationVariables>;
export const CreateBranchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBranch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBranch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateBranchMutation, CreateBranchMutationVariables>;
export const SetupOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetupOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setupOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<SetupOrganizationMutation, SetupOrganizationMutationVariables>;