import React from 'react';
import Header from './header';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import styles from './index.css';
import { HEADER_HEIGHT } from './constant';

const BasicLayout: React.FC = props => {
  const style = { top: `${HEADER_HEIGHT}px` };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header height={HEADER_HEIGHT} />
        <div className={styles.body} style={style}>
          {props.children}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default BasicLayout;
