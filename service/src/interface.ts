import { GraphQLSchema } from 'graphql';
import { SchemaDefinition, Connection } from 'mongoose';

/**
 * @description model-Service parameters
 */
export interface IGraphqlSchemas {
  getSchema(name: string): GraphQLSchema | undefined;
  buildSchema(
    url: string,
    name: string,
    schema: SchemaDefinition,
  ): Promise<GraphQLSchema>;
}

export interface IConnections {
  pool: { [propName: string]: Connection };
  getConn(url: string): Promise<Connection>;
}
