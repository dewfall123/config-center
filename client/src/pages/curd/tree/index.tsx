import React from 'react';
import { levelMargin } from './constants';
import Input from './input';
import { Fields } from '../data';

interface TreeProps {
  data: any;
  fields: Fields,
  onSave?: () => void;
}

const conputeArray = (data: any[], fields: Fields, deep: number) => {
  return (
    <>
      <span>[</span>
      <br />
      {data.map((item, index) => (
        <div style={{ marginLeft: `${levelMargin}px` }} key={index}>
          {computeTree(item, fields[index || 0], deep + 1, index)}
        </div>
      ))}
      <div>]</div>
    </>
  );
};

const computeObject = (data: Record<string, any>, fields: Fields, deep: number) => {
  return (
    <>
      <span>{'{'}</span>
      <br />
      {Object.keys(data).map((key: string) => (
        <div style={{ marginLeft: `${levelMargin}px` }} key={key}>
          <span className="pr-2">{key}:</span>
          {computeTree((data as any)[key], fields[key] ,deep + 1)}
        </div>
      ))}
      <div>{'}'}</div>
    </>
  );
};

const computeTree = (data: NonNullable<unknown>, fields: Fields, deep = 0, key: any = null) => {
  let content;
  if (Array.isArray(data)) {
    content = conputeArray(data, fields, deep);
  } else if (typeof data === 'object' && data !== null) {
    content = computeObject(data, fields, deep);
  } else {
    return (<Input value={String(data)}></Input>);
  }
  return <span key={key !== null ? key : undefined} >{content}</span>;
};

export default ({ data, fields ,onSave }: TreeProps) => {
  const Tree = computeTree(data, fields);
  return <div className="">{Tree}</div>;
};
