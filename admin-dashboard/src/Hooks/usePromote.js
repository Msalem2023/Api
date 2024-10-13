import { create } from "zustand";

const usePromoteModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
  
  export default usePromoteModal;