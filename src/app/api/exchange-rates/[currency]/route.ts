import { NextResponse } from 'next/server';

const API_KEY = process.env.EXCHANGE_RATES_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export async function GET(
  request: Request,
  { params }: { params: { currency: string } }
) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key não configurada' },
        { status: 500 }
      );
    }

    const currency = params.currency;
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/latest/${currency}`,
      {
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Falha ao obter taxas de câmbio' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API de câmbio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 