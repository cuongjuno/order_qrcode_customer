import { useQuery } from '@tanstack/react-query';

import repositoryFactory from '../repositories/repositoryFactory';

const resource = 'div';
const api = repositoryFactory[resource];

const useRoleDivList = () => useQuery({
  queryKey: [resource, 'role-div'],
  queryFn: () => api.list(),
  select: ({ data }) => {
    const listRole = data.map((item) => ({ label: item.divValueNm, value: item.divValue }));
    return listRole || [];
  },
});

// eslint-disable-next-line import/prefer-default-export
export { useRoleDivList };
