import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Avatar, CardHeader } from '@material-ui/core';
import { ICollection } from '@/hoxmodel/useCollectionsModel';
import styles from './collection.css';

type collcetionProps = {
  collection: ICollection,
}

export default (props: collcetionProps) => {
  const collection = props.collection;

  const avatar = <Avatar src={collection.meta.icon} className={styles.header}/>;

  return (
    <Card>
      <CardActionArea>
        <CardHeader avatar={avatar} title={collection.meta.name} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
            {collection.meta.describe}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
