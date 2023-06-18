export const cache = {
  set(key, value) {
    return localStorage.setItem(key, value);
  },
  get(key) {
    return localStorage.getItem(key);
  },

  setJson(key, valueJson) {
    return localStorage.setItem(key, JSON.stringify(valueJson));
  },
  getJson(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : null;
  },

  remove(key) {
    return localStorage.removeItem(key);
  },
};

export const sessionCache = {
  set(key, value) {
    return sessionStorage.setItem(key, value);
  },
  get(key) {
    return sessionStorage.getItem(key);
  },
  remove(key) {
    return sessionStorage.removeItem(key);
  },
};
