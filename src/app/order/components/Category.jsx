import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import CategoryTabPane from './CategoryTabPane';

Category.propTypes = {
  items: PropTypes.array.isRequired,
};

function Category({ items }) {
  return (
    <Tabs
      defaultActiveKey="1"
      style={{
        height: 220,
      }}
      items={items.map(({ label, value }) => ({
        label,
        key: value,
        children: <CategoryTabPane items={value} />,
      }))}
    />
  );
}

export default Category;
