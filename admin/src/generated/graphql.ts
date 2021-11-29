import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type AllUsersAddressesForAdminUiQueryVariables = Exact<{
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  sortField: Scalars['String'];
  sortOrder: Scalars['String'];
}>;


export type AllUsersAddressesForAdminUiQuery = { __typename?: 'Query', allUsersAddressesForAdminUI?: Array<{ __typename?: 'Address', id: string, line1: string, line2?: string | null | undefined, county?: string | null | undefined, postcode: string, country: string, createdAt: any, updatedAt: any, userId: string } | null | undefined> | null | undefined };

export type GetUserAddressForAdminUiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserAddressForAdminUiQuery = { __typename?: 'Query', getUserAddressForAdminUI?: { __typename?: 'Address', id: string, line1: string, line2?: string | null | undefined, county?: string | null | undefined, postcode: string, country: string, userId: string, createdAt: any, updatedAt: any } | null | undefined };

export type GetUserForAdminUiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserForAdminUiQuery = { __typename?: 'Query', getUserForAdminUI?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, createdAt: any, updatedAt: any } | null | undefined };

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


export const AllUsersAddressesForAdminUiDocument = gql`
    query allUsersAddressesForAdminUI($page: Int!, $perPage: Int!, $sortField: String!, $sortOrder: String!) {
  allUsersAddressesForAdminUI(
    page: $page
    perPage: $perPage
    sortField: $sortField
    sortOrder: $sortOrder
  ) {
    id
    line1
    line2
    county
    postcode
    country
    createdAt
    updatedAt
    userId
  }
}
    `;

