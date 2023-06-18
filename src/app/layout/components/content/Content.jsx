import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

function Content() {
  return (
    <Layout.Content className="bg-black-005">
      <Outlet />
    </Layout.Content>
  );
}

export default Content;
