'use client';

import { useCurrencyStore } from '@/store/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownIcon, RotateCwIcon } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'Dólar Americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Real Brasileiro' },
  { code: 'GBP', name: 'Libra Esterlina' },
  { code: 'JPY', name: 'Iene Japonês' },
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
              value={amount || ''}
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
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 z-10 border rounded-full bg-background"
              onClick={handleSwapCurrencies}
            >
              <RotateCwIcon className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="to">Para</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger id="to">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
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
                {amount} {from} = {result} {to}
              </h3>
              {exchangeRate && (
                <p className="text-sm text-center">
                  1 {from} = {exchangeRate} {to}
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