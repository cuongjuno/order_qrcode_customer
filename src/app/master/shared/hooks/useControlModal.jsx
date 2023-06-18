import { useAtom } from 'jotai';

import { TYPE_VIEW } from '../constant';
import { typeViewAtom } from '../store';

function useControlModal() {
  const [typeView, setTypeView] = useAtom(typeViewAtom);
  const isOpen = typeView === TYPE_VIEW.CREATE || typeView === TYPE_VIEW.UPDATE;

  const openModalCreate = () => {
    setTypeView(TYPE_VIEW.CREATE);
  };
  const openModalUpdate = () => {
    setTypeView(TYPE_VIEW.UPDATE);
  };
  const closeModal = () => {
    setTypeView(TYPE_VIEW.LIST);
  };
  return {
    openModalCreate,
    openModalUpdate,
    closeModal,
    isOpen,
  };
}

export default useControlModal;
