import { IUser } from '../models/user';

export default {
  async login() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'userName',
          account: '007',
        } as IUser);
      });
    });
  },
};
