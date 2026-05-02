import { create } from 'zustand';

interface QueryState {
  history: string[];
  results: any[];
  addToHistory: (query: string) => void;
  setResults: (results: any[]) => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  history: [],
  results: [],
  addToHistory: (query) => set((state) => ({ history: [query, ...state.history] })),
  setResults: (results) => set({ results }),
}));
