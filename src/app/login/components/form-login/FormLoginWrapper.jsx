import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { useSetAtom } from 'jotai';

import MESSAGES from '~constant/messages';
import PATH_URL from '~core/config/pathURL';
import LOGIN_STATUS_RENDER from '~login/constant';
import loginStatus from '~login/store';
import { useAuthLogin } from '~query-hooks/authQuery';
import { cache, sessionCache } from '~utils/cache';

import FormLogin from './FormLogin';

function FormLoginWrapper() {
  const [form] = Form.useForm();
  const { mutate: mutateLogin, isLoading } = useAuthLogin();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const setStatus = useSetAtom(loginStatus);

  const toResetPassword = () => {
    setStatus(LOGIN_STATUS_RENDER.RESET_PWD);
  };

  const handleValuesChange = () => {
    if (error) {
      setError('');
    }
  };

  const onFinish = async ({ remember, ...params }) => {
    if (error) {
      setError('');
    }
    mutateLogin(params, {
      onSuccess: (res) => {
        const { data } = res;
        if (remember) {
          cache.set('token', data.accessToken);
          cache.set('refreshToken', data.refreshToken);
        } else {
          sessionCache.set('token', data.accessToken);
          sessionCache.set('refreshToken', data.refreshToken);
        }

        navigate(PATH_URL.HOME);
      },
      onError: (err) => {
        if ([404, 400].includes(err.response.data?.statusCode)) {
          setError(MESSAGES[2]);
        }
      },
    });
  };

  return (
    <FormLogin
      onFinish={onFinish}
      form={form}
      toResetPassword={toResetPassword}
      isLoading={isLoading}
      error={error}
      onValuesChange={handleValuesChange}
      isRegister={isRegister}
      setIsRegister={setIsRegister}
    />
  );
}

export default FormLoginWrapper;
