import { provide, ScopeEnum, scope, inject } from 'midway';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { GraphQLSchema } from 'graphql';

import { Models } from '../model/models';

@scope(ScopeEnum.Singleton)
@provide('graphqlSchemas')
export class GraphqlSchemas {
  private queryFns = [
    'findById',
    'findByIds',
    'findOne',
    'findMany',
    'count',
    'connection',
    'pagination',
  ];

  @inject('Models')
  modles: Models;

  async getByID(id: string) {
    const model = await this.modles.getByID(id);
    const ConfigTC = composeWithMongoose(model, {});

    for (const field of this.queryFns) {
      schemaComposer.Query.addFields({
        [field]: ConfigTC.getResolver(field),
      });
    }

    const graphqlSchema: GraphQLSchema = schemaComposer.buildSchema();
    return graphqlSchema;
  }
}
