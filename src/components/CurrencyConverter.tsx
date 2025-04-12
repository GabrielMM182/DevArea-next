'use client';

import { useCurrencyStore } from '@/store/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightIcon } from 'lucide-react';

// Adicionando emojis de bandeiras para cada moeda
const CURRENCIES = [
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳' },
  { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷' },
];

export function CurrencyConverter() {
  const {
    amount,
    from,
    to,
    result,
    exchangeRate,
    lastUpdated,
    error,
    isLoading,
    setAmount,
    setFrom,
    setTo,
    convert,
  } = useCurrencyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await convert();
  };

  const handleSwapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Formatar data de última atualização
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Formatar para exibir sempre 2 casas decimais
  const formatAmount = (value: number) => {
    return value === 0 ? '0.00' : value.toString();
  };

  // Obter a bandeira para um código de moeda
  const getCurrencyFlag = (code: string) => {
    const currency = CURRENCIES.find(c => c.code === code);
    return currency ? currency.flag : '';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Conversor de Moedas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formatAmount(amount)}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-2">
              <Label htmlFor="from">De</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger id="from">
                  <SelectValue placeholder="Selecione">
                    {from && (
                      <span className="flex items-center">
                        <span className="mr-2 text-base">{getCurrencyFlag(from)}</span>
                        {from}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="flex items-center"
                    >
                      <span className="mr-2 text-base">{currency.flag}</span>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center absolute left-1/2 top-8 -translate-x-1/2 z-10">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleSwapCurrencies}
                className="h-8 w-8 rounded-full bg-background border shadow-sm"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-90 sm:rotate-0" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">Para</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger id="to">
                  <SelectValue placeholder="Selecione">
                    {to && (
                      <span className="flex items-center">
                        <span className="mr-2 text-base">{getCurrencyFlag(to)}</span>
                        {to}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem 
                      key={currency.code} 
                      value={currency.code}
                      className="flex items-center"
                    >
                      <span className="mr-2 text-base">{currency.flag}</span>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Convertendo...' : 'Converter'}
          </Button>
        </form>

        {result !== null && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-lg mb-2 text-center">
                <span className="mr-1">{getCurrencyFlag(from)}</span>
                {amount} {from} = <span className="mr-1">{getCurrencyFlag(to)}</span>{result} {to}
              </h3>
              {exchangeRate && (
                <p className="text-sm text-center">
                  <span className="mr-1">{getCurrencyFlag(from)}</span>
                  1 {from} = <span className="mr-1">{getCurrencyFlag(to)}</span>{exchangeRate} {to}
                </p>
              )}
              {lastUpdated && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Última atualização: {formatDate(lastUpdated)}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 