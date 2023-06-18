import React from 'react';

import { FORM_FILTER_TYPES } from '~components/form/constant';
import { useOptionBases, useOptionCompanies } from '~query-hooks/optionQuery';
import { useUserMasterList } from '~query-hooks/userQuery';
import MasterWrapper from '../shared/components/MasterWrapper';

import useRoleOptions from './hooks/useRoleOptions';
import { useColumnsUser, useFormCreate, useFormUpdate } from './hooks';

import './MasterUser.scss';

function MasterUser() {
  const { data: optionBases } = useOptionBases();
  const roleDivOptions = useRoleOptions();
  const { data: transportOptions } = useOptionCompanies();
  const { columns, recordSelected } = useColumnsUser();
  const formCreate = useFormCreate();
  const formUpdate = useFormUpdate(recordSelected);

  const itemsFilter = [
    {
      type: FORM_FILTER_TYPES.INPUT,
      name: 'userId',
      label: 'ログインID',
      colProps: {
        span: 6,
      },
    },
    {
      type: FORM_FILTER_TYPES.INPUT,
      name: 'userNm',
      label: 'ユーザ名称',
      colProps: {
        span: 6,
      },
    },
    {
      type: FORM_FILTER_TYPES.INPUT,
      name: 'userNmKn',
      label: 'ユーザ名称（ふりがな）',
      colProps: {
        span: 6,
      },
    },
    {
      type: FORM_FILTER_TYPES.INPUT,
      name: 'mailAddress',
      label: 'メールアドレス',
      colProps: {
        span: 6,
      },
    },
    {
      type: FORM_FILTER_TYPES.SELECT,
      name: 'roleDiv',
      label: '権限区分',
      options: roleDivOptions,
      colProps: {
        span: 8,
      },
    },
    {
      type: FORM_FILTER_TYPES.SELECT,
      name: 'transportCompanyId',
      label: '運送会社',
      options: transportOptions,
      colProps: {
        span: 8,
      },
    },
    {
      type: FORM_FILTER_TYPES.SELECT,
      name: 'mainBaseId',
      label: 'メイン拠点',
      options: optionBases,
      colProps: {
        span: 8,
      },
    },
  ];

  const tableProps = {
    columns,
    rowKey: (record) => record?.mUserId,
    scroll: { y: 380, x: 1110 },
  };

  return (
    <MasterWrapper
      title="ユーザマスタ"
      itemsFilter={itemsFilter}
      formCreate={formCreate}
      formUpdate={formUpdate}
      tableProps={tableProps}
      useGetData={useUserMasterList}
    />
  );
}

export default MasterUser;
