export const queryColls = {
  url: '/api/graphql/main',
  method: 'post',
  data: {
    query: `{
      findMany {
        _id
        collectionName
        meta {
          name
        }
      }
    }`,
  },
};

export const queryFieldsById = (_id: string) => {
  return {
    url: `/api/graphql/main`,
    method: 'post',
    data: {
      query: `{
        findById(_id: "${_id}") {
          fields
        }
      }`,
    },
  };
};

export const queryDataById = (_id: string, fields: string[]) => {
  return {
    url: `/api/graphql/${_id}`,
    method: 'post',
    data: {
      query: `{
        findMany{
          ${fields.join('\n')}
        }
      }`,
    },
  };
};
