// @ts-ignore
const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/api/graphql.test.ts', () => {
  const apiPrefix = '/api/graphql';

  it('should main query/', async () => {
    const res = await app
      .httpRequest(`${apiPrefix}/main`, {
        data: {
          query: `
        {
            findMany() {
                id
                project
                name
              }
            }
    `,
        },
      });
    assert(res);
    assert(res.body.data);
    console.log(res.body.data);
  });
});
