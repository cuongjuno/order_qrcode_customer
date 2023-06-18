import React from 'react';
import { Form, Radio, Space } from 'antd';
import PropTypes from 'prop-types';

import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

FormItemRadio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  inputProps: PropTypes.object,
};

FormItemRadio.defaultProps = {
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
  inputProps: {},
};

function FormItemRadio({
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
  const valueEdit = useRenderValue(name, customRender, FORM_ITEM_TYPES.RADIO, options);

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} {...props}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        <Radio.Group options={options} {...inputProps} />
      )}
    </Form.Item>
  );
}

export default FormItemRadio;
