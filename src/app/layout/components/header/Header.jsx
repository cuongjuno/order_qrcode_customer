import React from 'react';
import {
  Col, Divider, Layout, Row,
} from 'antd';

import { IconUser } from '~app/layout/static/icons';

import './Header.scss';

function Header() {
  return (
    <Layout.Header className="bg-black-005 pos-sticky pa-0 top-0 layout-header">
      <Row justify="space-between" align="middle" className="header-content w-full px-16">
        <Col>
          <IconUser />
        </Col>
        <Col className="fs-20 fw-500">Bàn 15</Col>
        <Col>
          <IconUser />
        </Col>
      </Row>
      <Divider className="ma-0" />
    </Layout.Header>
  );
}

export default Header;
