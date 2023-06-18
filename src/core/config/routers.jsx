import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import PATH_URL from './pathURL';

const Layout = React.lazy(() => import('~app/layout'));
const Login = React.lazy(() => import('~app/login'));
const Order = React.lazy(() => import('~app/order'));

// scan
const ScanPage = React.lazy(() => import('~app/scan/ScanPage'));

// users
const UserProfile = React.lazy(() => import('~app/user-profile'));

// request
const Request = React.lazy(() => import('~app/request'));

// master
const MasterUser = React.lazy(() => import('~app/master/user'));
const MasterDriver = React.lazy(() => import('~app/master/driver'));
const MasterCar = React.lazy(() => import('~app/master/car'));
const MasterTransportCompany = React.lazy(() => import('~app/master/transport-company'));

const routes = createBrowserRouter([
  {
    path: PATH_URL.LOGIN,
    element: <Login />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: PATH_URL.SCAN_PAGE,
        element: <ScanPage />,
      },
      {
        path: PATH_URL.ORDER,
        element: <Order />,
      },
      {
        path: PATH_URL.PROFILE,
        element: <UserProfile />,
        handle: {
          crumb: 'ログイン者情報参照',
        },
      },
      {
        path: PATH_URL.REQUEST,
        element: <Request />,
      },
      {
        path: PATH_URL.USER_MASTER,
        element: <MasterUser />,
        handle: {
          crumb: 'ユーザマスタ',
        },
      },
      {
        path: PATH_URL.TRANSPORT_COMPANY_MASTER,
        element: <MasterTransportCompany />,
        handle: {
          crumb: '運送会社マスタ',
        },
      },
      {
        path: PATH_URL.DRIVER_MASTER,
        element: <MasterDriver />,
      },
      {
        path: PATH_URL.CAR_MASTER,
        element: <MasterCar />,
      },
    ],
  },
  {
    path: '/404',
    element: <>not found</>,
  },
  {
    path: '/*',
    element: <Navigate to="/" replace />,
  },
]);
export default routes;
