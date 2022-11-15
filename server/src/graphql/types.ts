import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Date: Date;
  DateFuture: Date;
  DatePast: Date;
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
  discountedPriceTotal: Scalars['FloatNonNegative'];
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
  Bill: ResolverTypeWrapper<Bill>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Branch: ResolverTypeWrapper<Branch>;
  CurrentUser: ResolverTypeWrapper<CurrentUser>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateFuture: ResolverTypeWrapper<Scalars['DateFuture']>;
  DatePast: ResolverTypeWrapper<Scalars['DatePast']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Float0To1: ResolverTypeWrapper<Scalars['Float0To1']>;
  FloatNegative: ResolverTypeWrapper<Scalars['FloatNegative']>;
  FloatNonNegative: ResolverTypeWrapper<Scalars['FloatNonNegative']>;
  FloatNonPositive: ResolverTypeWrapper<Scalars['FloatNonPositive']>;
  FloatNonZero: ResolverTypeWrapper<Scalars['FloatNonZero']>;
  FloatPositive: ResolverTypeWrapper<Scalars['FloatPositive']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IntNegative: ResolverTypeWrapper<Scalars['IntNegative']>;
  IntNonNegative: ResolverTypeWrapper<Scalars['IntNonNegative']>;
  IntNonPositive: ResolverTypeWrapper<Scalars['IntNonPositive']>;
  IntNonZero: ResolverTypeWrapper<Scalars['IntNonZero']>;
  IntPositive: ResolverTypeWrapper<Scalars['IntPositive']>;
  Item: ResolverTypeWrapper<Item>;
  MetaData: ResolverTypeWrapper<MetaData>;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  Privilege: Privilege;
  Query: ResolverTypeWrapper<{}>;
  SetupOrganizationResponse: ResolverTypeWrapper<SetupOrganizationResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringNonEmpty: ResolverTypeWrapper<Scalars['StringNonEmpty']>;
  itemInput: ItemInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Bill: Bill;
  Boolean: Scalars['Boolean'];
  Branch: Branch;
  CurrentUser: CurrentUser;
  Date: Scalars['Date'];
  DateFuture: Scalars['DateFuture'];
  DatePast: Scalars['DatePast'];
  Float: Scalars['Float'];
  Float0To1: Scalars['Float0To1'];
  FloatNegative: Scalars['FloatNegative'];
  FloatNonNegative: Scalars['FloatNonNegative'];
  FloatNonPositive: Scalars['FloatNonPositive'];
  FloatNonZero: Scalars['FloatNonZero'];
  FloatPositive: Scalars['FloatPositive'];
  ID: Scalars['ID'];
  IntNegative: Scalars['IntNegative'];
  IntNonNegative: Scalars['IntNonNegative'];
  IntNonPositive: Scalars['IntNonPositive'];
  IntNonZero: Scalars['IntNonZero'];
  IntPositive: Scalars['IntPositive'];
  Item: Item;
  MetaData: MetaData;
  Mutation: {};
  Organization: Organization;
  Query: {};
  SetupOrganizationResponse: SetupOrganizationResponse;
  String: Scalars['String'];
  StringNonEmpty: Scalars['StringNonEmpty'];
  itemInput: ItemInput;
}>;

export type BillResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Bill'] = ResolversParentTypes['Bill']> = ResolversObject<{
  branchId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  costTotal?: Resolver<ResolversTypes['FloatNonNegative'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  customerEmail?: Resolver<ResolversTypes['StringNonEmpty'], ParentType, ContextType>;
  customerName?: Resolver<ResolversTypes['StringNonEmpty'], ParentType, ContextType>;
  customerPhone?: Resolver<ResolversTypes['StringNonEmpty'], ParentType, ContextType>;
  discountedPriceTotal?: Resolver<ResolversTypes['FloatNonNegative'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priceTotal?: Resolver<ResolversTypes['FloatNonNegative'], ParentType, ContextType>;
  profitLoss?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['IntPositive'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BranchResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Branch'] = ResolversParentTypes['Branch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentUserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CurrentUser'] = ResolversParentTypes['CurrentUser']> = ResolversObject<{
  branchId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  privilege?: Resolver<Maybe<ResolversTypes['Privilege']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateFutureScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateFuture'], any> {
  name: 'DateFuture';
}

export interface DatePastScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DatePast'], any> {
  name: 'DatePast';
}

export interface Float0To1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Float0To1'], any> {
  name: 'Float0To1';
}

export interface FloatNegativeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FloatNegative'], any> {
  name: 'FloatNegative';
}

export interface FloatNonNegativeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FloatNonNegative'], any> {
  name: 'FloatNonNegative';
}

