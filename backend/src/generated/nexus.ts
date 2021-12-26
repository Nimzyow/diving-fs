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
}

export interface NexusGenObjects {
  Error: { // root type
    code: string; // String!
    message: string; // String!
  }
  Mutation: {};
  Query: {};
  Success: { // root type
    success: boolean; // Boolean!
  }
  Token: { // root type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
    token?: string | null; // String
  }
  User: { // root type
    createdAt?: string | null; // String
    email?: string | null; // String
    handle?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
    role?: NexusGenEnums['Role'] | null; // Role
    updatedAt?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Error: { // field return type
    code: string; // String!
    message: string; // String!
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['Token'] | null; // Token
    login: NexusGenRootTypes['Token']; // Token!
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
    createdAt: string | null; // String
    email: string | null; // String
    handle: string | null; // String
    id: string | null; // String
    name: string | null; // String
    role: NexusGenEnums['Role'] | null; // Role
    updatedAt: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Error: { // field return type name
    code: 'String'
    message: 'String'
  }
  Mutation: { // field return type name
    createUser: 'Token'
    login: 'Token'
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
    createdAt: 'String'
    email: 'String'
    handle: 'String'
    id: 'String'
    name: 'String'
    role: 'Role'
    updatedAt: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      inputs: NexusGenInputs['CreateUserInputs']; // CreateUserInputs!
    }
    login: { // args
      inputs: NexusGenInputs['LoginUserInputs']; // LoginUserInputs!
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