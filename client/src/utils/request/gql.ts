import { AxiosResponse, AxiosRequestConfig } from 'axios';
import gql from 'graphql-tag'
import { IPureAxiosResult } from './index';

export const isGraphqlQuery = (options: AxiosRequestConfig) => {
  return options.url?.startsWith('/api/graphql');
}

export const handleGrapgqlResponse = (response: AxiosResponse) => {
  if (response.data.error as []) {
    const error = response.data.error.map((e: any) => e.message).join('\n');
    return Promise.reject(error);
  }
  const gqlParams = JSON.parse(response.config.data).query;
  const gqlAst = gql`${gqlParams}`;
  const gqlMethods = gqlAst.definitions.map((def: any) => {
    const selections = def.selectionSet.selections.map((sel: any) => sel.name.value);
    return selections;
  }).flat();
  const data = response.data.data[gqlMethods[0]];
  return data;
}
