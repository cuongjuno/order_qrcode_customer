import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button, Col, Radio, Row,
} from 'antd';

import useControlModal from '~app/master/shared/hooks/useControlModal';
import BaseForm from '~components/form/BaseForm';
import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import useProfile from '~hooks/useProfile';
import { useUserNewPasswordUpdate, useUserUpdate } from '~query-hooks/userQuery';
import { TYPE_OPTIONS, USER_MASTER_FORM_TYPE } from '../constant/formType';

import useUserFormItem from './useUserFormItem';

function useFormUpdate(recordSelected) {
  const formType = recordSelected?.mailAddress
    ? USER_MASTER_FORM_TYPE.EMAIL
    : USER_MASTER_FORM_TYPE.LOGIN_ID;
  const { profile } = useProfile();
  const generateItems = useUserFormItem({ formType, isUpdate: true });
  const { mutate: updateUser } = useUserUpdate();
  const { mutate: updateNewPassword } = useUserNewPasswordUpdate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { closeModal } = useControlModal();

  const submitUpdate = ({
    mUserId,
    userNm,
    userNmKn,
    mainBaseId,
    driverId,
    transportCompanyId,
  }) => {
    updateUser(
      {
        id: mUserId,
        params: {
          userNm,
          userNmKn,
          mainBaseId,
          driverId,
          transportCompanyId,
        },
      },
      {
        onSuccess: () => {
          toast.success(MESSAGES[7]);
          closeModal();
          queryClient.refetchQueries(['users', 'list']);
          if (profile?.mUserId === mUserId) {
            queryClient.refetchQueries(['users', 'profile']);
          }
        },
      },
    );
  };

  const handleNewPasswordClick = () => {
    updateNewPassword(recordSelected.mUserId, {
      onSuccess: () => {
        toast.success(MESSAGES[7]);
        closeModal();
      },
    });
  };

  const content = useCallback(
    (form) => {
      const items = generateItems(form);
      const handleFormChange = (changedValues) => {
        const changedName = Object.getOwnPropertyNames(changedValues)?.[0];
        if (changedName === 'transportCompanyId') {
          form.setFieldValue('driverId');
        }
      };
      return (
        <div className="user-form">
          <Row justify="space-between" className="radio-line-bottom">
            <Col>
              <Radio.Group
                value={formType}
                options={TYPE_OPTIONS}
                disabled
                className="master-user-form-item w-full pb-10 mt-15"
              />
            </Col>
            <Col>
              {profile?.mailAddress && (
                <Button type="link" className="primary fw-400" onClick={handleNewPasswordClick}>
                  パスワードの初期化
                </Button>
              )}
            </Col>
          </Row>
          <BaseForm
            form={form}
            initialValues={recordSelected}
            items={items}
            handleSubmit={submitUpdate}
            onValuesChange={handleFormChange}
          />
        </div>
      );
    },
    [recordSelected],
  );
  return content;
}

export default useFormUpdate;
