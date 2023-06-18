import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import inputHelper from '~utils/inputHelper';

MySelect.propTypes = {
  options: PropTypes.array.isRequired,
  size: PropTypes.oneOf(['large', 'middle', 'small', undefined]),
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  className: PropTypes.string,
};

MySelect.defaultProps = {
  size: undefined,
  placeholder: '',
  showSearch: false,
  filterOption: inputHelper.filterOptionDefault,
  className: '',
};

function MySelect({
  options, size, placeholder, showSearch, filterOption, className, ...props
}) {
  return (
    <Select
      suffixIcon={<i className="ri-arrow-down-s-line fs-20" />}
      clearIcon={<i className="ri-close-circle-fill fs-20 black-050 pos-absolute -top-4 -left-8" />}
      size={size}
      options={options}
      showSearch={showSearch}
      filterOption={filterOption}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

export default MySelect;
