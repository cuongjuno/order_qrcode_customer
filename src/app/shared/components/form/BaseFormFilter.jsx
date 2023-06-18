import React, { useEffect } from 'react';
import {
  Button, Col, Form, Row,
} from 'antd';
import PropTypes from 'prop-types';

import objectHelper from '~utils/objectHelper';

import { FORM_FILTER_TYPES } from './constant';
import { FormFilterInput, FormFilterSelect } from './form-filter';

import './BaseFormFilter.scss';

BaseFormFilter.propTypes = {
  form: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  setParamsQuery: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  rowProps: PropTypes.object,
  className: PropTypes.string,
};

BaseFormFilter.defaultProps = {
  initialValues: {},
  size: 'middle',
  rowProps: {
    gutter: [16, 0],
  },
  className: '',
};

function BaseFormFilter({
  items, initialValues, setParamsQuery, size, rowProps, className,
}) {
  const [form] = Form.useForm();
  const renderItems = () => items.map((item) => {
    switch (item?.type) {
      case FORM_FILTER_TYPES.INPUT:
        return <FormFilterInput key={item.label} {...item} />;
      case FORM_FILTER_TYPES.SELECT:
        return <FormFilterSelect key={item.label} {...item} />;
      default:
        return null;
    }
  });

  const handleFilter = (values) => {
    setParamsQuery((pre) => ({ ...pre, ...objectHelper.trim(values), page: 1 }));
  };

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <Row className="base-form-filter bg-white pa-20 rounded-4" gutter={[16, 0]} wrap={false}>
      <Col flex="auto">
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={handleFilter}
          size={size}
          className={`fw-500 ${className}`}
        >
          <Row {...rowProps}>{renderItems()}</Row>
        </Form>
      </Col>
      <Col flex="130px">
        <Button onClick={() => form.submit()} className="w-full fw-700 primary mt-24">
          <i className="ri-search-line fs-14 mr-8" />
          絞り込む
        </Button>
      </Col>
    </Row>
  );
}

export default BaseFormFilter;
