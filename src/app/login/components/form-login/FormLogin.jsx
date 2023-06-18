import React from 'react';
import {
  Button, Checkbox, Form, Input, Row,
} from 'antd';
import PropTypes from 'prop-types';

import formLoginRules from './FormLoginRules';

FormLogin.propTypes = {
  onFinish: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  toResetPassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRegister: PropTypes.bool.isRequired,
  setIsRegister: PropTypes.func.isRequired,
};

function FormLogin({
  onFinish,
  form,
  toResetPassword,
  isLoading,
  onValuesChange,
  error,
  isRegister,
  setIsRegister,
}) {
  return (
    <Form
      className="form-login"
      name="form-login"
      form={form}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onValuesChange={onValuesChange}
    >
      {error && <div className="mb-20 error">{error}</div>}
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={formLoginRules.loginId}
        validateStatus={error ? 'error' : undefined}
      >
        <Input size="large" maxLength={256} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={formLoginRules.password}
        validateStatus={error ? 'error' : undefined}
      >
        <Input.Password size="large" maxLength={64} />
      </Form.Item>
      <Button
        size="large"
        htmlType="submit"
        type="primary"
        className="w-full mb-16"
        disabled={isLoading}
      >
        {isRegister ? 'Đăng ký' : 'Đăng nhập'}
      </Button>
      <Row justify="space-between">
        <Form.Item name="remember" valuePropName="checked" className="text-center">
          {!isRegister && <Checkbox>Lưu thông tin đăng nhập</Checkbox>}
        </Form.Item>
        <Button type="text" className="primary" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Đăng nhập' : 'Đăng ký'}
        </Button>
      </Row>
      {!isRegister && (
        <Form.Item className="text-center">
          <Button onClick={toResetPassword} size="small" className="primary" type="link">
            Quên mật khẩu
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default FormLogin;
