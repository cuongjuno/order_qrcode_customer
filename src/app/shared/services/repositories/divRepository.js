import api from '~core/config/baseApi';

const resource = 'div';

export default {
  list() {
    return api.get(`/${resource}/role-div`);
  },
};
