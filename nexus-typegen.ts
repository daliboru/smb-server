/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
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
}

export interface NexusGenEnums {
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
  Post: { // root type
    body: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageUrl?: string | null; // String
    location?: string | null; // String
    mailto: string; // String!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    viewCount: number; // Int!
  }
  Query: {};
  Startup: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    fundingStage?: string | null; // String
    growthStage?: string | null; // String
    id: string; // ID!
    imageUrl?: string | null; // String
    industry?: string | null; // String
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Post: { // field return type
    body: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    imageUrl: string | null; // String
    location: string | null; // String
    mailto: string; // String!
    published: boolean; // Boolean!
    startup: NexusGenRootTypes['Startup'] | null; // Startup
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    viewCount: number; // Int!
  }
  Query: { // field return type
    allPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    allStartups: NexusGenRootTypes['Startup'][]; // [Startup!]!
  }
  Startup: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    fundingStage: string | null; // String
    growthStage: string | null; // String
    id: string; // ID!
    imageUrl: string | null; // String
    industry: string | null; // String
    name: string; // String!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Post: { // field return type name
    body: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    imageUrl: 'String'
    location: 'String'
    mailto: 'String'
    published: 'Boolean'
    startup: 'Startup'
    title: 'String'
    updatedAt: 'DateTime'
    viewCount: 'Int'
  }
  Query: { // field return type name
    allPosts: 'Post'
    allStartups: 'Startup'
  }
  Startup: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    fundingStage: 'String'
    growthStage: 'String'
    id: 'ID'
    imageUrl: 'String'
    industry: 'String'
    name: 'String'
    posts: 'Post'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

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