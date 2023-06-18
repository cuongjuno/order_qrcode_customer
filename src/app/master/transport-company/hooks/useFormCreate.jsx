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
import { useTransportCompanyCreate } from '~query-hooks/transportCompanyQuery';

function useFormCreate() {
  const { isSystemAdmin } = useProfile();
  const { mutate: mutateCreate } = useTransportCompanyCreate();
  const { data: optionBases } = useOptionBases();
  const { data: optionParents } = useOptionParents();
  const { closeModal } = useControlModal();
  const { success } = useToast();
  const queryClients = useQueryClient();

  const submitCreate = (value) => {
    mutateCreate(value, {
      onSuccess: async () => {
        await queryClients.refetchQueries(['transport-companies', 'list']);
        closeModal();
        success(MESSAGES[6]);
      },
    });
  };

  const content = useCallback(
    (form) => {
      const items = [
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
        ...(isSystemAdmin
          ? [
            {
              type: FORM_ITEM_TYPES.SELECT,
              options: optionParents,
              name: 'parentCompanyId',
              label: '親会社名称',
              inputProps: { showSearch: true, placeholder: '選択して下さい' },
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

      return <BaseForm form={form} items={items} handleSubmit={submitCreate} />;
    },
    [isSystemAdmin, optionBases?.length, optionParents?.length],
  );
  return content;
}

export default useFormCreate;
