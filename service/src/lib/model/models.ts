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
import { IConnections } from '../../interface';

export interface IConfDef extends Document {
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
  connections: IConnections;

  private cache: { [propsName: string]: Model<IConfDef> } = {};

  public MAIN_NAME = 'main';

  @init()
  async init() {
    const mainConnection = await this.connections.getConn(this.dbConfig.url);
    const mongoSchema = new Schema(this.dbConfig.schema);
    const MainModel = mainConnection.model<IConfDef>(
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
    const confDef = (document as unknown) as IConfDef;
    // TODO
    const connection = await this.connections.getConn(confDef.url);
    const mongoSchema = new Schema(confDef.fields);
    const model = connection.model<IConfDef>(confDef.name, mongoSchema);
    this.cache[id] = model;
    return model;
  }
}
