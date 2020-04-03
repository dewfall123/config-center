interface Collection {
  _id: string;
  collectionName: string;
  meta: {
    name?: string;
    describe?: string;
    icon?: string;
  };
  fields: Record<string, Record<string, any> | string>;
}

interface CollectionQueryResult {
  data: Collection[],
}
