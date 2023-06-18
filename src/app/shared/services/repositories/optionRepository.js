import api from '~core/config/baseApi';

const resource = 'select';

export default {
  basesList() {
    return api.get(`/${resource}/bases`);
  },
  companiesList() {
    return api.get(`/${resource}/companies`);
  },
  parentsList() {
    return api.get(`/${resource}/parents`);
  },
  driversList(params) {
    return api.get(`/${resource}/drivers`, { params });
  },
  divs() {
    return api.get(`/${resource}/divs`);
  },
};
