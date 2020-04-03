import { Fields } from './data';

export const handleColumns = (fields: Fields) => {
  const columns = [];
  for (const key in fields) {
    columns.push({
      title: fields[key].name || key,
      dataIndex: key,
    });
  }
  return columns;
};
