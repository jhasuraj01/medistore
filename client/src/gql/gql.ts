/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetMetaData {\n    metadata {\n      platform\n      buildAt\n      version\n    }\n  }\n": types.GetMetaDataDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      organizationId\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  mutation SetupOrganization($name: String!) {\n    setupOrganization(name: $name) {\n      organizationId\n    }\n  }\n": types.SetupOrganizationDocument,
};

export function graphql(source: "\n  query GetMetaData {\n    metadata {\n      platform\n      buildAt\n      version\n    }\n  }\n"): (typeof documents)["\n  query GetMetaData {\n    metadata {\n      platform\n      buildAt\n      version\n    }\n  }\n"];
export function graphql(source: "\n  query GetCurrentUser {\n    currentUser {\n      organizationId\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      organizationId\n    }\n  }\n"];
export function graphql(source: "\n  mutation SetupOrganization($name: String!) {\n    setupOrganization(name: $name) {\n      organizationId\n    }\n  }\n"): (typeof documents)["\n  mutation SetupOrganization($name: String!) {\n    setupOrganization(name: $name) {\n      organizationId\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;