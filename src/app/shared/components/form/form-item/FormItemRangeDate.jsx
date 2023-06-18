import React from 'react';
import { Form, Space } from 'antd';
import PropTypes from 'prop-types';

import MyDatePicker from '~components/datepicker';
import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

FormItemRangeDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.array.isRequired,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

FormItemRangeDate.defaultProps = {
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
};

function FormItemRangeDate({
  label, name, rules, dependencies, viewMode, customRender,
}) {
  const valueEdit = useRenderValue(name, customRender, FORM_ITEM_TYPES.RANGE_DATE);

  return (
    <Form.Item label={label}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        <>
          <Form.Item
            className="border-b-0 dis-inline-block py-0"
            name={name[0]}
            rules={rules[0]}
            dependencies={dependencies[0]}
          >
            <MyDatePicker className="w-192 pf-12" />
          </Form.Item>
          <span className="mx-12 mt-10 dis-inline-block">〜</span>
          <Form.Item
            className="border-b-0 dis-inline-block py-0"
            name={name[1]}
            rules={rules[1]}
            dependencies={dependencies[1]}
          >
            <MyDatePicker className="w-192 pl-12" />
          </Form.Item>
        </>
      )}
    </Form.Item>
  );
}

export default FormItemRangeDate;
