import axios from 'axios';

export default {
  async gql(id: string, query: string) {
    const res = await axios.request({
      method: 'POST',
      url: `/api/graphql/${id}`,
      data: {
        query,
      },
    });
    return res;
  },
};
