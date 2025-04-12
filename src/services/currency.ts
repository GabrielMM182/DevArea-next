export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  result: number;
  rate: number;
  lastUpdate: string;
  nextUpdate: string;
}

/**
 * Obtém as taxas de câmbio atualizadas para uma moeda base
 */
export async function getExchangeRate(currency: string): Promise<ExchangeRateResponse> {
  try {
    const response = await fetch(`/api/exchange-rates/${currency.toUpperCase()}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao obter taxas de câmbio: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Falha ao obter taxas de câmbio:', error);
    throw new Error('Não foi possível obter as taxas de câmbio. Tente novamente mais tarde.');
  }
}

/**
 * Converte um valor de uma moeda para outra usando taxas de câmbio atualizadas
 */
export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<number> => {
  try {
    // Obter as taxas atualizadas da API
    const exchangeData = await getExchangeRate(from);
    const rate = exchangeData.conversion_rates[to.toUpperCase()];
    
    if (!rate) {
      throw new Error(`Taxa de câmbio não encontrada para ${to}`);
    }
    
    // Calcular o valor convertido
    const result = amount * rate;
    
    // Retornar com 2 casas decimais
    return Number(result.toFixed(2));
  } catch (error) {
    console.error('Erro na conversão:', error);
    throw new Error('Erro ao converter moeda. Verifique as moedas selecionadas e tente novamente.');
  }
}; 