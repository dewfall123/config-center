import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { queryCollections } from './service';
import { useRequest } from '@umijs/hooks';
import Card from './card';

export default () => {
  const { data } = (useRequest(
    queryCollections,
  ) as unknown) as CollectionQueryResult;

  const list = data ? data.findMany.map(coll => <Card coll={coll}></Card>) : '';
  return <div>{list}</div>;
};
