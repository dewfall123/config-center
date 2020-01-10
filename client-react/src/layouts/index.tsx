import React from 'react';
import styles from './index.css';
import Header from './header';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
