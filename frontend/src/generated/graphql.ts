import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  deleteManyUserAddressesForAdminUI?: Maybe<Array<Maybe<Scalars['String']>>>;
  deleteManyUsersForAdminUI?: Maybe<Array<Maybe<Scalars['String']>>>;
  deleteUserAddressForAdminUI?: Maybe<Address>;
  deleteUserForAdminUI?: Maybe<User>;
  login: Token;
  updateUserAddressForAdminUI?: Maybe<Address>;
  updateUserForAdminUI?: Maybe<User>;
};


export type MutationCreateAddressArgs = {
  county?: Maybe<Scalars['String']>;
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
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


export type MutationDeleteManyUserAddressesForAdminUiArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteManyUsersForAdminUiArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteUserAddressForAdminUiArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserForAdminUiArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};


export type MutationUpdateUserAddressForAdminUiArgs = {
  id: Scalars['String'];
  inputs: UpdateUserAddressInputs;
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

export type UpdateUserAddressInputs = {
  country: Scalars['String'];
  county: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  postcode: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  loginEmail: Scalars['String'];
  loginPassword: Scalars['String'];
  loginPasswordConfirm: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', token?: Maybe<string>, errors: Array<{ __typename?: 'Error', code: string, message: string }> } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<{ __typename?: 'Token', token?: Maybe<string>, errors: Array<{ __typename?: 'Error', code: string, message: string }> }> };


export const LoginDocument = gql`
    mutation login($loginEmail: String!, $loginPassword: String!, $loginPasswordConfirm: String!) {
  login(
    email: $loginEmail
    password: $loginPassword
    passwordConfirm: $loginPasswordConfirm
  ) {
    token
    errors {
      code
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginEmail: // value for 'loginEmail'
 *      loginPassword: // value for 'loginPassword'
 *      loginPasswordConfirm: // value for 'loginPasswordConfirm'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  createUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
  ) {
    errors {
      code
      message
    }
    token
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;