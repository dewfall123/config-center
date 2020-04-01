import { Context, inject, controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/')
  async index() {
    this.ctx.set('Cache-Control', 'no-store')
    await this.ctx.render('index.html')
  }

}
