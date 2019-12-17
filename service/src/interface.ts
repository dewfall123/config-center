import { GraphQLSchema } from 'graphql';
import { SchemaDefinition } from 'mongoose';

/**
 * @description model-Service parameters
 */
export interface IGraphql {
  schemas: { [ propsName: string ]: GraphQLSchema };
  getGraphQLSchema(name: string): GraphQLSchema;
  buildSchema(name: string, schema: SchemaDefinition): GraphQLSchema;
}
