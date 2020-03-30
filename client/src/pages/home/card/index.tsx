import React from 'react';
import { history } from 'umi'

interface CardProps {
    coll: Collection,
}

export default ({ coll }: CardProps) => {
    const divClassName = 'border border-gray-400 rounded-sm my-4 p-2 cursor-pointer';
    
    return (
        <div className={divClassName} onClick={() => history.push(`/curd/${coll._id}`)}>
            <p>{coll.collectionName}</p>
            <p>{coll._id}</p>
            <p>{coll.meta.name}</p>
        </div>
    );
};