/* eslint-disable import/prefer-default-export */
import { atomWithReset } from 'jotai/utils';

import { TYPE_VIEW } from '../constant';

export const typeViewAtom = atomWithReset(TYPE_VIEW.LIST);
