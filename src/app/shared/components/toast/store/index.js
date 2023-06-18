import { atom } from 'jotai';

import TOAST_TYPE from '../constant';

const toastAtom = atom({ message: '', type: TOAST_TYPE.SUCCESS });

export default toastAtom;
