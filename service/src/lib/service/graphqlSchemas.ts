import { provide, ScopeEnum, scope, inject } from 'midway';
import { Schema, SchemaDefinition } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { GraphQLSchema } from 'graphql';

import { IGraphqlSchemas, IConnections } from '../../interface';

@scope(ScopeEnum.Singleton)
@provide('graphqlSchemas')
export class GraphqlSchemas implements IGraphqlSchemas {

  schemas: { [ propsName: string ]: GraphQLSchema };

  @inject('connections')
  connections: IConnections;

  constructor() {
    this.schemas = {};
  }

  getGraphQLSchema(name: string): GraphQLSchema | undefined {
    return this.schemas[name];
  }

  async buildSchema(url: string, name: string, schema: SchemaDefinition) {
    const existSchema = this.getGraphQLSchema(name);
    if (existSchema) {
      return existSchema;
    }
    const connection = await this.connections.getConn(url);
    const mongoSchema: Schema = new Schema(schema);
    const configModel = connection.model(name, mongoSchema);
    const ConfigTC = composeWithMongoose(configModel, {});

    const FIELDS = [
      'findById',
      'findByIds',
      'findOne',
      'findMany',
      'count',
      'connection',
      'pagination',
    ];
    for (const field of FIELDS) {
      schemaComposer.Query.addFields({
        [field]: ConfigTC.getResolver(field),
      });
    }

    const graphqlSchema: GraphQLSchema = schemaComposer.buildSchema();
    this.schemas[name] = graphqlSchema;
    return graphqlSchema;
  }
}
