import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';
import ApiServer from '@/service/api';
import { MAIN } from '../components/constants';

export interface ICollection {
  _id: string;
  meta: {
    name: string,
    describe: string,
    icon: string,
  },
}

export interface ICollections {
  list: ICollection[],
}

export interface ICollectionsState {
  collections: ICollections,
}

export default {
  namespace: 'collections',
  state: {
    list: [],
  },
  reducers: {
    set(state: ICollection[], collections: ICollection[]) {
      return collections;
    },
  },
  effects: {
    *fetch(actions: AnyAction, { call, put }: EffectsCommandMap) {
      const query = `{
        findMany {
          _id
          meta
        }
      }`;
      const collections = yield call(ApiServer.graphql(MAIN, query));
      yield put({
        type: 'set',
        collections,
      });
    },
  },
};
