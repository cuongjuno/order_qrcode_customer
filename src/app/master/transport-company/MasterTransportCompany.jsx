import React from 'react';

import { useTransportCompanyList } from '~query-hooks/transportCompanyQuery';
import MasterWrapper from '../shared/components/MasterWrapper';

import {
  useColumns, useFormCreate, useFormUpdate, useItemsFilter,
} from './hooks';

function MasterTransportCompany() {
  const { columns, recordSelected } = useColumns();
  const formCreate = useFormCreate();
  const formUpdate = useFormUpdate(recordSelected);
  const itemsFilter = useItemsFilter();

  const tableProps = {
    columns,
    rowKey: (record) => record?.transportCompanyId,
  };

  return (
    <MasterWrapper
      title="運送会社マスタ"
      itemsFilter={itemsFilter}
      formCreate={formCreate}
      formUpdate={formUpdate}
      tableProps={tableProps}
      useGetData={useTransportCompanyList}
    />
  );
}

export default MasterTransportCompany;
