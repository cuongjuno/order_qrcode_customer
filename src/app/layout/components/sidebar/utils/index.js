const flattenMenuList = (list) => {
  let flattenedMenuList = [];

  list.forEach((item) => {
    const { children, ...rest } = item;
    flattenedMenuList.push(rest);

    if (children) {
      flattenedMenuList = flattenedMenuList.concat(flattenMenuList(children));
    }
  });

  return flattenedMenuList;
};

const getSelectedKey = (path, menuList) => {
  const menuFlatten = flattenMenuList(menuList);
  const result = menuFlatten.find((item) => item?.label?.props?.to === path);
  return result?.key;
};

export default getSelectedKey;
