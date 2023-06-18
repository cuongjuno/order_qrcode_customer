import React from 'react';
import { Link } from 'react-router-dom';

import PATH_URL from '~core/config/pathURL';

const useMenuList = () => {
  const menuList = [
    {
      key: '1',
      icon: <i className="ri-route-fill" />,
      label: <Link to={PATH_URL.HOME}>Tổng quan</Link>,
    },
    {
      key: '2',
      icon: <i className="ri-user-line" />,
      label: <Link to={PATH_URL.REQUEST}>Quản lý tài khoản</Link>,
    },
    {
      key: '3',
      icon: <i className="ri-home-heart-line" />,
      label: <Link to={PATH_URL.REQUEST}>Quản lý kho</Link>,
    },
    {
      key: '4',
      icon: <i className="ri-customer-service-2-line" />,
      label: <Link to={PATH_URL.REQUEST}>Quản lý khách hàng</Link>,
    },
    {
      key: '5',
      icon: <i className="ri-article-line" />,
      label: <Link to={PATH_URL.REQUEST}>Quản lý đơn hàng</Link>,
    },
    {
      key: '6',
      icon: <i className="ri-pie-chart-line" />,
      label: <Link to={PATH_URL.REQUEST}>Báo cáo-Thống kê</Link>,
    },
  ];

  return menuList;
};

export default useMenuList;
