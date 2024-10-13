import { create } from "zustand";

const useAttachment = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
  
  export default useAttachment;