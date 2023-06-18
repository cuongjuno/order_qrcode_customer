// eslint-disable-next-line no-unused-vars
const removeEmpty = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
const trim = (obj) => {
  const result = {};
  Object.keys(obj).forEach((k) => {
    const value = obj[k];
    result[k] = typeof value === 'string' ? value?.trim() : value;
  });
  return result;
};
export default { removeEmpty, trim };
