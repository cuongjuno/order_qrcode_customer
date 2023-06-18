import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import './MyTable.scss';

MyTable.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
  total: PropTypes.number,
  handleChangePage: PropTypes.func,
  onRow: PropTypes.func,
  pagingPosition: PropTypes.string,
  pageSize: PropTypes.number,
};

MyTable.defaultProps = {
  dataSource: [],
  onChange: () => {},
  onRow: () => {},
  pagingPosition: 'topright',
  pageSize: 20,
  total: 0,
  handleChangePage: () => {},
};

function MyTable({
  dataSource,
  columns,
  onChange,
  rowKey,
  total,
  handleChangePage,
  onRow,
  pagingPosition,
  pageSize,
  ...props
}) {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      rowKey={rowKey}
      scroll={{ y: 480, x: 1110 }}
      // scroll.x scale up with columns.width
      className="my-table"
      onRow={onRow}
      pagination={{
        showSizeChanger: false,
        total,
        position: [pagingPosition],
        pageSize,
        onChange: handleChangePage,
      }}
      {...props}
    />
  );
}

export default MyTable;
