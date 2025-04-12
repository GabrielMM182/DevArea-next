import { create } from 'zustand';

interface ReadmeData {
  projectName: string;
  description: string;
  technologies: string;
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  features: string;
  prerequisites: string;
  testing: string;
  includeFeatures: boolean;
  includePrerequisites: boolean;
  includeTesting: boolean;
}

interface ReadmeStore {
  readmeData: ReadmeData;
  updateReadmeData: (data: Partial<ReadmeData>) => void;
  resetReadmeData: () => void;
}

const initialReadmeData: ReadmeData = {
  projectName: '',
  description: '',
  technologies: '',
  installation: '',
  usage: '',
  contributing: '',
  license: '',
  features: '',
  prerequisites: '',
  testing: '',
  includeFeatures: false,
  includePrerequisites: false,
  includeTesting: false,
};

export const useReadmeStore = create<ReadmeStore>((set) => ({
  readmeData: initialReadmeData,
  updateReadmeData: (data) => 
    set((state) => ({ 
      readmeData: { ...state.readmeData, ...data } 
    })),
  resetReadmeData: () => set({ readmeData: initialReadmeData }),
})); 