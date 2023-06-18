import React, { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import PopoverOptions from '~app/master/shared/components/PopoverOptions';
import { TYPE_VIEW } from '~app/master/shared/constant';
import { typeViewAtom } from '~app/master/shared/store';
import useConfirm from '~components/confirm';
import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import useProfile from '~hooks/useProfile';
import { useTransportCompanyDelete } from '~query-hooks/transportCompanyQuery';

function useColumns() {
  const [idxAction, setIdxAction] = useState(null);
  const [recordSelected, setRecordSelected] = useState(null);
  const { isSystemAdmin } = useProfile();
  const showDeleteConfirm = useConfirm();
  const setTypeView = useSetAtom(typeViewAtom);
  const { mutate: deleteTransportComp } = useTransportCompanyDelete();
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleEditClick = (record) => {
    setIdxAction(null);
    setRecordSelected(record);
    setTypeView(TYPE_VIEW.UPDATE);
  };

  const handleOpenChange = (newOpen, id) => {
    if (newOpen) {
      setIdxAction(id);
    } else {
      setIdxAction(null);
    }
  };

  const handleDeleteClick = (record) => {
    setIdxAction(null);
    showDeleteConfirm({
      title: `${record?.transportCompanyNm} を削除しますか？`,
      desc: 'テキストは仮ですマスタ上から削除すると、登録されている過去のデータ等も参照できなくなります。',
      onSubmit: () => deleteTransportComp(record?.transportCompanyId, {
        onSuccess: () => {
          toast.success(MESSAGES[8]);
          queryClient.refetchQueries(['transport-companies', 'list']);
        },
      }),
    });
  };

  const columns = useMemo(
    () => [
      {
        title: '運送会社ID',
        dataIndex: 'transportCompanyId',
        key: 'transportCompanyId',
        width: 132,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: '運送会社名称',
        dataIndex: 'transportCompanyNm',
        key: 'transportCompanyNm',
        width: 280,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: '電話番号',
        dataIndex: 'telNumber',
        key: 'telNumber',
        width: 130,
        sorter: {
          multiple: 1,
        },
      },
      ...(isSystemAdmin
        ? [
          {
            title: '親会社名称',
            dataIndex: 'parentCompanyNm',
            key: 'parentCompanyNm',
            width: 280,
            sorter: {
              multiple: 1,
            },
          },
        ]
        : []),
      {
        title: '拠点名称',
        dataIndex: 'carriageBaseNm',
        key: 'carriageBaseNm',
        width: 222,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: ' ',
        dataIndex: 'options',
        key: 'options',
        width: 60,
        align: 'center',
        render: (_, record) => (
          <PopoverOptions
            open={idxAction === record.transportCompanyId}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, record.transportCompanyId)}
            onEditClick={() => handleEditClick(record)}
            onDeleteClick={() => handleDeleteClick(record)}
          />
        ),
      },
    ],
    [isSystemAdmin, idxAction],
  );

  return { columns, recordSelected };
}

export default useColumns;
