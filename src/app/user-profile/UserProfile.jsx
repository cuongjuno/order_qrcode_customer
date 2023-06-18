import React, { useState } from 'react';
import { Form } from 'antd';

import useToast from '~components/toast/useToast';
import MESSAGES from '~constant/messages';
import { useUserProfile, useUserProfileUpdate } from '~query-hooks/userQuery';

import useProfileFormItems from './hooks/useProfileFormItems';
import { UserProfileView } from './components';

import './UserProfile.scss';

function UserProfile() {
  const { data: profile, refetch: refetchProfile } = useUserProfile();
  const { mutate: mutateProfile, isLoading } = useUserProfileUpdate();
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();

  const items = useProfileFormItems();

  const handleEditProfileClick = () => {
    setIsEditMode(true);
    form.resetFields();
  };

  const handleSubmit = async (params) => {
    const { userId, mainBaseId, ...values } = params;

    mutateProfile(
      { mainBaseId: mainBaseId || null, ...values },
      {
        onSuccess: async () => {
          await refetchProfile();
          toast.success(MESSAGES[7]);
          setIsEditMode(false);
        },
        onError: (err) => {
          if (err.response?.data.statusCode === 400) {
            toast.error(MESSAGES[24]);
          }
        },
      },
    );
  };

  return (
    <div className="py-40 user-profile-container">
      <h2 className="fs-32 fw-700">アカウント設定</h2>
      {profile?.data && (
        <UserProfileView
          form={form}
          items={items}
          initialValues={profile.data}
          isEdit={isEditMode}
          isLoading={isLoading}
          onEditProfileClick={handleEditProfileClick}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default UserProfile;
