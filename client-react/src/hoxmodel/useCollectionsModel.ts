import { useState, useEffect } from 'react';
import gqlServer from '@/service/graphql';

export interface ICollection {
  _id: string;
  meta: {
    name: string;
    describe?: string;
    icon?: string;
  };
}

const useCollections = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);

  const params = `query {
    findMany {
      _id
      meta {
        name
        describe
        icon
      }
    }
  }`;
  const id = 'main';
  const fetch = async () => {
    const res = (await gqlServer.gql(id, params)) as any;
    const collections = res.data.data.findMany as ICollection[];
    setCollections(collections);
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    collections,
    fetch,
  };
};

export default useCollections;
