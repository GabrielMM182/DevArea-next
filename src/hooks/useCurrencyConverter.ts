import { useState } from 'react';
import { convertCurrency, type ConversionResult } from '@/services/currency';

export interface UseCurrencyConverterProps {
  onSuccess?: (result: ConversionResult) => void;
  onError?: (error: Error) => void;
}

export function useCurrencyConverter({ onSuccess, onError }: UseCurrencyConverterProps = {}) {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleConvert(valor: number, de: string, para: string) {
    setLoading(true);
    setError(null);

    try {
      const result = await convertCurrency(valor, de, para);
      setResultado(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err as Error;
      setError('Erro ao converter moeda. Tente novamente.');
      onError?.(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    resultado,
    error,
    converter: handleConvert,
  };
} 