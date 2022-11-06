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
};

export type Branch = {
  __typename?: 'Branch';
  id: Scalars['ID'];
  name: Scalars['String'];
  store?: Maybe<Store>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  organizationId: Scalars['ID'];
};

export type Item = {
  __typename?: 'Item';
  costPerUnit: Scalars['Float'];
  discount: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
  pricePerUnit: Scalars['Float'];
  quantity: Scalars['Int'];
};

export type MetaData = {
  __typename?: 'MetaData';
  buildAt: Scalars['String'];
  platform: Scalars['String'];
  version: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  setupOrganization: SetupOrganizationResponse;
};


export type MutationSetupOrganizationArgs = {
  name: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  branches: Array<Branch>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  branch?: Maybe<Branch>;
  currentUser: CurrentUser;
  item?: Maybe<Item>;
  items: Array<Item>;
  metadata: MetaData;
  organization?: Maybe<Organization>;
  organizations: Array<Organization>;
};


export type QueryBranchArgs = {
  branchID: Scalars['ID'];
  organizationID: Scalars['ID'];
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


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};

export enum ResponseCode {
  Alreadyexists = 'ALREADYEXISTS',
  Invalidinput = 'INVALIDINPUT',
  Notfound = 'NOTFOUND',
  Ok = 'OK',
  Unauthenticated = 'UNAUTHENTICATED',
  Unauthorized = 'UNAUTHORIZED',
  Unknownerror = 'UNKNOWNERROR'
}

export type SetupOrganizationResponse = {
  __typename?: 'SetupOrganizationResponse';
  organizationId: Scalars['ID'];
};

export type Store = {
  __typename?: 'Store';
  items: Array<Item>;
};

export type GetMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetaDataQuery = { __typename?: 'Query', metadata: { __typename?: 'MetaData', platform: string, buildAt: string, version: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'CurrentUser', organizationId: string } };

export type SetupOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type SetupOrganizationMutation = { __typename?: 'Mutation', setupOrganization: { __typename?: 'SetupOrganizationResponse', organizationId: string } };


export const GetMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"buildAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetMetaDataQuery, GetMetaDataQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const SetupOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetupOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setupOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<SetupOrganizationMutation, SetupOrganizationMutationVariables>;