import { create } from "zustand"

interface GlobalDay {
	day: number;
	updateDay: (day: number) => void;
}

export const useDay = create<GlobalDay>((set) => ({
  day: 0,
  updateDay: (day: number) => set({ day })
}))