import React, { useEffect } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { FORM_ITEM_TYPES } from './constant';
import {
  FormItemCheckbox,
  FormItemDatePicker,
  FormItemRadio,
  FormItemRangeDate,
  FormItemSelect,
  FormItemTextField,
} from './form-item';

import './BaseForm.scss';

BaseForm.propTypes = {
  form: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onValuesChange: PropTypes.func,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  labelAlign: PropTypes.string,
  labelCol: PropTypes.object,
  className: PropTypes.string,
  viewMode: PropTypes.bool,
};

BaseForm.defaultProps = {
  initialValues: {},
  handleSubmit: () => {},
  onValuesChange: () => {},
  size: 'large',
  labelAlign: 'left',
  labelCol: { flex: '220px' },
  className: '',
  viewMode: false,
};

function BaseForm({
  form,
  items,
  initialValues,
  handleSubmit,
  size,
  labelAlign,
  labelCol,
  className,
  viewMode,
  onValuesChange,
}) {
  const renderItems = () => items.map(({ noView, noEdit, ...item }) => {
    if (noView && viewMode) {
      return null;
    }
    if (noEdit && !viewMode) {
      return null;
    }
    switch (item.type) {
      case FORM_ITEM_TYPES.INPUT:
        return <FormItemTextField key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.PASSWORD:
        return <FormItemTextField key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.MEMO:
        return <FormItemTextField key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.SELECT:
        return <FormItemSelect key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.RADIO:
        return <FormItemRadio key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.CHECKBOX:
        return <FormItemCheckbox key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.DATEPICKER:
        return <FormItemDatePicker key={item.label} viewMode={viewMode} {...item} />;
      case FORM_ITEM_TYPES.RANGE_DATE:
        return <FormItemRangeDate key={item.label} viewMode={viewMode} {...item} />;
      default:
        return null;
    }
  });

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onValuesChange={onValuesChange}
      labelAlign={labelAlign}
      labelCol={labelCol}
      labelWrap
      size={size}
      className={`base-form fw-500 ${className} ${viewMode ? 'view-mode' : ''}`}
      autoComplete="off"
    >
      {renderItems()}
    </Form>
  );
}

export default BaseForm;
