import { useMutation, useQuery } from '@tanstack/react-query';

import repositoryFactory from '../repositories/repositoryFactory';

const resource = 'orders';
const api = repositoryFactory[resource];

const useExampleList = (params) => useQuery({
  queryKey: [resource, 'list', params],
  queryFn: () => api.list(params),
  select: (data) => data?.data,
  keepPreviousData: true,
});

const useExampleDetail = (orderId) => useQuery({
  queryKey: [resource, 'detail', orderId],
  queryFn: () => api.detail(orderId),
});

const useExampleCreate = () => useMutation({
  mutationKey: [resource, 'create'],
  mutationFn: (params) => api.create(params),
});

const useExampleUpdate = () => useMutation({
  mutationKey: [resource, 'update'],
  mutationFn: ({ params, id }) => api.update(params, id),
});

const useExampleDelete = () => useMutation({
  mutationKey: [resource, 'delete'],
  mutationFn: (id) => api.delete(id),
});

export {
  useExampleCreate, useExampleDelete, useExampleDetail, useExampleList, useExampleUpdate,
};
