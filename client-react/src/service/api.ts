import axios from 'axios';

export default {
  async graphql(id: string, query: string) {
    const res = await axios.request({
      method: 'POST',
      url: `/api/graphql/${query}`,
      data: {
        query,
      },
    });
    return res;
  },
};