export interface FloatNonPositiveScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FloatNonPositive'], any> {
  name: 'FloatNonPositive';
}

export interface FloatNonZeroScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FloatNonZero'], any> {
  name: 'FloatNonZero';
}

export interface FloatPositiveScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FloatPositive'], any> {
  name: 'FloatPositive';
}

export interface IntNegativeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntNegative'], any> {
  name: 'IntNegative';
}

export interface IntNonNegativeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntNonNegative'], any> {
  name: 'IntNonNegative';
}

export interface IntNonPositiveScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntNonPositive'], any> {
  name: 'IntNonPositive';
}

export interface IntNonZeroScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntNonZero'], any> {
  name: 'IntNonZero';
}

export interface IntPositiveScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IntPositive'], any> {
  name: 'IntPositive';
}

export type ItemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  branchId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  brandName?: Resolver<ResolversTypes['StringNonEmpty'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['StringNonEmpty'], ParentType, ContextType>;
  costPerUnit?: Resolver<ResolversTypes['FloatNonNegative'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float0To1'], ParentType, ContextType>;
  expireAt?: Resolver<Maybe<ResolversTypes['DateFuture']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  manufactureAt?: Resolver<ResolversTypes['DatePast'], ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pricePerUnit?: Resolver<ResolversTypes['FloatNonNegative'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['IntPositive'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetaDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MetaData'] = ResolversParentTypes['MetaData']> = ResolversObject<{
  buildAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddItemArgs, 'branchId' | 'brandName' | 'companyName' | 'costPerUnit' | 'id' | 'manufactureAt' | 'organizationId' | 'pricePerUnit' | 'quantity'>>;
  createBill?: Resolver<ResolversTypes['Bill'], ParentType, ContextType, RequireFields<MutationCreateBillArgs, 'branchId' | 'customerEmail' | 'customerName' | 'customerPhone' | 'items' | 'organizationId'>>;
  createBranch?: Resolver<ResolversTypes['Branch'], ParentType, ContextType, RequireFields<MutationCreateBranchArgs, 'name' | 'organizationId'>>;
  deleteItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'branchId' | 'id' | 'organizationId'>>;
  setupOrganization?: Resolver<ResolversTypes['SetupOrganizationResponse'], ParentType, ContextType, RequireFields<MutationSetupOrganizationArgs, 'name'>>;
  updateItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'branchId' | 'id' | 'organizationId'>>;
}>;

export type OrganizationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bill?: Resolver<ResolversTypes['Bill'], ParentType, ContextType, RequireFields<QueryBillArgs, 'billId' | 'branchId' | 'organizationId'>>;
  bills?: Resolver<Array<ResolversTypes['Bill']>, ParentType, ContextType, RequireFields<QueryBillsArgs, 'branchId' | 'organizationId'>>;
  branch?: Resolver<ResolversTypes['Branch'], ParentType, ContextType, RequireFields<QueryBranchArgs, 'branchId' | 'organizationId'>>;
  branches?: Resolver<Array<ResolversTypes['Branch']>, ParentType, ContextType, RequireFields<QueryBranchesArgs, 'organizationId'>>;
  currentUser?: Resolver<ResolversTypes['CurrentUser'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<QueryItemArgs, 'branchId' | 'id' | 'organizationId'>>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemsArgs, 'branchId' | 'organizationId'>>;
  metadata?: Resolver<ResolversTypes['MetaData'], ParentType, ContextType>;
}>;

export type SetupOrganizationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SetupOrganizationResponse'] = ResolversParentTypes['SetupOrganizationResponse']> = ResolversObject<{
  organizationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface StringNonEmptyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['StringNonEmpty'], any> {
  name: 'StringNonEmpty';
}

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Bill?: BillResolvers<ContextType>;
  Branch?: BranchResolvers<ContextType>;
  CurrentUser?: CurrentUserResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateFuture?: GraphQLScalarType;
  DatePast?: GraphQLScalarType;
  Float0To1?: GraphQLScalarType;
  FloatNegative?: GraphQLScalarType;
  FloatNonNegative?: GraphQLScalarType;
  FloatNonPositive?: GraphQLScalarType;
  FloatNonZero?: GraphQLScalarType;
  FloatPositive?: GraphQLScalarType;
  IntNegative?: GraphQLScalarType;
  IntNonNegative?: GraphQLScalarType;
  IntNonPositive?: GraphQLScalarType;
  IntNonZero?: GraphQLScalarType;
  IntPositive?: GraphQLScalarType;
  Item?: ItemResolvers<ContextType>;
  MetaData?: MetaDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SetupOrganizationResponse?: SetupOrganizationResponseResolvers<ContextType>;
  StringNonEmpty?: GraphQLScalarType;
}>;

