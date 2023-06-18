import { useQuery } from '@tanstack/react-query';

import repositoryFactory from '~services/repositories/repositoryFactory';

const resource = 'select';
const api = repositoryFactory[resource];

const useOptionBases = () => useQuery({
  queryKey: [resource, 'bases'],
  queryFn: () => api.basesList(),
  select: (data) => data?.data?.map((item) => ({ label: item.baseNm, value: item.baseId })) || [],
});

const useOptionParents = () => useQuery({
  queryKey: [resource, 'parents'],
  queryFn: () => api.parentsList(),
  select: (data) => data?.data?.map((item) => ({
    label: item.transportCompanyNm,
    value: item.transportCompanyId,
  })) || [],
});
const useOptionCompanies = () => useQuery({
  queryKey: [resource, 'companies'],
  queryFn: () => api.companiesList(),
  select: (data) => data?.data?.map((item) => ({
    label: item.transportCompanyNm,
    value: item.transportCompanyId,
  })) || [],
});
const useOptionDrivers = (params) => useQuery({
  queryKey: [resource, 'drivers', params],
  queryFn: () => api.driversList(params),
  select: (data) => data?.data?.map((item) => ({
    label: item.driverNm,
    value: item.driverId,
  })) || [],
});
const useOptionDivs = () => useQuery({
  queryKey: [resource, 'divs'],
  queryFn: () => api.divs(),
});

export {
  useOptionBases, useOptionCompanies, useOptionDivs, useOptionDrivers, useOptionParents,
};
