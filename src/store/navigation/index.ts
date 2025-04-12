import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface NavigationState {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export const useNavigationStore = create<NavigationState>()(
  devtools((set) => ({
    currentPath: '/',
    setCurrentPath: (path) => set({ currentPath: path }),
  }), { name: 'navigation-store' })
); 