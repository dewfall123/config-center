import { queryFieldsById, queryPage } from '@/service/graphql';
import { request } from '@/utils';

type Fields = Record<string, any> | null;


export const queryPageById = async (
  _id: string,
  page: number = 1,
  perPage: number = 10,
  fields: Fields = null,
) => {
  if (!fields) {
    const fieldsResult = (await request(queryFieldsById(_id))) as {
      fields: Fields;
    };
    fields = fieldsResult.fields;
  }
  const { total, items } = (await request(
    queryPage(_id, Object.keys(fields || {}), page, perPage),
  )) as any;
  return { list: items, fields, total };
};
