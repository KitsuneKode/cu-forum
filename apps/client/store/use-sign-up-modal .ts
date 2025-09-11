import { create } from 'zustand'

type SignUpModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSignUpModal = create<SignUpModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
