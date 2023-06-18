import React from 'react';
import { Modal } from 'antd';

import './Confirm.scss';

const { confirm } = Modal;

function useConfirm() {
  const showDeleteConfirm = ({ title, desc, onSubmit }) => {
    confirm({
      title,
      icon: null,
      content: desc,
      className: 'delete-confirm-modal',
      closeIcon: <i className="ri-close-line fs-30 white" />,
      closable: true,
      cancelButtonProps: {
        className: 'primary rounded-4 fw-700 fs-14 h-36 confirm-cancel-btn',
      },
      okButtonProps: {
        className: 'primary rounded-4 bg-error white fw-700 fs-14 h-36 confirm-ok-btn',
      },
      okType: 'danger',
      okText: '削除',
      cancelText: 'キャンセル',
      onOk: onSubmit,
    });
  };
  return showDeleteConfirm;
}

export default useConfirm;
