import api from '~core/config/baseApi';

const resource = 'auth';

export default {
  login(params) {
    return api.post('/auth/sign-in', params);
  },
  resetPassword(params) {
    return api.post(`/${resource}/forgot-password`, params);
  },
};
