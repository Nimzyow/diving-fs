/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreatePostInputs: { // input type
    body: string; // String!
  }
  CreateUserInputs: { // input type
    email: string; // String!
    handle: string; // String!
    name: string; // String!
    password: string; // String!
  }
  LoginUserInputs: { // input type
    email: string; // String!
    password: string; // String!
  }
}

export interface NexusGenEnums {
  Role: "ADMIN" | "STAFF" | "SUPER_USER" | "USER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  CreatePostOutput: { // root type
    createPostError?: NexusGenRootTypes['BaseError'] | null; // BaseError
    post?: NexusGenRootTypes['Post'] | null; // Post
  }
  CreateUserOutput: { // root type
    createUserError?: NexusGenRootTypes['CreateUserError'] | null; // CreateUserError
    token?: string | null; // String
  }
  DiverCertification: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EmailValidationError: { // root type
    field?: string | null; // String
    message?: string | null; // String
  }
  HandleValidationError: { // root type
    field?: string | null; // String
    message?: string | null; // String
  }
  Mutation: {};
  Post: { // root type
    authorId: string; // String!
    body?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
  Success: { // root type
    success: boolean; // Boolean!
  }
  Token: { // root type
    token?: string | null; // String
  }
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: string | null; // String
    handle?: string | null; // String
    id: string; // String!
    name?: string | null; // String
    role?: NexusGenEnums['Role'] | null; // Role
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenInterfaces {
  BaseError: NexusGenRootTypes['EmailValidationError'] | NexusGenRootTypes['HandleValidationError'];
}

export interface NexusGenUnions {
  CreateUserError: NexusGenRootTypes['EmailValidationError'] | NexusGenRootTypes['HandleValidationError'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  CreatePostOutput: { // field return type
    createPostError: NexusGenRootTypes['BaseError'] | null; // BaseError
    post: NexusGenRootTypes['Post'] | null; // Post
  }
  CreateUserOutput: { // field return type
    createUserError: NexusGenRootTypes['CreateUserError'] | null; // CreateUserError
    token: string | null; // String
  }
  DiverCertification: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    name: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EmailValidationError: { // field return type
    field: string | null; // String
    message: string | null; // String
  }
  HandleValidationError: { // field return type
    field: string | null; // String
    message: string | null; // String
  }
  Mutation: { // field return type
    createPost: NexusGenRootTypes['CreatePostOutput'] | null; // CreatePostOutput
    createUser: NexusGenRootTypes['CreateUserOutput'] | null; // CreateUserOutput
    login: NexusGenRootTypes['Token']; // Token!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    authorId: string; // String!
    body: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
  }
  Success: { // field return type
    success: boolean; // Boolean!
  }
  Token: { // field return type
    token: string | null; // String
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    diverCertifications: Array<NexusGenRootTypes['DiverCertification'] | null> | null; // [DiverCertification]
    email: string | null; // String
    handle: string | null; // String
    id: string; // String!
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    role: NexusGenEnums['Role'] | null; // Role
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  BaseError: { // field return type
    field: string | null; // String
    message: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  CreatePostOutput: { // field return type name
    createPostError: 'BaseError'
    post: 'Post'
  }
  CreateUserOutput: { // field return type name
    createUserError: 'CreateUserError'
    token: 'String'
  }
  DiverCertification: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    name: 'String'
    updatedAt: 'DateTime'
  }
  EmailValidationError: { // field return type name
    field: 'String'
    message: 'String'
  }
  HandleValidationError: { // field return type name
    field: 'String'
    message: 'String'
  }
  Mutation: { // field return type name
    createPost: 'CreatePostOutput'
    createUser: 'CreateUserOutput'
    login: 'Token'
  }
  Post: { // field return type name
    author: 'User'
    authorId: 'String'
    body: 'String'
    createdAt: 'DateTime'
    id: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    me: 'User'
  }
  Success: { // field return type name
    success: 'Boolean'
  }
  Token: { // field return type name
    token: 'String'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    diverCertifications: 'DiverCertification'
    email: 'String'
    handle: 'String'
    id: 'String'
    name: 'String'
    posts: 'Post'
    role: 'Role'
    updatedAt: 'DateTime'
  }
  BaseError: { // field return type name
    field: 'String'
    message: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createPost: { // args
      inputs: NexusGenInputs['CreatePostInputs']; // CreatePostInputs!
    }
    createUser: { // args
      inputs: NexusGenInputs['CreateUserInputs']; // CreateUserInputs!
    }
    login: { // args
      inputs: NexusGenInputs['LoginUserInputs']; // LoginUserInputs!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  CreateUserError: "EmailValidationError" | "HandleValidationError"
  BaseError: "EmailValidationError" | "HandleValidationError"
}

export interface NexusGenTypeInterfaces {
  EmailValidationError: "BaseError"
  HandleValidationError: "BaseError"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "BaseError" | "CreateUserError";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}