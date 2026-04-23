import { create } from "zustand";
import { Period } from "../types";

interface AppState {
  currentPeriod: Period;
  setPeriod: (period: Period) => void;
  selectedEntity: string | null;
  setSelectedEntity: (entityId: string | null) => void;
  alertCount: number;
  setAlertCount: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPeriod: "mtd",
  setPeriod: (period) => set({ currentPeriod: period }),
  selectedEntity: null,
  setSelectedEntity: (entityId) => set({ selectedEntity: entityId }),
  alertCount: 6,
  setAlertCount: (count) => set({ alertCount: count }),
}));
