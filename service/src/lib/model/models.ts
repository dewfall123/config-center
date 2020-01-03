import {
  inject,
  provide,
  config,
  EggAppConfig,
  init,
  scope,
  ScopeEnum,
} from 'midway';
import { Document, Model, Schema } from 'mongoose';
import { Connections } from './connections';
import { MongoClient } from 'mongodb';

export interface ISchemaConfig extends Document {
  url: string;
  name: string;
  fields: any;
  project: string;
  auth: string[];
}

@scope(ScopeEnum.Singleton)
@provide('Models')
export class Models {
  @config('dbConfig')
  dbConfig: EggAppConfig;

  @inject('connections')
  connections: Connections;

  private cache: { [propsName: string]: Model<ISchemaConfig> } = {};

  public MAIN_NAME = 'main';

  @init()
  async init() {
    const mainConnection = await this.connections.getConn(this.dbConfig.url);
    const mongoSchema = new Schema(this.dbConfig.schema);
    const MainModel = mainConnection.model<ISchemaConfig>(
      this.dbConfig.collection,
      mongoSchema,
    );
    this.cache[this.MAIN_NAME] = MainModel;
  }

  async getByID(id: string): Promise<Model<Document> | never> {
    if (this.cache[id]) {
      return this.cache[id];
    }
    const mainModel = this.cache[this.MAIN_NAME];
    const document = await mainModel.findOne({ _id: id });
    if (!document) {
      throw new Error(`cannot found model by this id: ${id}!`);
    }
    const confDef = (document as unknown) as ISchemaConfig;
    // TODO
    const connection = await this.connections.getConn(confDef.url);
    const mongoSchema = new Schema(confDef.fields);
    const model = connection.model<ISchemaConfig>(confDef.name, mongoSchema);
    this.cache[id] = model;
    return model;
  }

  getMainModel() {
    return this.getByID(this.MAIN_NAME);
  }

  async checkUrl(url: string): Promise<boolean> {
    try {
      const connection = await this.connections.getConn(this.dbConfig.url);
      return !!connection;
    } catch {
      return false;
    }
  }

  async inferSchema(url: string, dbName: string, collectionName) {
    const conn = new MongoClient(url);
    const db = conn.db(dbName);
    // recent 10 documents
    conn.close();
  }
}
