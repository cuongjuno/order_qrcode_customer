import React from 'react';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';

import './PopoverOptions.scss';

PopoverOptions.propTypes = {
  open: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};

function PopoverOptions({
  open, onEditClick, onDeleteClick, onOpenChange,
}) {
  return (
    <Popover
      open={open}
      overlayClassName="popover-options"
      arrow={false}
      className="popover-custom"
      placement="bottomRight"
      trigger="click"
      onOpenChange={onOpenChange}
      autoAdjustOverflow={false}
      content={(
        <div className="dis-flex flex-column">
          <Button
            type="text"
            className="actions-btn primary text-start fw-500"
            onClick={onEditClick}
          >
            編集
          </Button>
          <hr className="split-line" />
          <Button
            type="text"
            className="actions-btn text-start fw-500"
            danger
            onClick={onDeleteClick}
          >
            削除
          </Button>
        </div>
      )}
    >
      <Button type="text" icon={<i className="ri-more-2-fill" />} />
    </Popover>
  );
}

export default PopoverOptions;
