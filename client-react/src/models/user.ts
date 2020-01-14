import UserService from '../service/user';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';

export interface IUser {
  name: string;
  account: string;
}

export default {
  namespace: 'user',
  state: {
    name: '',
    account: '',
  },
  reducers: {
    setUser(state: IUser, user: IUser) {
      return user;
    },
  },
  effects: {
    *login(actions: AnyAction, { call, put }: EffectsCommandMap) {
      const user = yield call(UserService.login());
      yield put({
        type: 'setUser',
        payload: user,
      });
    },
  },
};
