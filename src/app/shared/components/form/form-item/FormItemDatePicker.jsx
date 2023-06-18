import React from 'react';
import { Form, Space } from 'antd';
import PropTypes from 'prop-types';

import MyDatePicker from '~components/datepicker';
import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

FormItemDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
};

FormItemDatePicker.defaultProps = {
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
};

function FormItemDatePicker({
  label,
  name,
  rules,
  dependencies,
  viewMode,
  customRender,
  ...props
}) {
  const valueEdit = useRenderValue(name, customRender, FORM_ITEM_TYPES.DATEPICKER);

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} {...props}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        <MyDatePicker className="w-192 pf-12" />
      )}
    </Form.Item>
  );
}

export default FormItemDatePicker;
