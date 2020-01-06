// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/api/graphql.test.ts', () => {
  const graphqlPrefix = '/api/graphql';
  let lastSchemaID = '';

  it('test query by main', async () => {
    app.mockCsrf();
    const keys = ['_id', 'collectionName', 'fields'];
    const res = await app
      .httpRequest()
      .post(`${graphqlPrefix}/main`)
      .send({
        query: `{
        findMany {
          ${keys.join(' ')}
        }
      }`,
      });
    assert(res.body);
    const {
      body: { data },
    } = res;
    assert(data.findMany && data.findMany[0]);
    assert(Object.keys(data.findMany[0]).length === keys.length);
    if (
      data.findMany.length > 1 &&
      data.findMany[data.findMany.length - 1]._id
    ) {
      lastSchemaID = data.findMany[data.findMany.length - 1]._id;
    }
    assert(lastSchemaID !== '');
    for (const key of keys) {
      assert(data.findMany[0].hasOwnProperty(key));
    }
    if (lastSchemaID) {
      const res = await app
        .httpRequest()
        .post(`${graphqlPrefix}/main`)
        .send({
          query: `mutation {
            removeById(_id: "${lastSchemaID}") {
              recordId
            }
          }`,
        });
      assert(res.body);
      const data = res.body.data;
      assert(data.removeById.recordId, lastSchemaID);
    }
  });
});
