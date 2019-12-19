import {
  Context,
  inject,
  controller,
  get,
  provide,
} from 'midway';

import { graphql } from 'graphql';

import { GraphqlSchemas } from '../../../lib/service/graphqlSchemas';

@provide()
@controller('/api/graphql')
export class GraphQLController {
  @inject('graphqlSchemas')
  graphqlSchemas: GraphqlSchemas;

  @get('/:id')
  async index(ctx: Context) {
    const { id } = ctx.params;
    const { query } = ctx.query;

    const graphqlSchema = await this.graphqlSchemas.getByID(id);
    const result = await graphql(graphqlSchema, query);
    ctx.body = result;
  }
}
