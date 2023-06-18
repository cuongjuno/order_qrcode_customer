import api from '~core/config/baseApi';

const resource = 'users';

export default {
  profile() {
    return api.get(`/${resource}/profile`);
  },
  profileUpdate(params) {
    return api.patch(`/${resource}/profile`, params);
  },
  list(params) {
    return api.get(`/${resource}`, { params });
  },
  delete(id) {
    return api.delete(`/${resource}/${id}`);
  },
  create(params) {
    return api.post(`/${resource}`, params);
  },
  update(params, id) {
    return api.patch(`/${resource}/${id}`, params);
  },
  updateNewPassword(id) {
    return api.patch(`/${resource}/${id}/init-password`);
  },
};
