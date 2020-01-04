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

export interface ICollectionUrl {
  url: string;
  dbName: string;
  collectionName: string;
}

export interface ISchemaConfig extends ICollectionUrl, Document {
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
    const mongooseUrl = `${this.dbConfig.url}/${this.dbConfig.dbName}`;
    const mainConnection = await this.connections.getConn(mongooseUrl);
    const mongoSchema = new Schema(this.dbConfig.schema);
    const MainModel = mainConnection.model<ISchemaConfig>(
      this.dbConfig.collectionName,
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
    const model = connection.model<ISchemaConfig>(
      confDef.collectionName,
      mongoSchema,
    );
    this.cache[id] = model;
    return model;
  }

  getMainModel() {
    return this.getByID(this.MAIN_NAME);
  }
}
