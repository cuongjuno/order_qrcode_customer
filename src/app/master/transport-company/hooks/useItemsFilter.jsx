import { useMemo } from 'react';

import { FORM_FILTER_TYPES } from '~components/form/constant';
import useProfile from '~hooks/useProfile';
import { useOptionBases, useOptionCompanies, useOptionParents } from '~query-hooks/optionQuery';

function useItemsFilter() {
  const { data: optionBases } = useOptionBases();
  const { data: optionCompanies } = useOptionCompanies();
  const { data: optionParents } = useOptionParents();
  const { isSystemAdmin } = useProfile();
  const span = isSystemAdmin ? 8 : 12;
  const itemsFilter = useMemo(
    () => [
      {
        type: FORM_FILTER_TYPES.SELECT,
        name: 'transportCompanyId',
        label: '運送会社名称',
        options: optionCompanies,
        colProps: {
          span,
        },
      },
      {
        type: FORM_FILTER_TYPES.SELECT,
        name: 'baseId',
        label: '拠点名称',
        options: optionBases,
        colProps: {
          span,
        },
      },
      ...(isSystemAdmin
        ? [
          {
            type: FORM_FILTER_TYPES.SELECT,
            name: 'parentCompanyId',
            label: '親会社名称',
            options: optionParents,
            colProps: {
              span,
            },
          },
        ]
        : []),
    ],
    [isSystemAdmin, optionBases?.length, optionCompanies?.length, optionParents?.length],
  );
  return itemsFilter;
}

export default useItemsFilter;
