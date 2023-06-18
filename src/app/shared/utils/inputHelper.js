const filterOptionDefault = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export default { filterOptionDefault };
