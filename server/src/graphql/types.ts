import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = T | Promise<T> | Partial<T> | Promise<Partial<T>>;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolverTypeWrapper<Item>;
  MetaData: ResolverTypeWrapper<MetaData>;
  Organization: ResolverTypeWrapper<Organization>;
  Query: ResolverTypeWrapper<{}>;
  Shop: ResolverTypeWrapper<Shop>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Item: Item;
  MetaData: MetaData;
  Organization: Organization;
  Query: {};
  Shop: Shop;
  String: Scalars['String'];
  User: User;
}>;

export type ItemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  costPerUnit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricePerUnit?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetaDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = ResolversObject<{
  buildAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrganizationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shops?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  itemByID?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<QueryItemByIdArgs, 'id'>>;
  itemByName?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemByNameArgs, 'name'>>;
  metadata?: Resolver<ResolversTypes['MetaData'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryOrganizationArgs, 'id'>>;
  organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<QueryShopArgs, 'id'>>;
  shops?: Resolver<Array<ResolversTypes['Shop']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type ShopResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Item?: ItemResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

