// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/api/graphql.test.ts', () => {
  const schemaPrefix = '/api/schema';
  it('test /checkurl', async () => {
    const res = await app
      .httpRequest()
      .post(`${schemaPrefix}/checkurl`)
      .send({
        url: 'mongodb://172.25.100.24:27017',
        dbName: 'teleWall_dev',
        collectionName: 'users',
      });
    assert(res.body);
    assert(res.body.success === true);
    assert.deepEqual(res.body.data.pwd.type, 'String');
    // const data = res.body.data;
  });

  it('test /create', async () => {
    const res = await app
      .httpRequest()
      .post(`${schemaPrefix}/create`)
      .send({
        url: 'mongodb://172.25.100.24:27017',
        dbName: 'teleWall_dev',
        collectionName: 'users',
        fields: {
          initialPwd: {
            type: 'String',
          },
          pwd: {
            type: 'String',
          },
          userId: {
            type: 'String',
          },
          cdsAuthority: {
            type: ['String'],
          },
        },
      });
    assert(res.body);
    assert(res.body.success, true);
  });
});
