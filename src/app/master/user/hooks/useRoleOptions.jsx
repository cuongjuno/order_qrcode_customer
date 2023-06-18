import { useMemo } from 'react';

import ROLES from '~constant/roles';
import useProfile from '~hooks/useProfile';
import { useRoleDivList } from '~query-hooks/divQuery';

function useRoleOptions() {
  const { data: roles } = useRoleDivList();

  const {
    isCariageComp, isTransportComp, isKyotoSpacer, isSystemAdmin,
  } = useProfile();

  const roleOptions = useMemo(() => {
    const result = roles?.filter((role) => {
      if (isKyotoSpacer) {
        return ![ROLES.SYSTEM_ADMIN, ROLES.CARRIAGE_COMPANY].includes(role.value);
      }
      if (isTransportComp) {
        const accessRoles = [ROLES.TRANSPORT_COMPANY, ROLES.CARRIAGE_COMPANY];
        return accessRoles.includes(role.value);
      }
      if (isCariageComp) {
        return role.value === ROLES.CARRIAGE_COMPANY;
      }
      return true;
    });
    return result;
  }, [isCariageComp, isTransportComp, isKyotoSpacer, isSystemAdmin, roles]);
  return roleOptions;
}

export default useRoleOptions;
