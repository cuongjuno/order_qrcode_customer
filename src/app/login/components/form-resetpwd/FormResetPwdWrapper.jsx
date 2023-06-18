import React, { useState } from 'react';
import { Form } from 'antd';
import { useSetAtom } from 'jotai';

import MESSAGES from '~constant/messages';
import LOGIN_STATUS_RENDER from '~login/constant';
import loginStatus from '~login/store';
import { useAuthResetPass } from '~query-hooks/authQuery';

import FormResetPassword from './FormResetPwd';

function FormResetPasswordWrapper() {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const { mutate, isLoading } = useAuthResetPass();

  const setStatus = useSetAtom(loginStatus);

  const handleValuesChange = () => {
    if (error) {
      setError('');
    }
  };

  const onFinish = ({ email }) => {
    if (error) {
      setError('');
    }
    mutate(
      { mailAddress: email },
      {
        onSuccess: () => {
          setStatus(LOGIN_STATUS_RENDER.RESET_PWD_INFO);
        },
        onError: (err) => {
          if (err.response.data.statusCode === 404) {
            setError(MESSAGES[4]);
          }
        },
      },
    );
  };

  return (
    <FormResetPassword
      onFinish={onFinish}
      form={form}
      error={error}
      isLoading={isLoading}
      onValuesChange={handleValuesChange}
    />
  );
}

export default FormResetPasswordWrapper;
