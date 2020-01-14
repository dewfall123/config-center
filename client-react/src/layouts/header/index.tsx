import React from 'react';
import styles from './index.css';
import { ReactComponent as MenuIcon } from '@/assets/svg/menu.svg';
import User from './user';
import Menu from './menu';

export default function({ height = 100 }) {
  const style = { height: `${height}px` };
  return (
    <header
      className={styles.header}
      style={style}
    >
      <MenuIcon />
      <Menu />
      <User />
    </header>
  );
}
