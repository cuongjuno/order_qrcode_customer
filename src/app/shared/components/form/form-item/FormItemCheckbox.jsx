import React from 'react';
import { Checkbox, Form, Space } from 'antd';
import PropTypes from 'prop-types';

import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

FormItemCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  inputProps: PropTypes.object,
};

FormItemCheckbox.defaultProps = {
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
  inputProps: {},
};

function FormItemCheckbox({
  label,
  name,
  rules,
  dependencies,
  options,
  viewMode,
  customRender,
  inputProps,
  ...props
}) {
  const valueEdit = useRenderValue(name, customRender, FORM_ITEM_TYPES.CHECKBOX, options);

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} {...props}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        <Checkbox.Group options={options} {...inputProps} />
      )}
    </Form.Item>
  );
}

export default FormItemCheckbox;
