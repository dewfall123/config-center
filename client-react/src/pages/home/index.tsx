import React, { FC } from 'react';
import styles from './index.css';
import { connect } from 'dva';
import { ICollectionsState } from './models/collection';
import Collection from './components/collection';

const Home: FC<ICollectionsState> = props => {
  const { collections = { list: [] } } = props;
  const collectionsList = collections.list.map(collection => (
    <Collection collection={collection}/>
  ));

  return (
    <div className={styles.container}>
      {collectionsList}
    </div>
  );
};

const mapStateToProps = ({ collections }: ICollectionsState) => ({ collections });

export default connect(mapStateToProps)(Home);
