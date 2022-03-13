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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type BaseError = {
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type CreatePostInputs = {
  body: Scalars['String'];
};

export type CreatePostOutput = {
  __typename?: 'CreatePostOutput';
  createPostError?: Maybe<BaseError>;
  post?: Maybe<Post>;
};

export type CreateUserError = EmailValidationError | HandleValidationError;

export type CreateUserInputs = {
  email: Scalars['String'];
  handle: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  createUserError?: Maybe<CreateUserError>;
  token?: Maybe<Scalars['String']>;
};

export type DiverCertification = {
  __typename?: 'DiverCertification';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailValidationError = BaseError & {
  __typename?: 'EmailValidationError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type HandleValidationError = BaseError & {
  __typename?: 'HandleValidationError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginUserInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePostOutput>;
  createUser?: Maybe<CreateUserOutput>;
  login: Token;
};


export type MutationCreatePostArgs = {
  inputs: CreatePostInputs;
};


export type MutationCreateUserArgs = {
  inputs: CreateUserInputs;
};


export type MutationLoginArgs = {
  inputs: LoginUserInputs;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  userRelatedPosts: Array<Maybe<Post>>;
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
  token?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  diverCertifications?: Maybe<Array<Maybe<DiverCertification>>>;
  email: Scalars['String'];
  handle: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, name: string, handle: string, email: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }> };

export type CreatePostMutationVariables = Exact<{
  CreatePostInputs: CreatePostInputs;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'CreatePostOutput', post?: Maybe<{ __typename?: 'Post', id?: Maybe<string>, body?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, createPostError?: Maybe<{ __typename?: 'EmailValidationError', field?: Maybe<string>, message?: Maybe<string> } | { __typename?: 'HandleValidationError', field?: Maybe<string>, message?: Maybe<string> }> }> };

export type UserRelatedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRelatedPostsQuery = { __typename?: 'Query', userRelatedPosts: Array<Maybe<{ __typename?: 'Post', id?: Maybe<string>, body?: Maybe<string>, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, author: { __typename?: 'User', id: string, name: string } }>> };

export type CreateUserMutationVariables = Exact<{
  inputs: CreateUserInputs;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<{ __typename?: 'CreateUserOutput', token?: Maybe<string>, createUserError?: Maybe<{ __typename: 'EmailValidationError', field?: Maybe<string>, message?: Maybe<string> } | { __typename: 'HandleValidationError', field?: Maybe<string>, message?: Maybe<string> }> }> };

export type LoginMutationVariables = Exact<{
  inputs: LoginUserInputs;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', token?: Maybe<string> } };


export const MeDocument = gql`
    query Me {
  me {
    id
    name
    handle
    email
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($CreatePostInputs: CreatePostInputs!) {
  createPost(inputs: $CreatePostInputs) {
    post {
      id
      body
      createdAt
      updatedAt
    }
    createPostError {
      field
      message
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      CreatePostInputs: // value for 'CreatePostInputs'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UserRelatedPostsDocument = gql`
    query userRelatedPosts {
  userRelatedPosts {
    id
    body
    createdAt
    updatedAt
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useUserRelatedPostsQuery__
 *
 * To run a query within a React component, call `useUserRelatedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRelatedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRelatedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserRelatedPostsQuery(baseOptions?: Apollo.QueryHookOptions<UserRelatedPostsQuery, UserRelatedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRelatedPostsQuery, UserRelatedPostsQueryVariables>(UserRelatedPostsDocument, options);
      }
export function useUserRelatedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRelatedPostsQuery, UserRelatedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRelatedPostsQuery, UserRelatedPostsQueryVariables>(UserRelatedPostsDocument, options);
        }
export type UserRelatedPostsQueryHookResult = ReturnType<typeof useUserRelatedPostsQuery>;
export type UserRelatedPostsLazyQueryHookResult = ReturnType<typeof useUserRelatedPostsLazyQuery>;
export type UserRelatedPostsQueryResult = Apollo.QueryResult<UserRelatedPostsQuery, UserRelatedPostsQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
  createUser(inputs: $inputs) {
    token
    createUserError {
      ... on BaseError {
        field
        message
        __typename
      }
    }
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
 *      inputs: // value for 'inputs'
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
export const LoginDocument = gql`
    mutation login($inputs: LoginUserInputs!) {
  login(inputs: $inputs) {
    token
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
 *      inputs: // value for 'inputs'
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