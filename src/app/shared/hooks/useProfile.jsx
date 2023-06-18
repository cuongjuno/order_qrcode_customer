import ROLES from '~constant/roles';
import { useUserProfile } from '~query-hooks/userQuery';

function useProfile() {
  const { data } = useUserProfile();
  const profile = data?.data;
  const role = profile?.roleDiv;
  const isSystemAdmin = role === ROLES.SYSTEM_ADMIN;
  const isKyotoSpacer = role === ROLES.KYOTO_SPACER;
  const isTransportComp = role === ROLES.TRANSPORT_COMPANY;
  const isCariageComp = role === ROLES.CARRIAGE_COMPANY;

  return {
    profile,
    role,
    isSystemAdmin,
    isKyotoSpacer,
    isTransportComp,
    isCariageComp,
  };
}

export default useProfile;
