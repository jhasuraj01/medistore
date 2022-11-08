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
  branch: Branch;
  branches: Array<Branch>;
  currentUser: CurrentUser;
  item?: Maybe<Item>;
  items: Array<Item>;
  metadata: MetaData;
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
  itemId: Scalars['ID'];
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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', organizationId: string } };

export type GetBranchesQueryVariables = Exact<{
  organizationId: Scalars['ID'];
}>;


export type GetBranchesQuery = { __typename?: 'Query', branches: Array<{ __typename?: 'Branch', id: string, name: string }> };

export type GetMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetaDataQuery = { __typename?: 'Query', metadata: { __typename?: 'MetaData', platform: string, buildAt: string, version: string } };

export type SetupOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type SetupOrganizationMutation = { __typename?: 'Mutation', setupOrganization: { __typename?: 'SetupOrganizationResponse', organizationId: string } };


export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetBranchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBranches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetBranchesQuery, GetBranchesQueryVariables>;
export const GetMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"buildAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetMetaDataQuery, GetMetaDataQueryVariables>;
export const SetupOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetupOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setupOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<SetupOrganizationMutation, SetupOrganizationMutationVariables>;