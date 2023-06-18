import React from 'react';
import { Col, Form } from 'antd';
import PropTypes from 'prop-types';

import MySelect from '~components/select';

FormFilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  colProps: PropTypes.object,
  inputProps: PropTypes.object,
  showSearch: PropTypes.bool,
};

FormFilterSelect.defaultProps = {
  inputProps: {},
  colProps: {},
  options: [],
  showSearch: true,
};

function FormFilterSelect({
  label, name, options, colProps, inputProps, showSearch, ...props
}) {
  return (
    <Col {...colProps}>
      <div className="fw-700 fs-12 black-050 mb-6">{label}</div>
      <Form.Item noStyle label={label} name={name} {...props}>
        <MySelect
          options={options}
          allowClear
          className="w-full"
          showSearch={showSearch}
          {...inputProps}
        />
      </Form.Item>
    </Col>
  );
}

export default FormFilterSelect;
