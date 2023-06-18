import React from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

import BaseForm from '~components/form/BaseForm';

UserProfileView.propTypes = {
  items: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEditProfileClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function UserProfileView({
  items,
  form,
  initialValues,
  isEdit,
  isLoading,
  onEditProfileClick,
  handleSubmit,
}) {
  return (
    <div>
      <Row className="mt-32" gutter={[30, 0]}>
        <Col span={18}>
          <h4 className="fs-20 fw-700">ログイン者情報</h4>
          <div className="bg-white pa-20 rounded-4 mt-10">
            <BaseForm
              items={items}
              form={form}
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              viewMode={!isEdit}
            />
          </div>
        </Col>
        <Col span={6}>
          <h5 className="fs-14 fw-400 text-center">
            {isEdit ? (
              <>
                内容の確認後、
                <br />
                更新ボタンを押してください
              </>
            ) : (
              <>
                内容を変更する場合は
                <br />
                アカウント情報変更を押してください
              </>
            )}
          </h5>
          <Button
            onClick={isEdit ? form.submit : onEditProfileClick}
            type={isEdit ? 'primary' : 'default'}
            size="large"
            className={`dis-block fs-16 fw-700 ${isEdit ? 'white' : 'primary'} mt-20 profile-btn`}
            disabled={isLoading}
          >
            {isEdit ? '更新' : 'アカウント情報変更'}
          </Button>
        </Col>
      </Row>
      {isEdit && (
        <div className="text-center">
          <div className="mt-32 mb-32">内容の確認後、更新ボタンを押してください</div>
          <Button
            className="submit-btn fs-16 fw-700"
            type="primary"
            size="large"
            onClick={isEdit ? form.submit : onEditProfileClick}
            disabled={isLoading}
          >
            更新
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserProfileView;
