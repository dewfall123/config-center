import React from 'react';
import { queryColls } from '@/service/graphql';
import { useRequest } from '@umijs/hooks';
import Card from './card';

export default () => {
  const { data } = (useRequest(queryColls) as unknown) as CollectionQueryResult;
  const list = data
    ? data.map(coll => <Card key={coll._id} coll={coll}></Card>)
    : '';
  return (
    <div className="flex justify-center">
      <div className="container">{list}</div>
    </div>
  );
};
