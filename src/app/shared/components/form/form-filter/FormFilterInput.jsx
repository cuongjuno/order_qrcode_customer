import React from 'react';
import { Col, Form, Input } from 'antd';
import PropTypes from 'prop-types';

FormFilterInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  colProps: PropTypes.object,
  inputProps: PropTypes.object,
};

FormFilterInput.defaultProps = {
  inputProps: {},
  colProps: {},
};

function FormFilterInput({
  label, name, colProps, inputProps, ...props
}) {
  return (
    <Col {...colProps}>
      <div className="fw-700 fs-12 black-050 mb-6">{label}</div>
      <Form.Item noStyle label={label} name={name} {...props}>
        <Input {...inputProps} />
      </Form.Item>
    </Col>
  );
}

export default FormFilterInput;
