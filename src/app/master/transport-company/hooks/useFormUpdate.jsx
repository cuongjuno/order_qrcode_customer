import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import useControlModal from '~app/master/shared/hooks/useControlModal';
import BaseForm from '~components/form/BaseForm';
import { FORM_ITEM_TYPES } from '~components/form/constant';
import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import { RULES } from '~constant/rules';
import useProfile from '~hooks/useProfile';
import { useOptionBases, useOptionParents } from '~query-hooks/optionQuery';
import { useTransportCompanyUpdate } from '~query-hooks/transportCompanyQuery';

function useFormUpdate(recordSelected) {
  const { isSystemAdmin, isCariageComp } = useProfile();
  const { mutate: mutateUpdate } = useTransportCompanyUpdate();
  const { data: optionBases } = useOptionBases();
  const { data: optionParents } = useOptionParents();
  const { closeModal } = useControlModal();
  const { success } = useToast();
  const queryClients = useQueryClient();

  const submitUpdate = ({ transportCompanyId, ...values }) => {
    const params = values;
    if (isCariageComp) {
      delete params.parentCompanyId;
    }
    mutateUpdate(
      { params, id: transportCompanyId },
      {
        onSuccess: async () => {
          await queryClients.refetchQueries(['transport-companies', 'list']);
          closeModal();
          success(MESSAGES[7]);
        },
      },
    );
  };

  const content = useCallback(
    (form) => {
      const items = [
        {
          type: FORM_ITEM_TYPES.INPUT,
          name: 'transportCompanyId',
          label: '運送会社ID',
          inputProps: { disabled: true },
        },
        {
          type: FORM_ITEM_TYPES.INPUT,
          name: 'transportCompanyNm',
          label: '運送会社名称',
          inputProps: { maxLength: 128, placeholder: '入力してください' },
        },
        {
          type: FORM_ITEM_TYPES.INPUT,
          name: 'telNumber',
          label: '電話番号',
          inputProps: { maxLength: '13', placeholder: '入力してください' },
          rules: [RULES.REQUIRED, RULES.TEL],
        },
        ...(isSystemAdmin || isCariageComp
          ? [
            {
              type: FORM_ITEM_TYPES.SELECT,
              options: optionParents,
              name: 'parentCompanyId',
              label: '親会社名称',
              inputProps: {
                showSearch: true,
                placeholder: '選択して下さい',
                disabled: isCariageComp,
              },
            },
          ]
          : []),
        {
          type: FORM_ITEM_TYPES.SELECT,
          options: optionBases,
          name: 'carriageBaseId',
          label: '拠点名称',
          inputProps: { showSearch: true, placeholder: '選択して下さい' },
          rules: [RULES.REQUIRED],
        },
      ];

      return (
        <BaseForm
          initialValues={recordSelected}
          form={form}
          items={items}
          handleSubmit={submitUpdate}
        />
      );
    },
    [isSystemAdmin, optionBases?.length, optionParents?.length, recordSelected],
  );
  return content;
}

export default useFormUpdate;
