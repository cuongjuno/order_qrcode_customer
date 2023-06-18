import React from 'react';
import { Form, Space } from 'antd';
import PropTypes from 'prop-types';

import MySelect from '~components/select';
import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

FormItemSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  showSearch: PropTypes.bool,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  inputProps: PropTypes.object,
};

FormItemSelect.defaultProps = {
  options: [],
  showSearch: false,
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
  inputProps: {},
};

function FormItemSelect({
  label,
  name,
  rules,
  dependencies,
  options,
  showSearch,
  viewMode,
  customRender,
  inputProps,
  ...props
}) {
  const valueEdit = useRenderValue(name, customRender, FORM_ITEM_TYPES.SELECT, options);

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} {...props}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        <MySelect options={options} allowClear showSearch={showSearch} {...inputProps} />
      )}
    </Form.Item>
  );
}

export default FormItemSelect;
