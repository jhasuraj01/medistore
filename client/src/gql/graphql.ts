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

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
  shops: Array<Shop>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  itemByID: Item;
  itemByName: Array<Item>;
  metadata: MetaData;
  organization?: Maybe<Organization>;
  organizations: Array<Organization>;
  shop?: Maybe<Shop>;
  shops: Array<Shop>;
  user: User;
};


export type QueryItemByIdArgs = {
  id: Scalars['String'];
};


export type QueryItemByNameArgs = {
  name: Scalars['String'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryShopArgs = {
  id: Scalars['ID'];
};

export type Shop = {
  __typename?: 'Shop';
  id: Scalars['ID'];
  name: Scalars['String'];
  organization: Organization;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type GetMetaDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMetaDataQuery = { __typename?: 'Query', metadata: { __typename?: 'MetaData', platform: string, buildAt: string, version: string } };


export const GetMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMetaData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"buildAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]} as unknown as DocumentNode<GetMetaDataQuery, GetMetaDataQueryVariables>;