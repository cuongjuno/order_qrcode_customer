import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';

import { DATE_DISPLAY, MONTH_DISPLAY } from '~constant/date';
import dateHelper from '~utils/dateHelper';

MyDatePicker.propTypes = {
  picker: PropTypes.string,
  disabledDate: PropTypes.func,
  size: PropTypes.oneOf(['large', 'middle', 'small', undefined]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

MyDatePicker.defaultProps = {
  disabledDate: () => false,
  size: undefined,
  picker: 'date',
  placeholder: 'dd/mm/yyyy',
  className: '',
};

function MyDatePicker({
  picker, size, disabledDate, placeholder, className, ...props
}) {
  return (
    <DatePicker
      suffixIcon={
        <i className={`ri-calendar-event-fill ${size !== 'small' ? 'fs-20' : ''} primary`} />
      }
      clearIcon={<i className={`ri-close-circle-fill ${size !== 'small' ? 'fs-20' : ''}`} />}
      placeholder={placeholder}
      format={(value) => dateHelper.formatDate(value, picker === 'date' ? DATE_DISPLAY : MONTH_DISPLAY)}
      size={size}
      showToday={false}
      picker={picker}
      disabledDate={disabledDate}
      className={className}
      {...props}
    />
  );
}

export default MyDatePicker;
