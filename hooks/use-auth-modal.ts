import { create } from 'zustand';

type ModalStore = {
  modalType: 'login' | 'register' | null;
  isOpen: boolean;
  isToggle: boolean;
  onOpen: (type: 'login' | 'register') => void;
  onClose: () => void;
  toggle: () => void;
  authModal: () => void;
};

const useModal = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  isToggle: false,

  onOpen: (type: 'login' | 'register') =>
    set({ modalType: type, isOpen: true }),
  onClose: () => set({ modalType: null, isOpen: false }),
  toggle: () => set((state) => ({ isToggle: !state.isToggle })),
  authModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModal;
