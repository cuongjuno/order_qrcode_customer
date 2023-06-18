import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import PATH_URL from '~core/config/pathURL';
import { cache, sessionCache } from '~utils/cache';

import FormLoginWrapper from './components/form-login/FormLoginWrapper';
import FormResetPasswordWrapper from './components/form-resetpwd/FormResetPwdWrapper';
import ResetPwdInfo from './components/resetpwd-info/ResetPwdInfo';
import logo from './static/images/logo.jpg';
import LOGIN_STATUS_RENDER from './constant';
import loginStatus from './store';

import './Login.scss';

function Login() {
  const [status, setStatus] = useAtom(loginStatus);
  const navigate = useNavigate();
  const token = cache.get('token') || sessionCache.get('token');

  useEffect(() => {
    if (token) {
      navigate(PATH_URL.HOME);
    }
    return () => setStatus(RESET);
  }, []);

  const renderFormLogin = useCallback(() => {
    let result;

    switch (status) {
      case LOGIN_STATUS_RENDER.LOGIN:
        result = <FormLoginWrapper />;
        break;
      case LOGIN_STATUS_RENDER.RESET_PWD:
        result = <FormResetPasswordWrapper />;
        break;
      default:
        return <ResetPwdInfo />;
    }
    return result;
  }, [status]);

  return (
    !token && (
      <Row className="login" justify="center" align="middle">
        <Col span={18}>
          <div className="dis-flex jc-center">
            <img width={256} src={logo} alt="logo" />
          </div>
          {renderFormLogin()}
        </Col>
      </Row>
    )
  );
}

export default Login;
