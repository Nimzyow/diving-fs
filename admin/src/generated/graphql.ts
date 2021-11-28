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
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  country: Scalars['String'];
  county?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postcode: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CreateUserInputs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress?: Maybe<Success>;
  createUser?: Maybe<Token>;
  createUserForAdminUI?: Maybe<User>;
  deleteManyUsersForAdminUI?: Maybe<Array<Maybe<Scalars['String']>>>;
  deleteUserForAdminUI?: Maybe<User>;
  login: Token;
  updateUserForAdminUI?: Maybe<User>;
};


export type MutationCreateAddressArgs = {
  county?: InputMaybe<Scalars['String']>;
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  postcode: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserForAdminUiArgs = {
  inputs: CreateUserInputs;
};


export type MutationDeleteManyUsersForAdminUiArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteUserForAdminUiArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};


export type MutationUpdateUserForAdminUiArgs = {
  id: Scalars['String'];
  inputs: UpdateUserInputs;
};

export type Note = {
  __typename?: 'Note';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allUsersAddressesForAdminUI?: Maybe<Array<Maybe<Address>>>;
  allUsersForAdminUI?: Maybe<Array<Maybe<User>>>;
  allUsersForAdminUICount?: Maybe<Scalars['Int']>;
  getUserAddressForAdminUI?: Maybe<Address>;
  getUserForAdminUI?: Maybe<User>;
  me?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryAllUsersAddressesForAdminUiArgs = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  sortField: Scalars['String'];
  sortOrder: Scalars['String'];
};


export type QueryAllUsersForAdminUiArgs = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  sortField: Scalars['String'];
  sortOrder: Scalars['String'];
};


export type QueryGetUserAddressForAdminUiArgs = {
  id: Scalars['String'];
};


export type QueryGetUserForAdminUiArgs = {
  id: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Staff = 'STAFF',
  SuperUser = 'SUPER_USER',
  User = 'USER'
}

export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Token = {
  __typename?: 'Token';
  errors: Array<Error>;
  token?: Maybe<Scalars['String']>;
};

export type UpdateUserInputs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isSuperUser: Scalars['Boolean'];
  lastName: Scalars['String'];
  role: Role;
  updatedAt: Scalars['DateTime'];
};

export type GetUserAddressForAdminUiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserAddressForAdminUiQuery = { __typename?: 'Query', getUserAddressForAdminUI?: { __typename?: 'Address', id: string, line1: string, line2?: string | null | undefined, county?: string | null | undefined, postcode: string, country: string, createdAt: any, updatedAt: any, userId: string } | null | undefined };

export type CreateUserForAdminUiMutationVariables = Exact<{
  inputs: CreateUserInputs;
}>;


export type CreateUserForAdminUiMutation = { __typename?: 'Mutation', createUserForAdminUI?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any } | null | undefined };

export type AllUsersForAdminUiQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  sortField: Scalars['String'];
  sortOrder: Scalars['String'];
}>;


export type AllUsersForAdminUiQuery = { __typename?: 'Query', allUsersForAdminUICount?: number | null | undefined, allUsersForAdminUI?: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', id: string } | null | undefined } | null | undefined> | null | undefined };

export type GetUserForAdminUiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserForAdminUiQuery = { __typename?: 'Query', getUserForAdminUI?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any } | null | undefined };

export type UpdateUserForAdminUiMutationVariables = Exact<{
  id: Scalars['String'];
  inputs: UpdateUserInputs;
}>;


export type UpdateUserForAdminUiMutation = { __typename?: 'Mutation', updateUserForAdminUI?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any } | null | undefined };

export type DeleteUserForAdminUiMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserForAdminUiMutation = { __typename?: 'Mutation', deleteUserForAdminUI?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role } | null | undefined };

export type DeleteManyUsersForAdminUiMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteManyUsersForAdminUiMutation = { __typename?: 'Mutation', deleteManyUsersForAdminUI?: Array<string | null | undefined> | null | undefined };
