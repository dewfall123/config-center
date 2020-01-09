// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/api/graphql.test.ts', () => {
  const graphqlPrefix = '/api/graphql';
  let lastSchemaID = '';
  let fields: string[] = [];
  const keys = ['_id', 'collectionName', 'fields'];

  // 检查结果 字段不能多也不能少
  function checkFields(keys: string[], result: any) {
    if (Object.keys(result).length !== keys.length) {
      return false;
    }
    for (const key of keys) {
      if (!result.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  before(async () => {
    const keys = ['_id', 'fields'];
    const res = await app
      .httpRequest()
      .post(`${graphqlPrefix}/main`)
      .send({
        query: `query {
        findOne(skip: 1) {
          ${keys.join(' ')}
        }
      }`,
      });
    const data = res.body.data.findOne;
    assert(checkFields(keys, data));
    lastSchemaID = data._id;
    fields = Object.keys(data.fields);
  });

  it('test query by main', async () => {
    app.mockCsrf();
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
    assert(Object.keys(data.findMany[0]).length === keys.length);
    assert(checkFields(keys, data.findMany[0]));
  });

  it('test query findMany', async () => {
    const keys = fields;
    const res = await app
      .httpRequest()
      .post(`${graphqlPrefix}/${lastSchemaID}`)
      .send({
        query: `query {
          findMany(limit: 1) {
            ${keys.join(' ')}
          }
        }`,
      });
    const data = res.body.data.findMany;
    assert(checkFields(keys, data[0]));
  });

  it('test mutation byId', async () => {
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
  });
});
