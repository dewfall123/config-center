import React from 'react';
import styles from './index.css';
import Collection from './components/collection';
import useCollectionsModel from '@/hoxmodel/useCollectionsModel';

const Home = () => {
  const { collections } = useCollectionsModel();

  const collectionsList = collections.map(collection => (
    <Collection collection={collection} key={collection._id} />
  ));

  return (
    <article className={styles.container}>
      <section className={styles.list}>
        {collectionsList}
      </section>
    </article>
  );
};

export default Home;
