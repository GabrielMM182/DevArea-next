import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generatePassword, checkPasswordStrength, PasswordStrength } from '@/services/password';
import { passwordSchema } from '@/utils/validations';

export interface PasswordState {
  password: string;
  config: {
    length: number;
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeUppercase: boolean;
    includeLowercase: boolean;
  };
  strength: PasswordStrength | null;
  error: string | null;
  setConfig: (config: Partial<PasswordState['config']>) => void;
  generateNewPassword: () => Promise<void>;
}

export const usePasswordStore = create<PasswordState>()(
  devtools((set, get) => ({
    password: '',
    config: {
      length: 12,
      includeNumbers: true,
      includeSymbols: true,
      includeUppercase: true,
      includeLowercase: true,
    },
    strength: null,
    error: null,
    setConfig: (config) => set((state) => ({
      config: { ...state.config, ...config },
      error: null,
    })),
    generateNewPassword: async () => {
      try {
        const config = get().config;
        const validatedConfig = await passwordSchema.parseAsync(config);
        const newPassword = generatePassword(validatedConfig);
        const passwordStrength = checkPasswordStrength(newPassword);
        
        set({ 
          password: newPassword, 
          strength: passwordStrength,
          error: null 
        });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message });
        }
      }
    }
  }), { name: 'password-store' })
); 