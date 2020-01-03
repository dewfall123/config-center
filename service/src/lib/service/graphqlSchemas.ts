import { provide, ScopeEnum, scope, inject } from 'midway';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { GraphQLSchema } from 'graphql';

import { Models, ISchemaConfig } from '../model/models';

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

  checkUrl: (url: string) => Promise<boolean>;

  async getByID(id: string) {
    this.checkUrl = this.modles.checkUrl;
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

  async createSchema(schemaConfig: ISchemaConfig) {
    const mainModel = await this.modles.getMainModel();
    const doc = await mainModel.insertMany(schemaConfig);
    return doc;
  }
}
