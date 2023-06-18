import { atomWithReset } from 'jotai/utils';

import LOGIN_STATUS_RENDER from '~login/constant';

const loginStatus = atomWithReset(LOGIN_STATUS_RENDER.LOGIN);
export default loginStatus;
