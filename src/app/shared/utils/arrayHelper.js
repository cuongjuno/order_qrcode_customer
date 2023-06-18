const getLabel = (value, array) => array?.find((e) => e?.value === value)?.label || '';

export default {
  getLabel,
};