/**
 * __useAllUsersAddressesForAdminUiQuery__
 *
 * To run a query within a React component, call `useAllUsersAddressesForAdminUiQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersAddressesForAdminUiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersAddressesForAdminUiQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sortField: // value for 'sortField'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useAllUsersAddressesForAdminUiQuery(baseOptions: Apollo.QueryHookOptions<AllUsersAddressesForAdminUiQuery, AllUsersAddressesForAdminUiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersAddressesForAdminUiQuery, AllUsersAddressesForAdminUiQueryVariables>(AllUsersAddressesForAdminUiDocument, options);
      }
export function useAllUsersAddressesForAdminUiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersAddressesForAdminUiQuery, AllUsersAddressesForAdminUiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersAddressesForAdminUiQuery, AllUsersAddressesForAdminUiQueryVariables>(AllUsersAddressesForAdminUiDocument, options);
        }
export type AllUsersAddressesForAdminUiQueryHookResult = ReturnType<typeof useAllUsersAddressesForAdminUiQuery>;
export type AllUsersAddressesForAdminUiLazyQueryHookResult = ReturnType<typeof useAllUsersAddressesForAdminUiLazyQuery>;
export type AllUsersAddressesForAdminUiQueryResult = Apollo.QueryResult<AllUsersAddressesForAdminUiQuery, AllUsersAddressesForAdminUiQueryVariables>;
export const GetUserAddressForAdminUiDocument = gql`
    query getUserAddressForAdminUI($id: String!) {
  getUserAddressForAdminUI(id: $id) {
    id
    line1
    line2
    county
    postcode
    country
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserAddressForAdminUiQuery__
 *
 * To run a query within a React component, call `useGetUserAddressForAdminUiQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAddressForAdminUiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAddressForAdminUiQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserAddressForAdminUiQuery(baseOptions: Apollo.QueryHookOptions<GetUserAddressForAdminUiQuery, GetUserAddressForAdminUiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAddressForAdminUiQuery, GetUserAddressForAdminUiQueryVariables>(GetUserAddressForAdminUiDocument, options);
      }
export function useGetUserAddressForAdminUiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAddressForAdminUiQuery, GetUserAddressForAdminUiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAddressForAdminUiQuery, GetUserAddressForAdminUiQueryVariables>(GetUserAddressForAdminUiDocument, options);
        }
export type GetUserAddressForAdminUiQueryHookResult = ReturnType<typeof useGetUserAddressForAdminUiQuery>;
export type GetUserAddressForAdminUiLazyQueryHookResult = ReturnType<typeof useGetUserAddressForAdminUiLazyQuery>;
export type GetUserAddressForAdminUiQueryResult = Apollo.QueryResult<GetUserAddressForAdminUiQuery, GetUserAddressForAdminUiQueryVariables>;
export const GetUserForAdminUiDocument = gql`
    query getUserForAdminUI($id: String!) {
  getUserForAdminUI(id: $id) {
    id
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserForAdminUiQuery__
 *
 * To run a query within a React component, call `useGetUserForAdminUiQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserForAdminUiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserForAdminUiQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserForAdminUiQuery(baseOptions: Apollo.QueryHookOptions<GetUserForAdminUiQuery, GetUserForAdminUiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserForAdminUiQuery, GetUserForAdminUiQueryVariables>(GetUserForAdminUiDocument, options);
      }
export function useGetUserForAdminUiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserForAdminUiQuery, GetUserForAdminUiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserForAdminUiQuery, GetUserForAdminUiQueryVariables>(GetUserForAdminUiDocument, options);
        }
export type GetUserForAdminUiQueryHookResult = ReturnType<typeof useGetUserForAdminUiQuery>;
export type GetUserForAdminUiLazyQueryHookResult = ReturnType<typeof useGetUserForAdminUiLazyQuery>;
export type GetUserForAdminUiQueryResult = Apollo.QueryResult<GetUserForAdminUiQuery, GetUserForAdminUiQueryVariables>;
export const CreateUserForAdminUiDocument = gql`
    mutation CreateUserForAdminUI($inputs: CreateUserInputs!) {
  createUserForAdminUI(inputs: $inputs) {
    id
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserForAdminUiMutationFn = Apollo.MutationFunction<CreateUserForAdminUiMutation, CreateUserForAdminUiMutationVariables>;

/**
 * __useCreateUserForAdminUiMutation__
 *
 * To run a mutation, you first call `useCreateUserForAdminUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserForAdminUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserForAdminUiMutation, { data, loading, error }] = useCreateUserForAdminUiMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useCreateUserForAdminUiMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserForAdminUiMutation, CreateUserForAdminUiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserForAdminUiMutation, CreateUserForAdminUiMutationVariables>(CreateUserForAdminUiDocument, options);
      }
export type CreateUserForAdminUiMutationHookResult = ReturnType<typeof useCreateUserForAdminUiMutation>;
export type CreateUserForAdminUiMutationResult = Apollo.MutationResult<CreateUserForAdminUiMutation>;
export type CreateUserForAdminUiMutationOptions = Apollo.BaseMutationOptions<CreateUserForAdminUiMutation, CreateUserForAdminUiMutationVariables>;
export const AllUsersForAdminUiDocument = gql`
    query allUsersForAdminUI($page: Int!, $perPage: Int!, $sortField: String!, $sortOrder: String!) {
  allUsersForAdminUI(
    page: $page
    perPage: $perPage
    sortField: $sortField
    sortOrder: $sortOrder
  ) {
    id
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
    address {
      id
    }
  }
  allUsersForAdminUICount
}
    `;

/**
 * __useAllUsersForAdminUiQuery__
 *
 * To run a query within a React component, call `useAllUsersForAdminUiQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersForAdminUiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersForAdminUiQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      sortField: // value for 'sortField'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useAllUsersForAdminUiQuery(baseOptions: Apollo.QueryHookOptions<AllUsersForAdminUiQuery, AllUsersForAdminUiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersForAdminUiQuery, AllUsersForAdminUiQueryVariables>(AllUsersForAdminUiDocument, options);
      }
export function useAllUsersForAdminUiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersForAdminUiQuery, AllUsersForAdminUiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersForAdminUiQuery, AllUsersForAdminUiQueryVariables>(AllUsersForAdminUiDocument, options);
        }
export type AllUsersForAdminUiQueryHookResult = ReturnType<typeof useAllUsersForAdminUiQuery>;
export type AllUsersForAdminUiLazyQueryHookResult = ReturnType<typeof useAllUsersForAdminUiLazyQuery>;
export type AllUsersForAdminUiQueryResult = Apollo.QueryResult<AllUsersForAdminUiQuery, AllUsersForAdminUiQueryVariables>;
export const UpdateUserForAdminUiDocument = gql`
    mutation UpdateUserForAdminUI($id: String!, $inputs: UpdateUserInputs!) {
  updateUserForAdminUI(id: $id, inputs: $inputs) {
    id
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserForAdminUiMutationFn = Apollo.MutationFunction<UpdateUserForAdminUiMutation, UpdateUserForAdminUiMutationVariables>;

/**
 * __useUpdateUserForAdminUiMutation__
 *
 * To run a mutation, you first call `useUpdateUserForAdminUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserForAdminUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserForAdminUiMutation, { data, loading, error }] = useUpdateUserForAdminUiMutation({
 *   variables: {
 *      id: // value for 'id'
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useUpdateUserForAdminUiMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserForAdminUiMutation, UpdateUserForAdminUiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserForAdminUiMutation, UpdateUserForAdminUiMutationVariables>(UpdateUserForAdminUiDocument, options);
      }
export type UpdateUserForAdminUiMutationHookResult = ReturnType<typeof useUpdateUserForAdminUiMutation>;
export type UpdateUserForAdminUiMutationResult = Apollo.MutationResult<UpdateUserForAdminUiMutation>;
export type UpdateUserForAdminUiMutationOptions = Apollo.BaseMutationOptions<UpdateUserForAdminUiMutation, UpdateUserForAdminUiMutationVariables>;
export const DeleteUserForAdminUiDocument = gql`
    mutation DeleteUserForAdminUI($id: String!) {
  deleteUserForAdminUI(id: $id) {
    id
    firstName
    lastName
    email
    role
  }
}
    `;
export type DeleteUserForAdminUiMutationFn = Apollo.MutationFunction<DeleteUserForAdminUiMutation, DeleteUserForAdminUiMutationVariables>;

/**
 * __useDeleteUserForAdminUiMutation__
 *
 * To run a mutation, you first call `useDeleteUserForAdminUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserForAdminUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserForAdminUiMutation, { data, loading, error }] = useDeleteUserForAdminUiMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserForAdminUiMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserForAdminUiMutation, DeleteUserForAdminUiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserForAdminUiMutation, DeleteUserForAdminUiMutationVariables>(DeleteUserForAdminUiDocument, options);
      }
export type DeleteUserForAdminUiMutationHookResult = ReturnType<typeof useDeleteUserForAdminUiMutation>;
export type DeleteUserForAdminUiMutationResult = Apollo.MutationResult<DeleteUserForAdminUiMutation>;
export type DeleteUserForAdminUiMutationOptions = Apollo.BaseMutationOptions<DeleteUserForAdminUiMutation, DeleteUserForAdminUiMutationVariables>;
export const DeleteManyUsersForAdminUiDocument = gql`
    mutation deleteManyUsersForAdminUI($ids: [String!]!) {
  deleteManyUsersForAdminUI(ids: $ids)
}
    `;
export type DeleteManyUsersForAdminUiMutationFn = Apollo.MutationFunction<DeleteManyUsersForAdminUiMutation, DeleteManyUsersForAdminUiMutationVariables>;

/**
 * __useDeleteManyUsersForAdminUiMutation__
 *
 * To run a mutation, you first call `useDeleteManyUsersForAdminUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManyUsersForAdminUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManyUsersForAdminUiMutation, { data, loading, error }] = useDeleteManyUsersForAdminUiMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteManyUsersForAdminUiMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManyUsersForAdminUiMutation, DeleteManyUsersForAdminUiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteManyUsersForAdminUiMutation, DeleteManyUsersForAdminUiMutationVariables>(DeleteManyUsersForAdminUiDocument, options);
      }
export type DeleteManyUsersForAdminUiMutationHookResult = ReturnType<typeof useDeleteManyUsersForAdminUiMutation>;
export type DeleteManyUsersForAdminUiMutationResult = Apollo.MutationResult<DeleteManyUsersForAdminUiMutation>;
export type DeleteManyUsersForAdminUiMutationOptions = Apollo.BaseMutationOptions<DeleteManyUsersForAdminUiMutation, DeleteManyUsersForAdminUiMutationVariables>;