import {
  Context,
  inject,
  config,
  EggAppConfig,
  controller,
  get,
  provide,
} from 'midway';

import { graphql } from 'graphql';

import { IGraphql } from '../../../interface';

@provide()
@controller('/api/graphql')
export class GraphQLController {
  @inject()
  ctx: Context;

  @config('dbConfig')
  config: EggAppConfig;

  @inject('GraphQLService')
  GraphQLService: IGraphql;

  @get('/')
  async index() {
    const schemaDef = this.config.schema;
    const graphqlSchema = this.GraphQLService.buildSchema('config', schemaDef);

    const query = this.ctx.query;
    const result = await graphql(graphqlSchema, query);
    this.ctx.body = result;
  }
}
