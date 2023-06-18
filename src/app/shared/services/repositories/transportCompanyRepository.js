import api from '~core/config/baseApi';

const resource = 'transport-companies';

export default {
  list(params) {
    return api.get(`/${resource}`, { params });
  },
  detail(id) {
    return api.get(`/${resource}/${id}`);
  },
  create(params) {
    return api.post(`/${resource}`, params);
  },
  update(params, id) {
    return api.patch(`/${resource}/${id}`, params);
  },
  delete(id) {
    return api.delete(`/${resource}/${id}`);
  },
};
