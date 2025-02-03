import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  onConfirm: (() => void) | null;
  openModal: (onConfirm: () => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  onConfirm: null,
  openModal: (onConfirm) => set({ isOpen: true, onConfirm }),
  closeModal: () => set({ isOpen: false, onConfirm: null }),
}));
