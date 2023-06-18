import { useMemo } from 'react';

import { FORM_ITEM_TYPES } from '~components/form/constant';
import MESSAGES from '~constant/messages';
import { REGEX, RULES } from '~constant/rules';
import { useOptionBases } from '~query-hooks/optionQuery';

export default function useProfileFormItems() {
  const { data: optionBases } = useOptionBases();

  const items = useMemo(
    () => [
      {
        type: FORM_ITEM_TYPES.INPUT,
        name: 'userId',
        label: 'ログインID',
        viewMode: true,
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
        type: FORM_ITEM_TYPES.INPUT,
        name: 'mailAddress',
        label: 'メールアドレス',
        viewMode: true,
        noEdit: true,
      },
      {
        type: FORM_ITEM_TYPES.SELECT,
        name: 'mainBaseId',
        label: 'メイン拠点',
        showSearch: true,
        options: optionBases,
      },
      {
        type: FORM_ITEM_TYPES.PASSWORD,
        name: 'password',
        label: '現在のパスワード',
        rules: [
          RULES.RANGE(5, 50),
          RULES.CUSTOM((get, value) => {
            if (!value && get('newPassword')) {
              return Promise.reject(new Error(MESSAGES[1]));
            }
            return Promise.resolve();
          }),
        ],
        dependencies: ['newPassword'],
        validateFirst: true,
        inputProps: { maxLength: 50, autoComplete: 'new-password' },
        noView: true,
      },
      {
        type: FORM_ITEM_TYPES.PASSWORD,
        name: 'newPassword',
        label: 'パスワード',
        rules: [
          {
            message: MESSAGES[16],
            pattern: REGEX.TEXT_WITHOUT_JAPANESE,
          },
          RULES.RANGE(5, 50),
          RULES.CUSTOM((get, value) => {
            if (!value && get('password')) {
              return Promise.reject(new Error(MESSAGES[1]));
            }
            return Promise.resolve();
          }),
        ],
        inputProps: { maxLength: 50 },
        noView: true,
        validateFirst: true,
      },
      {
        type: FORM_ITEM_TYPES.PASSWORD,
        name: 'confirmPassword',
        label: 'パスワード再確認',
        rules: [
          RULES.CUSTOM((get, value) => {
            const password = get('password');
            const newPassword = get('newPassword');
            if (value && value !== newPassword) {
              return Promise.reject(new Error(MESSAGES[17]));
            }
            if (!value && (newPassword || password)) {
              return Promise.reject(new Error(MESSAGES[1]));
            }
            return Promise.resolve();
          }),
          RULES.RANGE(5, 50),
        ],
        inputProps: { maxLength: 50 },
        dependencies: ['newPassword'],
        noView: true,
        validateFirst: true,
      },
    ],
    [optionBases?.length],
  );

  return items;
}
