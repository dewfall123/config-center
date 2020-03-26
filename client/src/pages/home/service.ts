export const queryCollections = {
  url: '/api/graphql/main',
  method: 'post',
  data: {
    query: '{findMany{collectionName _id meta { name } }}',
  },
};
