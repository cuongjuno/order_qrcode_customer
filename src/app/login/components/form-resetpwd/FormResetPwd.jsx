import React from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

import formResetPwdRules from './FormResetPwdRules';

FormResetPassword.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function FormResetPassword({
  form, onFinish, error, onValuesChange, isLoading,
}) {
  return (
    <div>
      <div className="fs-24 fw-700 mb-20 text-center">Cấp lại mật khẩu</div>
      <div className="fs-14 mb-40 fw-500 text-center">
        Vui lòng nhập địa chỉ email của bạn và nhấn nút gửi.
        <br />
        Chúng tôi sẽ gửi cho bạn một email có URL để cấp lại mật khẩu.
      </div>
      <Form
        form={form}
        className="reset-pwd-form"
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onValuesChange}
      >
        {error && <div className="mb-20 error">{error}</div>}
        <Form.Item
          name="email"
          rules={formResetPwdRules.email}
          className="mb-32"
          validateStatus={error ? 'error' : undefined}
        >
          <Input size="large" placeholder="Hãy điền địa chỉ email của bạn" />
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="w-full mb-20"
          disabled={isLoading}
        >
          Gửi
        </Button>
      </Form>
    </div>
  );
}

export default FormResetPassword;
