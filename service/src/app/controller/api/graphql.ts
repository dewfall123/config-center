import {
  Context,
  inject,
  controller,
  provide,
  post,
} from 'midway';

import { graphql } from 'graphql';

import { GraphqlSchemas } from '../../../lib/service/graphqlSchemas';

@provide()
@controller('/api/graphql')
export class GraphQLController {
  @inject('graphqlSchemas')
  graphqlSchemas: GraphqlSchemas;

  @post('/:id')
  async index(ctx: Context) {
    const { id } = ctx.params;
    const { query } = ctx.request.body;

    const graphqlSchema = await this.graphqlSchemas.getByID(id);
    const result = await graphql(graphqlSchema, query);
    ctx.body = result;
  }
}
