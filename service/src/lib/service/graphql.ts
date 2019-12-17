import { provide, ScopeEnum, scope } from 'midway';
import { Schema, model, SchemaDefinition } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { GraphQLSchema } from 'graphql';

import { IGraphql } from '../../interface';

@scope(ScopeEnum.Singleton)
@provide('GraphQLService')
export class GraphQL implements IGraphql {

  schemas: { [ propsName: string ]: GraphQLSchema };

  constructor() {
    this.schemas = {};
  }

  getGraphQLSchema(name: string): GraphQLSchema {
    return this.schemas[name];
  }

  buildSchema(name: string, schema: SchemaDefinition): GraphQLSchema {
    const mongoSchema: Schema = new Schema(schema);
    const configModel = model('config', mongoSchema);
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
