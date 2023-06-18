import { useMutation } from '@tanstack/react-query';

import repositoryFactory from '../repositories/repositoryFactory';

const resource = 'auth';
const api = repositoryFactory[resource];

const useAuthLogin = () => useMutation({
  mutationKey: [resource, 'login'],
  mutationFn: (params) => api.login(params),
});

const useAuthResetPass = () => useMutation({
  mutationKey: [resource, 'reset-password'],
  mutationFn: (params) => api.resetPassword(params),
});

export { useAuthLogin, useAuthResetPass };
