/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateUserInputs: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
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
  Address: { // root type
    country: string; // String!
    county?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    line1: string; // String!
    line2?: string | null; // String
    postcode: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  Error: { // root type
    code: string; // String!
    message: string; // String!
  }
  Mutation: {};
  Note: { // root type
    body: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId?: string | null; // String
  }
  Query: {};
  Success: { // root type
    success: boolean; // Boolean!
  }
  Token: { // root type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
    token?: string | null; // String
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    isSuperUser: boolean; // Boolean!
    lastName: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Address: { // field return type
    country: string; // String!
    county: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    line1: string; // String!
    line2: string | null; // String
    postcode: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  Error: { // field return type
    code: string; // String!
    message: string; // String!
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['Token'] | null; // Token
    login: NexusGenRootTypes['Token']; // Token!
  }
  Note: { // field return type
    body: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string | null; // String
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
  }
  Success: { // field return type
    success: boolean; // Boolean!
  }
  Token: { // field return type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
    token: string | null; // String
  }
  User: { // field return type
    address: NexusGenRootTypes['Address'] | null; // Address
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    isSuperUser: boolean; // Boolean!
    lastName: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Address: { // field return type name
    country: 'String'
    county: 'String'
    createdAt: 'DateTime'
    id: 'String'
    line1: 'String'
    line2: 'String'
    postcode: 'String'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Error: { // field return type name
    code: 'String'
    message: 'String'
  }
  Mutation: { // field return type name
    createUser: 'Token'
    login: 'Token'
  }
  Note: { // field return type name
    body: 'String'
    createdAt: 'DateTime'
    id: 'String'
    title: 'String'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Query: { // field return type name
    me: 'User'
  }
  Success: { // field return type name
    success: 'Boolean'
  }
  Token: { // field return type name
    errors: 'Error'
    token: 'String'
  }
  User: { // field return type name
    address: 'Address'
    createdAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    id: 'String'
    isSuperUser: 'Boolean'
    lastName: 'String'
    role: 'Role'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      inputs: NexusGenInputs['CreateUserInputs']; // CreateUserInputs!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

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