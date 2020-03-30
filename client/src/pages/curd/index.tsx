import React from 'react';
import { useRequest } from '@umijs/hooks';
import { queryFieldsById, queryDataById } from '@/service/graphql';
import { match } from 'react-router';

interface CurdProps {
  match: match<{
    id: string;
  }>;
}

export default ({ match }: CurdProps) => {
  const _id = match.params.id;
  const { data: fields } = useRequest(queryFieldsById(_id));
  const { data } = useRequest(queryDataById(_id, Object.keys(fields)));
  return <div className="">{JSON.stringify(data)}</div>;
};
