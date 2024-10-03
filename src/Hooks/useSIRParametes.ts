import { create } from "zustand"

interface GlobalSIRParameter {
  data: SIRParameters;
  updateData: (newData: SIRParameters) => void;
  setInfection: (infection: number) => void;
  setRecuperation: (recuperation: number) => void;
  setPopulation: (population: number) => void;
  setInfected: (infected: number) => void;
}

export const useSIRParameters = create<GlobalSIRParameter>((set) => ({
  data: {
    infection: 0,
    recuperation: 0,
    population: 1000,
    infected: 1,
  },
  
  updateData: (newData: SIRParameters) => set({ data: newData }),

  setInfection: (infection: number) =>
    set((state) => ({
      data: {
        ...state.data,
        infection,
      },
    })),

  setRecuperation: (recuperation: number) =>
    set((state) => ({
      data: {
        ...state.data,
        recuperation,
      },
    })),

  setPopulation: (population: number) =>
    set((state) => ({
      data: {
        ...state.data,
        population,
      },
    })),
		
  setInfected: (infected: number) =>
    set((state) => ({
      data: {
        ...state.data,
        infected,
      },
    })),
}))