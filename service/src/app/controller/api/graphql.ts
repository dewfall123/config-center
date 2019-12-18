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

import { IGraphqlSchemas } from '../../../interface';

@provide()
@controller('/api/graphql')
export class GraphQLController {

  @config('dbConfig')
  config: EggAppConfig;

  @inject('graphqlSchemas')
  GraphQLService: IGraphqlSchemas;

  @get('/:project/:collection')
  async index(ctx: Context) {
    const { project, collection } = ctx.params;
    
    const result = await graphql(graphqlSchema, query);
    this.ctx.body = result;
  }
}
