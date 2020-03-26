import React from 'react';
import { UseAPIProvider } from '@umijs/use-request';
import { request } from '@/utils';

export default ({ children }: any) => {
  return (
    <UseAPIProvider
      value={{
        requestMethod: request,
      }}
    >
      {children}
    </UseAPIProvider>
  );
};
