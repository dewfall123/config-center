import React from 'react';
import styles from './index.css';
import { Avatar } from '@material-ui/core';

export default () => {
  return (
    <div className={styles.container}>
      <Avatar>{'T'}</Avatar>
      <span>{'张三'}</span>
    </div>
  );
};
