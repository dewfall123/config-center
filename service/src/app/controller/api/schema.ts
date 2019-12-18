import { provide, controller, Context, post } from 'midway';

@provide()
@controller('/api/schema')
export class Schema {
  @post('/create')
  async create(ctx: Context) {
    const {} = ctx.request.body;
  }
}
