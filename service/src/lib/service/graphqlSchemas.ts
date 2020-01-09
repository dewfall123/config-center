import { provide, ScopeEnum, scope, inject } from 'midway';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { GraphQLSchema } from 'graphql';
const generateSchema = require('generate-schema');

import { Models, ISchemaConfig, ICollectionUrl } from '../model/models';
import { Schema } from 'mongoose';
import { Connections } from '../model/connections';

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
  private mutationFns = [
    // mutations
    'createOne',
    'createMany',
    'updateById',
    'updateOne',
    'updateMany',
    'removeById',
    'removeOne',
    'removeMany',
  ];

  @inject('Models')
  modles: Models;

  @inject('connections')
  connections: Connections;

  async getByID(id: string) {
    const model = await this.modles.getByID(id);
    const ConfigTC = composeWithMongoose(model, {});

    // query
    for (const field of this.queryFns) {
      schemaComposer.Query.addFields({
        [field]: ConfigTC.getResolver(field),
      });
    }
    // mutation
    for (const field of this.mutationFns) {
      schemaComposer.Mutation.addFields({
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

  async checkUrl(collectionUrl: ICollectionUrl): Promise<string> {
    const { url, dbName, collectionName } = collectionUrl;
    let conn;
    try {
      conn = await this.connections.getConn(`${url}/${dbName}`);
    } catch (err) {
      console.log(err);
      return `${url} is not a valid URL`;
    }
    const connectionList = await conn.db.listCollections().toArray();
    if (!connectionList.map(i => i.name).includes(collectionName)) {
      return `'${url}/${dbName}' or '${collectionName}' is invalid`;
    }
    return '';
  }

  private LIMIT = 1;

  async inferSchema(collectionUrl: ICollectionUrl) {
    const { url, dbName, collectionName } = collectionUrl;
    const conn = await this.connections.getConnWithoutCache(`${url}/${dbName}`);
    const mongoSchema = new Schema({});
    const model = conn.model(collectionName, mongoSchema);
    const docs = await model.find().limit(this.LIMIT);
    const originDocs = docs.map(i => {
      // @ts-ignore-next-line
      const fileds = { ...i._doc };
      const ignoreFields = ['_id', '__v'];
      for (const key of ignoreFields) {
        delete fileds[key];
      }
      return fileds;
    });
    const schema = generateSchema.mongoose(originDocs[0]);
    return schema;
  }
}
