import React, { useState, useEffect } from 'react';
import { useRequest, useMount } from '@umijs/hooks';
import { match } from 'react-router';
import { queryPageById } from './service';
import { Pagination, Table } from 'antd';
import { handleColumns } from './tableUtils';
import GridTable from './gridTable';
import Tree from './tree';
import { Fields } from './data';

interface CurdProps {
  match: match<{
    id: string;
  }>;
}

export default ({ match }: CurdProps) => {
  const _id = match.params.id;

  const [row, setRow] = useState([]);
  const [fields, setFields] = useState(null);
  const { data, loading, pagination, run } = useRequest(
    ({ current, pageSize }) => queryPageById(_id, current, pageSize, fields),
    {
      paginated: true,
      manual: true,
    },
  );

  useMount(async () => {
    run(pagination);
  });

  useEffect(() => {
    setFields(data?.fields);
  }, [data]);

  if (loading) {
    return 'loading';
  }
  if (!data || !fields) {
    return 'error';
  }
  const columns = handleColumns(data.fields);

  const handleRowClick = (rowIndex: number) => {
    setRow(data.list[rowIndex]);
  };
  return (
    <div className="py-10 px-20 flex h-full align-top">
      <div className="w-1/2 mx-4">
        <GridTable
          columns={columns}
          dataSource={data.list}
          onRowClick={handleRowClick}
        />
        <Pagination
          {...(pagination as any)}
          defaultCurrent={pagination.current}
          total={pagination.total}
          onShowSizeChange={pagination.onChange}
          style={{ marginTop: 16, textAlign: 'right' }}
          size="small"
        />
      </div>
      <div className="w-px h-full bg-gray-300 py-10 box-border flex-shrink-0"></div>
      <div className="w-1/2 mx-4 overflow-y-auto crollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
        <Tree data={row} fields={fields as unknown as Fields}/>
      </div>
    </div>
  );
};
