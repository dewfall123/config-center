import React from 'react';

interface CardProps {
    coll: Collection,
}

export default ({ coll }: CardProps) => {
    const divClassName = '';
    return (
        <div className={divClassName}>
            <p>{coll.collectionName}</p>
            <p>{coll._id}</p>
            <p>{coll.meta.name}</p>
        </div>
    );
};