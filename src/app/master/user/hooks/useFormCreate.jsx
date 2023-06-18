import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Radio } from 'antd';

import useControlModal from '~app/master/shared/hooks/useControlModal';
import BaseForm from '~components/form/BaseForm';
import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import ROLES from '~constant/roles';
import useProfile from '~hooks/useProfile';
import { useUserCreate } from '~query-hooks/userQuery';
import { TYPE_OPTIONS, USER_MASTER_FORM_TYPE } from '../constant/formType';

import useUserFormItem from './useUserFormItem';

function useFormCreate() {
  const { mutate: createUser } = useUserCreate();
  const { profile } = useProfile();
  const toast = useToast();
  const { isOpen, closeModal } = useControlModal();
  const [formType, setFormType] = useState(USER_MASTER_FORM_TYPE.EMAIL);
  const generateItems = useUserFormItem({ formType, isUpdate: false });
  const queryClient = useQueryClient();

  const initialValues = {
    roleDiv: ROLES.CARRIAGE_COMPANY,
    transportCompanyId: profile?.transportCompanyId,
  };

  useEffect(() => {
    if (!isOpen) {
      setFormType(USER_MASTER_FORM_TYPE.EMAIL);
    }
  }, [isOpen]);

  const handleRadioChange = (e, form) => {
    setFormType(e.target.value);
    form.resetFields();
  };

  const submitCreate = ({ userId, ...values }) => {
    createUser(
      { userId: userId || values.mailAddress, ...values },
      {
        onSuccess: () => {
          toast.success(MESSAGES[6]);
          closeModal();
          queryClient.refetchQueries(['users', 'list']);
        },
      },
    );
  };

  const content = (form) => {
    const items = generateItems(form);
    const handleFormChange = (changedValues) => {
      const changedName = Object.getOwnPropertyNames(changedValues)?.[0];
      if (changedName === 'roleDiv') {
        form.setFieldValue('transportCompanyId');
        form.setFieldValue('driverId');
        form.validateFields(['transportCompanyId']);
      }
      if (changedName === 'transportCompanyId') {
        form.setFieldValue('driverId');
      }
    };
    return (
      <div className="user-form">
        <Radio.Group
          value={formType}
          options={TYPE_OPTIONS}
          onChange={(e) => handleRadioChange(e, form)}
          className="master-user-form-item radio-line-bottom w-full pb-10 mt-15"
        />
        <BaseForm
          form={form}
          items={items}
          initialValues={initialValues}
          handleSubmit={submitCreate}
          onValuesChange={handleFormChange}
        />
      </div>
    );
  };
  return content;
}

export default useFormCreate;
