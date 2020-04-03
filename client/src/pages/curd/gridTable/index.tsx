import React from 'react';
import {} from 'antd';

interface GridTableProps {
  columns: {
    title: string;
    dataIndex: string;
  }[];
  dataSource: any[];
  onRowClick?: (rowIndex: number) => void;
  onColClick?: (colIndex: number) => void;
  onCellClick?: (rowIndex: number, colIndex: number) => void;
}

export default ({
  columns,
  dataSource,
  onRowClick,
  onCellClick,
  onColClick,
}: GridTableProps) => {
  const TableHeader = columns.map((col, index) => (
    <p key={`header-${index}`}>
      <span>{col.title}</span>
    </p>
  ));

  const handleClick = (rowIndex: number, colIndex: number) => {
    onRowClick && onRowClick(rowIndex);
    onColClick && onColClick(rowIndex);
    onCellClick && onCellClick(rowIndex, colIndex);
  };

  const TableContent = dataSource
    .map((data, rowIndex) =>
      columns.map(({ dataIndex }, colIndex) => (
        <p
          key={`row-${rowIndex}-${colIndex}`}
          className="w-full overflow-hidden cursor-pointer hover:bg-blue-200 whitespace-no-wrap"
          onClick={() => handleClick(rowIndex, colIndex)}
        >
          <span>{String(data[dataIndex] || '')}</span>
        </p>
      )),
    )
    .flat();

  const colNum = Object.keys(columns).length;
  const rowNum = dataSource.length;

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${colNum}, 1fr)`,
    gridTemplateRows: `repeat(${rowNum + 1}, 1fr)`,
    justifyItems: 'start',
    alignItems: 'center',
  };
  return (
    <div style={style}>
      {TableHeader}
      {TableContent}
    </div>
  );
};
