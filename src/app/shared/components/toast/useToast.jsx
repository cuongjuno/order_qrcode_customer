import { useSetAtom } from 'jotai';

import MESSAGE_TYPE from './constant';
import toastAtom from './store';

function useToast() {
  const setToast = useSetAtom(toastAtom);
  const success = (newMsg) => {
    setToast({
      message: newMsg,
      type: MESSAGE_TYPE.SUCCESS,
    });
  };
  const infor = (newMsg) => {
    setToast({
      message: newMsg,
      type: MESSAGE_TYPE.WARNING,
    });
  };
  const mError = (newMsg) => {
    setToast({
      message: newMsg,
      type: MESSAGE_TYPE.ERROR,
    });
  };
  return {
    success,
    infor,
    error: mError,
  };
}

export default useToast;
