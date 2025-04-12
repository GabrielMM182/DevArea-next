export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
  time_last_update_utc: string;
  time_next_update_utc: string;
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

export async function getExchangeRate(from: string): Promise<ExchangeRateResponse> {
  try {
    // Usando Server-Side API Route para proteger a chave
    const response = await fetch(`/api/exchange-rates/${from}`);
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Chave da API inválida ou expirada');
      }
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Erro ao obter taxa de câmbio:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Falha ao obter taxa de câmbio'
    );
  }
}

export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<ConversionResult> {
  const exchangeData = await getExchangeRate(from);
  const rate = exchangeData.conversion_rates[to];

  if (!rate) {
    throw new Error(`Taxa de câmbio não encontrada para ${to}`);
  }

  return {
    amount,
    from,
    to,
    result: amount * rate,
    rate,
    lastUpdate: exchangeData.time_last_update_utc,
    nextUpdate: exchangeData.time_next_update_utc,
  };
} 