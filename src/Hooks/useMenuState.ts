import { create } from "zustand"

interface GlobalMenuState {
	isMenuOpen: boolean;
	updateMenuState: (isMenuOpen: boolean) => void;
}

export const useMenuState = create<GlobalMenuState>((set) => ({
  isMenuOpen: false,
  updateMenuState: (isMenuOpen: boolean) => set({ isMenuOpen })
}))