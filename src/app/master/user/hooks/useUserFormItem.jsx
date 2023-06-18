import { Form as antdForm } from 'antd';

import { FORM_ITEM_TYPES } from '~components/form/constant';
import MESSAGES from '~constant/messages';
import ROLES from '~constant/roles';
import { REGEX, RULES } from '~constant/rules';
import useProfile from '~hooks/useProfile';
import { useOptionBases, useOptionCompanies, useOptionDrivers } from '~query-hooks/optionQuery';
import { USER_MASTER_FORM_TYPE } from '../constant/formType';

import useRoleOptions from './useRoleOptions';

function useUserFormItem({ formType, isUpdate }) {
  const { data: bases } = useOptionBases();
  const { data: transports } = useOptionCompanies();
  const roleOptions = useRoleOptions();
  const { isCariageComp } = useProfile();

  const isLoginId = formType === USER_MASTER_FORM_TYPE.LOGIN_ID;

  const generateItems = (form) => {
    const roleDiv = antdForm.useWatch('roleDiv', form);
    const transportCompanyId = antdForm.useWatch('transportCompanyId', form);
    const { data: driversOptions } = useOptionDrivers({ transportCompanyId });
    const isInvalidTransport = ![ROLES.TRANSPORT_COMPANY, ROLES.CARRIAGE_COMPANY].includes(roleDiv);

    return [
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'mUserId',
        label: 'ユーザマスタID',
        hidden: !isUpdate,
        inputProps: {
          disabled: true,
        },
      },
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'userId',
        label: 'ログインID',
        rules: isLoginId
          ? [
            RULES.REQUIRED,
            {
              pattern: REGEX.TEXT_WITHOUT_JAPANESE,
              message: MESSAGES[18],
            },
            RULES.MAX(256),
          ]
          : undefined,
        inputProps: { maxLength: 256, disabled: isUpdate },
        hidden: isUpdate ? false : !isLoginId,
      },
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'mailAddress',
        label: 'メールアドレス',
        hidden: isLoginId || isUpdate,
        rules: !isLoginId
          ? [RULES.REQUIRED, RULES.MAX(256), { type: 'email', message: MESSAGES[3] }]
          : undefined,
        inputProps: {
          maxLength: 256,
          disabled: isUpdate,
        },
        help: '※ メールアドレスがログインIDに設定されます。',
        validateFirst: true,
      },
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'userNm',
        label: 'ユーザ名称',
        rules: [RULES.REQUIRED],
        inputProps: { maxLength: 128 },
      },
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'userNmKn',
        label: 'ユーザ名称（ふりがな）',
        rules: [
          RULES.REQUIRED,
          {
            pattern: REGEX.HIRAGANA_WITH_NUMBER_AND_SPECIAL_CHARACTER,
            message: MESSAGES[15],
          },
        ],
        inputProps: { maxLength: 128 },
      },
      {
        type: FORM_ITEM_TYPES.SELECT,
        name: 'roleDiv',
        label: '権限区分',
        options: roleOptions,
        rules: [RULES.REQUIRED],
        viewMode: isUpdate,
        showSearch: true,
      },
      {
        type: FORM_ITEM_TYPES.SELECT,
        name: 'transportCompanyId',
        label: '運送会社',
        options: transports,
        rules: !isInvalidTransport && !isUpdate ? [RULES.REQUIRED] : undefined,
        showSearch: true,
        viewMode: isUpdate || isCariageComp,
        inputProps: {
          disabled: isInvalidTransport,
        },
      },
      {
        type: FORM_ITEM_TYPES.SELECT,
        name: 'mainBaseId',
        label: 'メイン拠点',
        showSearch: true,
        options: bases,
      },
      {
        type: FORM_ITEM_TYPES.SELECT,
        name: 'driverId',
        label: '配送員',
        showSearch: true,
        inputProps: {
          disabled: isInvalidTransport,
        },
        options: transportCompanyId ? driversOptions : [],
      },
      {
        type: FORM_ITEM_TYPES.PASSWORD,
        name: 'password',
        label: 'パスワード',
        rules: [
          {
            message: MESSAGES[16],
            pattern: REGEX.TEXT_WITHOUT_JAPANESE,
          },
          RULES.RANGE(5, 50),
        ],
        inputProps: { maxLength: 50, autoComplete: 'new-password' },
        validateFirst: true,
        noEdit: isUpdate,
      },
      {
        type: FORM_ITEM_TYPES.PASSWORD,
        name: 'confirmPassword',
        label: 'パスワード再確認',
        rules: [
          RULES.CUSTOM((get, value) => {
            const newPassword = get('password');
            if (value !== newPassword) {
              return Promise.reject(new Error(MESSAGES[17]));
            }
            return Promise.resolve();
          }),
          RULES.RANGE(5, 50),
        ],
        inputProps: { maxLength: 50 },
        dependencies: ['password'],
        validateFirst: true,
        noEdit: isUpdate,
      },
    ];
  };
  return generateItems;
}

export default useUserFormItem;
