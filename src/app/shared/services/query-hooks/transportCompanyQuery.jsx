import { useMutation, useQuery } from '@tanstack/react-query';

import repositoryFactory from '../repositories/repositoryFactory';

const resource = 'transport-companies';
const api = repositoryFactory[resource];

const useTransportCompanyList = (params) => useQuery({
  queryKey: [resource, 'list', params],
  queryFn: () => api.list(params),
  select: (data) => data?.data,
  keepPreviousData: true,
});

const useTransportCompanyDetail = (orderId) => useQuery({
  queryKey: [resource, 'detail', orderId],
  queryFn: () => api.detail(orderId),
});

const useTransportCompanyCreate = () => useMutation({
  mutationKey: [resource, 'create'],
  mutationFn: (params) => api.create(params),
});

const useTransportCompanyUpdate = () => useMutation({
  mutationKey: [resource, 'update'],
  mutationFn: ({ params, id }) => api.update(params, id),
});

const useTransportCompanyDelete = () => useMutation({
  mutationKey: [resource, 'delete'],
  mutationFn: (id) => api.delete(id),
});

export {
  useTransportCompanyCreate,
  useTransportCompanyDelete,
  useTransportCompanyDetail,
  useTransportCompanyList,
  useTransportCompanyUpdate,
};
