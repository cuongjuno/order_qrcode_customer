import React from 'react';
import { useIsMutating } from '@tanstack/react-query';
import {
  Button, Divider, Form, Modal, Row,
} from 'antd';
import PropTypes from 'prop-types';

import useControlModal from '../hooks/useControlModal';

MasterModalForm.propTypes = {
  content: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

function MasterModalForm({ content, title }) {
  const [form] = Form.useForm();
  const { closeModal, isOpen } = useControlModal();
  const isLoadingCreate = useIsMutating({ queryKey: ['users', 'create'] });
  const isLoadingUpdate = useIsMutating({ queryKey: ['users', 'update'] });

  const handleSubmit = () => {
    form.submit();
  };
  return (
    <Modal open={isOpen} onCancel={closeModal} footer={null} width={800}>
      <div className="dis-flex ai-center mb-16">
        <div className="w-6 h-32 rounded-3 bg-primary-080 mr-8" />
        <h1 className="fs-24">{title}</h1>
      </div>
      {content(form)}
      <div className="footer">
        <Divider className="bg-black-030 mb-24 mt-16" />
        <Row justify="space-between" align="middle">
          <Button type="link" className="pa-0 fs-16" onClick={closeModal}>
            キャンセル
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            完了
          </Button>
        </Row>
      </div>
    </Modal>
  );
}

export default MasterModalForm;
