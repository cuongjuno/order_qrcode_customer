import React from 'react';
import { Button, Modal, Row } from 'antd';
import PropTypes from 'prop-types';

import MODAL_TYPE from './constant';

MyModal.propTypes = {
  type: PropTypes.oneOf([MODAL_TYPE.TYPE_1, MODAL_TYPE.TYPE_2]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  children: PropTypes.node,
  isShowModal: PropTypes.bool.isRequired,
};

MyModal.defaultProps = {
  title: '',
  subTitle: '',
  okText: '',
  cancelText: '',
  children: '',
  type: null,
};

function MyModal({
  children,
  type,
  title,
  subTitle,
  handleOk,
  handleCancel,
  okText,
  cancelText,
  isShowModal,
}) {
  const defaultModalWithType = type === MODAL_TYPE.TYPE_1 ? (
    <>
      <h1 className="text-center mt-20 fs-24">{title}</h1>
      <p className="text-center error mb-32">{subTitle}</p>
      <Row justify="center" className="mb-48">
        <Button size="large" onClick={handleCancel} className="w-192">
          {cancelText || 'いいえ'}
        </Button>
        <Button size="large" onClick={handleOk} className="w-192 ml-16" type="primary">
          {okText || 'はい'}
        </Button>
      </Row>
    </>
  ) : (
    <div>
      <h1 className="fs-20">{title}</h1>
      <p className="fs-16">{subTitle}</p>
    </div>
  );

  return (
    <Modal
      cancelText={cancelText || 'キャンセル'}
      okButtonProps={{ danger: true }}
      okText={okText || '削除'}
      open={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      {...(type !== MODAL_TYPE.TYPE_2 || children ? { footer: false } : {})}
    >
      {children || defaultModalWithType}
    </Modal>
  );
}

export default MyModal;
