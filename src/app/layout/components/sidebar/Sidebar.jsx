import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';

import useMenuList from '~app/layout/hooks/useMenuList';
import { IconArrowLeft } from '~app/layout/static/icons';

import getSelectedKey from './utils';

import './Sidebar.scss';

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

function Sidebar({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const menuList = useMenuList();

  const selectedKey = getSelectedKey(pathname, menuList);

  const expandIcon = ({ isOpen }) => <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line`} />;

  return (
    <div className="layout-sidebar overflow-hidden pos-fixed left-0">
      <Layout.Sider trigger={null} collapsible collapsed={collapsed} width={256} className="h-full">
        <div
          className={`dis-flex jc-center ai-center pa-14 ${
            collapsed ? '' : 'logo-wrapper-collapsed'
          }`}
        >
          <div className={`logo-icon ${collapsed ? 'w-0' : 'w-full'}`}>
            <p className="fs-20 white w-full text-center">{collapsed ? '' : 'Quản lý nhà thuốc'}</p>
          </div>
          <div
            className={`dis-flex jc-center ai-center arrow-icon cursor-pointer h-fit ${
              collapsed ? 'right-active' : ''
            }`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <IconArrowLeft />
          </div>
        </div>
        <Menu
          selectable
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuList}
          expandIcon={expandIcon}
          className="menu-bar fs-18 fw-500 mt-10 overflow-auto white"
        />
      </Layout.Sider>
    </div>
  );
}

export default Sidebar;
