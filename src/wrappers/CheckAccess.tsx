import type { FC } from 'react';
import React from 'react';
import { Redirect } from 'umi';

const CheckFirst: FC = ({ children }) => {
  return <Redirect to="/" />;
  // const firstLogin = storage.get('firstLogin');
  // if (firstLogin === 1) {
  //   return <Redirect to="/withHeader/firstLogin" />;
  // }
  // return <>{children}</>;
};

export default CheckFirst;
