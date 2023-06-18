import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import PopoverOptions from '~app/master/shared/components/PopoverOptions';
import { TYPE_VIEW } from '~app/master/shared/constant';
import { typeViewAtom } from '~app/master/shared/store';
import useConfirm from '~components/confirm';
import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import { useUserDelete } from '~query-hooks/userQuery';

function useColumnsUser() {
  const [userId, setUserId] = useState(null);
  const setTypeView = useSetAtom(typeViewAtom);
  const [recordSelected, setRecordSelected] = useState(null);
  const showDeleteConfirm = useConfirm();
  const { mutate: deleteUser } = useUserDelete();
  const toast = useToast();
  const queryClient = useQueryClient();

  const onDeleteSubmit = (mUserId) => {
    deleteUser(mUserId, {
      onSuccess: () => {
        toast.success(MESSAGES[8]);
        queryClient.refetchQueries(['users', 'list']);
      },
    });
  };

  const handleClose = () => {
    setUserId(null);
  };

  const handleEditClick = (record) => {
    setUserId(null);
    setRecordSelected(record);
    setTypeView(TYPE_VIEW.UPDATE);
  };

  const handleOpenChange = (newOpen, id) => {
    if (newOpen) {
      setUserId(id);
    } else {
      setUserId(null);
    }
  };

  const handleDeleteClick = (record) => {
    setUserId(null);
    showDeleteConfirm({
      title: `${record.userNm} を削除しますか？`,
      desc: 'マスタ上から削除すると、登録されている過去のデータ等も参照できなくなります。',
      onSubmit: () => onDeleteSubmit(record.mUserId),
    });
  };

  useEffect(() => {
    const ref = document.getElementsByClassName('ant-table-body')[0];
    ref.addEventListener('scroll', handleClose);

    return () => {
      ref.removeEventListener('scroll', handleClose);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'ログインID',
        dataIndex: 'userId',
        key: 'userId',
        width: 212,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: 'ユーザ名称',
        dataIndex: 'userNm',
        key: 'userNm',
        width: 140,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: 'ふりがな',
        dataIndex: 'userNmKn',
        key: 'userNmKn',
        width: 180,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: 'メールアドレス',
        dataIndex: 'mailAddress',
        key: 'mailAddress',
        width: 200,
        ellipsis: true,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: '権限区分',
        dataIndex: 'roleDivNm',
        key: 'roleDivNm',
        width: 150,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: '運送会社',
        dataIndex: 'transportCompanyNm',
        key: 'transportCompanyNm',
        width: 180,
        sorter: {
          multiple: 1,
        },
      },
      {
        title: 'メイン拠点',
        dataIndex: 'mainBaseNm',
        key: 'mainBaseNm',
        width: 150,
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
            open={userId === record.mUserId}
            onOpenChange={(newOpen) => handleOpenChange(newOpen, record.mUserId)}
            onEditClick={() => handleEditClick(record)}
            onDeleteClick={() => handleDeleteClick(record)}
          />
        ),
      },
    ],
    [userId],
  );

  return { columns, recordSelected };
}

export default useColumnsUser;
