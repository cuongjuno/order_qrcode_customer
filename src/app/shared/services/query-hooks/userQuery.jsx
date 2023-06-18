import { useMutation, useQuery } from '@tanstack/react-query';

import repositoryFactory from '~services/repositories/repositoryFactory';

const resource = 'users';
const api = repositoryFactory[resource];

const useUserProfile = () => useQuery({
  queryKey: [resource, 'profile'],
  queryFn: () => api.profile(),
});

const useUserProfileUpdate = () => useMutation({
  mutationKey: [resource, 'profile-update'],
  mutationFn: (params) => api.profileUpdate(params),
});

const useUserMasterList = (params) => useQuery({
  queryKey: [resource, 'list', params],
  queryFn: () => api.list(params),
  select: (data) => data?.data,
  keepPreviousData: true,
});

const useUserDelete = () => useMutation({
  mutationKey: [resource, 'delete'],
  mutationFn: (id) => api.delete(id),
});

const useUserCreate = () => useMutation({
  mutationKey: [resource, 'create'],
  mutationFn: (params) => api.create(params),
});

const useUserUpdate = () => useMutation({
  mutationKey: [resource, 'update'],
  mutationFn: ({ params, id }) => api.update(params, id),
});

const useUserNewPasswordUpdate = () => useMutation({
  mutationKey: [resource, 'update-new-password'],
  mutationFn: (id) => api.updateNewPassword(id),
});

export {
  useUserCreate,
  useUserDelete,
  useUserMasterList,
  useUserNewPasswordUpdate,
  useUserProfile,
  useUserProfileUpdate,
  useUserUpdate,
};
