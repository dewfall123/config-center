import { Method } from 'axios';

export const queryColls = {
  url: '/api/graphql/main',
  method: 'post' as Method,
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
    method: 'post' as Method,
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
    method: 'post' as Method,
    data: {
      query: `{
        findMany{
          ${fields.join('\n')}
        }
      }`,
    },
  };
};

export const queryPage = (
  _id: string,
  fields: string[],
  page: number = 1,
  perPage = 10,
) => {
  return {
    url: `/api/graphql/${_id}`,
    method: 'post' as Method,
    data: {
      query: `{
        pagination(page: ${page}, perPage: ${perPage}) {
          total: count
          items {
            ${fields.join('\n')}
          }
        }
      }`,
    },
  };
};
