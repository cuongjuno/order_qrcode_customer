import React, { useMemo } from 'react';
import { Form, Input, Space } from 'antd';
import PropTypes from 'prop-types';

import { FORM_ITEM_TYPES } from '../constant';

import useRenderValue from './hooks/useRenderValue';

import './FormItemTextField.scss';

FormItemTextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  viewMode: PropTypes.bool,
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  inputProps: PropTypes.object,
};

FormItemTextField.defaultProps = {
  type: FORM_ITEM_TYPES.INPUT,
  rules: [],
  dependencies: [],
  viewMode: false,
  customRender: null,
  inputProps: {},
};

function FormItemTextField({
  type,
  label,
  name,
  rules,
  dependencies,
  viewMode,
  customRender,
  inputProps,
  ...props
}) {
  const valueEdit = useRenderValue(name, customRender);

  const inputElement = useMemo(() => {
    switch (type) {
      case FORM_ITEM_TYPES.INPUT:
        return <Input {...inputProps} />;
      case FORM_ITEM_TYPES.PASSWORD:
        return (
          <Input.Password
            iconRender={(visible) => (visible ? 'パスワードを非表示' : 'パスワードを表示')}
            {...inputProps}
          />
        );
      case FORM_ITEM_TYPES.MEMO:
        return <Input.TextArea {...inputProps} />;
      default:
        return null;
    }
  }, []);

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} {...props}>
      {viewMode ? (
        <Space align="center" className="h-48 px-12 black-050">
          {valueEdit}
        </Space>
      ) : (
        inputElement
      )}
    </Form.Item>
  );
}

export default FormItemTextField;
