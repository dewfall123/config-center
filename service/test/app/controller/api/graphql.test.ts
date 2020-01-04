// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/api/graphql.test.ts', () => {
  const apiPrefix = '/api/graphql';

  it('/main', async () => {
    const keys = [ 'name', 'project' ];
    const res = await app
      .httpRequest()
      .get(`${apiPrefix}/main?query={
        findMany {
          ${keys.join(' ')}
        }
      }`);
    assert(res.body);
    const { body: { data } } = res;
    assert(data.findMany && data.findMany[0]);
    assert(Object.keys(data.findMany[0]).length === 2);
    for (const key of keys) {
      assert(data.findMany[0].hasOwnProperty(key));
    }
  });

  it('/checkurl', async () => {
    const res = await app
    .httpRequest()
    .get(`${apiPrefix}/main?query={
      findMany {
        ${keys.join(' ')}
      }
    }`);
    assert(res.body);
  });

});
