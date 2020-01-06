// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/home.test.ts', () => {

  it('should assert', async () =>{
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('index!')
      .expect(200);
  });
});
