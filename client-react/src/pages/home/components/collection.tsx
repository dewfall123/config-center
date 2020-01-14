import React from 'react';
import { CardActions, Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { ICollection } from '../models/collection';

type collcetionProps = {
  collection: ICollection,
}

export default (props: collcetionProps) => {
  const collection = props.collection;

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom={true} variant="h5" component="h2">
            {collection.meta.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {collection.meta.describe}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
