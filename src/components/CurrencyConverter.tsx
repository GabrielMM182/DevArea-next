'use client';

import { Input } from '@/components/ui/input';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';

const MOEDAS = [
  { valor: 'USD', nome: 'Dólar Americano' },
  { valor: 'EUR', nome: 'Euro' },
  { valor: 'BRL', nome: 'Real Brasileiro' },
];

export function CurrencyConverter() {
  const { loading, resultado, error, converter } = useCurrencyConverter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const valor = Number(formData.get('valor'));
    const de = formData.get('de') as string;
    const para = formData.get('para') as string;

    await converter(valor, de, para);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Conversor de Moedas</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          id="valor"
          name="valor"
          label="Valor"
          step="0.01"
          required
          min="0"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="de" className="block text-sm font-medium text-gray-700">
              De
            </label>
            <select
              id="de"
              name="de"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="USD"
            >
              {MOEDAS.map((moeda) => (
                <option key={moeda.valor} value={moeda.valor}>
                  {moeda.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="para" className="block text-sm font-medium text-gray-700">
              Para
            </label>
            <select
              id="para"
              name="para"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="BRL"
            >
              {MOEDAS.map((moeda) => (
                <option key={moeda.valor} value={moeda.valor}>
                  {moeda.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Convertendo...' : 'Converter'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {resultado && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="text-lg font-medium text-green-800">Resultado</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              {resultado.amount} {resultado.from} = {' '}
              <span className="font-bold">
                {resultado.result.toFixed(2)} {resultado.to}
              </span>
            </p>
            <p className="mt-1">
              Taxa: {resultado.rate.toFixed(4)}
            </p>
            <p className="mt-1 text-xs">
              Última atualização: {new Date(resultado.lastUpdate).toLocaleString('pt-BR')}
            </p>
            <p className="mt-1 text-xs">
              Próxima atualização: {new Date(resultado.nextUpdate).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 