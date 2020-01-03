import { provide, controller, Context, post, inject } from 'midway';
import { GraphqlSchemas } from '../../../lib/service/graphqlSchemas';
import { CtxBody } from '../../../interface';
import { ISchemaConfig } from '../../../lib/model/models';

@provide()
@controller('/api/schema')
export class Schema {
  @inject('graphqlSchemas')
  graphqlSchemas: GraphqlSchemas;

  @post('checkurl')
  async checkurl(ctx: Context) {
    const { url } = ctx.request.body;
    const isUrlCorrect = await this.graphqlSchemas.checkUrl(url);
    ctx.body = {
      message: isUrlCorrect ? '' : 'url is not valid!',
      success: isUrlCorrect,
      data: '',
    } as CtxBody;
  }

  @post('/create')
  async create(ctx: Context) {
    const schemaConfig = ctx.request.body as ISchemaConfig;
    const isUrlCorrect = this.graphqlSchemas.checkUrl(schemaConfig.url);
    if (!isUrlCorrect) {
      ctx.body = {
        message: 'url is not valid!',
        success: false,
        data: '',
      } as CtxBody;
    }
    const doc = await this.graphqlSchemas.createSchema(schemaConfig);
    ctx.body = {
      success: true,
      data: doc,
      message: '',
    } as CtxBody;
  }
}
