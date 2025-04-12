import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { convertCurrency, getExchangeRate } from '@/services/currency';
import { currencySchema } from '@/utils/validations';

export interface CurrencyState {
  amount: number;
  from: string;
  to: string;
  result: number | null;
  exchangeRate: number | null;
  lastUpdated: string | null;
  error: string | null;
  isLoading: boolean;
  setAmount: (amount: number) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  convert: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>()(
  devtools((set, get) => ({
    amount: 1,
    from: 'USD',
    to: 'BRL',
    result: null,
    exchangeRate: null,
    lastUpdated: null,
    error: null,
    isLoading: false,
    setAmount: (amount) => set({ amount, error: null }),
    setFrom: (from) => {
      // Reset result when changing currencies
      set({ from, result: null, exchangeRate: null, error: null });
    },
    setTo: (to) => {
      // Reset result when changing currencies
      set({ to, result: null, exchangeRate: null, error: null });
    },
    convert: async () => {
      try {
        set({ isLoading: true, error: null });
        const { amount, from, to } = get();

        // Validar dados usando Zod
        await currencySchema.parseAsync({ amount, from, to });
        
        // Obter taxas de câmbio
        const exchangeData = await getExchangeRate(from);
        const rate = exchangeData.conversion_rates[to.toUpperCase()];
        
        if (!rate) {
          throw new Error(`Taxa de câmbio não encontrada para ${to}`);
        }
        
        // Calcular resultado
        const result = amount * rate;
        
        // Atualizar o state com o resultado e informações adicionais
        set({ 
          result: Number(result.toFixed(2)), 
          exchangeRate: Number(rate.toFixed(4)),
          lastUpdated: exchangeData.time_last_update_utc,
          error: null
        });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'Ocorreu um erro ao converter a moeda' });
        }
      } finally {
        set({ isLoading: false });
      }
    }
  }), { name: 'currency-store' })
); 