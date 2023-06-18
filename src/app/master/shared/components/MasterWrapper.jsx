import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import PropTypes from 'prop-types';

import BaseFormFilter from '~components/form/BaseFormFilter';
import MyTable from '~components/table';
import { TYPE_VIEW } from '../constant';
import { typeViewAtom } from '../store';

import MasterModalForm from './MasterModalForm';

MasterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  itemsFilter: PropTypes.array.isRequired,
  formCreate: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired,
  tableProps: PropTypes.shape({
    columns: PropTypes.array,
    rowKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
    onRow: PropTypes.func,
  }).isRequired,
  useGetData: PropTypes.func.isRequired,
};

function MasterWrapper({
  title, itemsFilter, formCreate, formUpdate, tableProps, useGetData,
}) {
  const [form] = Form.useForm();
  const [typeView, setTypeView] = useAtom(typeViewAtom);
  const [paramsQuery, setParamsQuery] = useState({
    page: 1,
  });
  const { data: dataQuery } = useGetData(paramsQuery);

  const { results, pagination } = dataQuery || {};
  const { totalCount, count } = pagination || {};

  const handleChangeTable = (pageInfor, __, sorterResult) => {
    if (pageInfor.current === paramsQuery?.page) {
      // handle sort
      const sort = {};
      const ORDER = {
        descend: 'DESC',
        ascend: 'ASC',
      };
      // sorterResult = obj || array
      if (sorterResult?.length) {
        sorterResult.forEach(({ columnKey, order }) => {
          sort[columnKey] = ORDER[order];
        });
      } else if (sorterResult?.order) {
        const { columnKey, order } = sorterResult;
        sort[columnKey] = ORDER[order];
      }
      setParamsQuery((pre) => ({
        ...pre,
        sort,
      }));
    } else {
      // handle pagination
      setParamsQuery((pre) => ({
        ...pre,
        page: pageInfor.current,
      }));
    }
  };
  const handleCreate = () => {
    setTypeView(TYPE_VIEW.CREATE);
  };

  const totalContent = () => totalCount > 0 && (
  <div className="fs-14 fw-500 pos-absolute -top-5">
    <span className="fs-24 fw-700">{count}</span>
    {` 件表示 / ${totalCount} 件中`}
  </div>
  );

  useEffect(() => {
    setTypeView(RESET);
  }, []);

  return (
    <>
      {typeView === TYPE_VIEW.CREATE && (
        <MasterModalForm content={formCreate} title={`${title}登録`} />
      )}
      {typeView === TYPE_VIEW.UPDATE && (
        <MasterModalForm content={formUpdate} title={`${title}編集`} />
      )}
      <div className="mt-48">
        <div className="dis-flex jc-space-between ai-center mb-24">
          <h1 className="fs-32">{title}</h1>
          <Button
            className="w-114 fs-14 fw-700"
            onClick={handleCreate}
            type="primary"
            icon={<i className="ri-add-fill fs-14" />}
          >
            新規作成
          </Button>
        </div>
        <BaseFormFilter setParamsQuery={setParamsQuery} form={form} items={itemsFilter} />
        <MyTable
          size="middle"
          title={totalContent}
          onChange={handleChangeTable}
          dataSource={results}
          total={totalCount}
          {...tableProps}
        />
      </div>
    </>
  );
}

export default MasterWrapper;
