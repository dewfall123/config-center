import { provide, controller, Context, post, inject } from 'midway';
import { GraphqlSchemas } from '../../../lib/service/graphqlSchemas';
import { CtxBody } from '../../../interface';
import { ISchemaConfig, ICollectionUrl } from '../../../lib/model/models';

@provide()
@controller('/api/schema')
export class Schema {
  @inject('graphqlSchemas')
  graphqlSchemas: GraphqlSchemas;

  @post('/checkurl')
  async checkurl(ctx: Context) {
    const collectionUrl = ctx.request.body as ICollectionUrl;

    const invalidMsg = await this.graphqlSchemas.checkUrl(collectionUrl);
    if (invalidMsg) {
      ctx.body = {
        message: invalidMsg,
        success: false,
        data: '',
      } as CtxBody;
      return;
    }
    const schema = await this.graphqlSchemas.inferSchema(collectionUrl);
    ctx.body = {
      message: '',
      success: true,
      data: schema
    } as CtxBody;
  }

  @post('/create')
  async create(ctx: Context) {
    const schemaConfig = ctx.request.body as ISchemaConfig;
    const collectionUrl = {
      url: schemaConfig.url,
      dbName: schemaConfig.dbName,
      collectionName: schemaConfig.collectionName,
    } as ICollectionUrl;
    const invalidMsg = await this.graphqlSchemas.checkUrl(collectionUrl);
    if (invalidMsg) {
      ctx.body = {
        message: invalidMsg,
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
