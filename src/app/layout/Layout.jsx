/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout as LayoutAntd } from 'antd';

import PATH_URL from '~core/config/pathURL';
import { cache, sessionCache } from '~utils/cache';

import Content from './components/content';
import Header from './components/header';

import './Layout.scss';

function Layout() {
  // const navigate = useNavigate();
  // const token = cache.get('token') || sessionCache.get('token');

  // useEffect(() => {
  //   if (!token) {
  //     navigate(PATH_URL.LOGIN);
  //   }
  // }, []);

  return (
    <LayoutAntd className="layout-container">
      <LayoutAntd className="layout-content-wrapper ">
        <Header />
        <Content />
      </LayoutAntd>
    </LayoutAntd>
  );
}

export default Layout;
