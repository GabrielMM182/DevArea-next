'use client';

import { usePasswordStore } from '@/store/password';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

// Função para determinar a cor baseada na força da senha
const getStrengthColor = (score: number) => {
  const strengthClasses = {
    0: 'text-red-600',
    1: 'text-orange-500',
    2: 'text-yellow-500',
    3: 'text-green-400',
    4: 'text-green-600'
  };
  return strengthClasses[score as keyof typeof strengthClasses] || strengthClasses[0];
};

// Função para obter o texto de força da senha
const getStrengthText = (score: number) => {
  const strengthTexts = {
    0: 'Muito Fraca',
    1: 'Fraca',
    2: 'Média',
    3: 'Forte',
    4: 'Muito Forte'
  };
  return strengthTexts[score as keyof typeof strengthTexts] || strengthTexts[0];
};

// Função para obter o valor de progresso
const getStrengthProgress = (score: number) => {
  return (score + 1) * 20; // 0-4 convertido para 20-100%
};

export function PasswordGenerator() {
  const {
    password,
    config,
    strength,
    error,
    setConfig,
    generateNewPassword,
  } = usePasswordStore();

  useEffect(() => {
    generateNewPassword();
  }, []);

  const handleLengthChange = (value: number[]) => {
    setConfig({ length: value[0] });
  };

  const handleCheckboxChange = (key: keyof typeof config) => {
    setConfig({ [key]: !config[key] });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Gerador de Senha</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Senha Gerada</Label>
          <div className="flex gap-2">
            <Input value={password} readOnly />
            <Button onClick={() => generateNewPassword()}>
              Gerar Nova
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Indicador de força da senha */}
        {strength && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Força da Senha:</Label>
              <span className={`${getStrengthColor(strength.score)} font-medium`}>
                {getStrengthText(strength.score)}
              </span>
            </div>
            <Progress value={getStrengthProgress(strength.score)} className="h-2" />
            
            {strength.feedback.warning && (
              <p className="text-red-500 text-sm mt-1">{strength.feedback.warning}</p>
            )}
            
            {strength.feedback.suggestions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Sugestões:</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  {strength.feedback.suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label>Tamanho: {config.length}</Label>
          <Slider
            value={[config.length]}
            onValueChange={handleLengthChange}
            min={4}
            max={50}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={config.includeNumbers}
              onCheckedChange={() => handleCheckboxChange('includeNumbers')}
            />
            <Label htmlFor="numbers">Incluir Números</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={config.includeSymbols}
              onCheckedChange={() => handleCheckboxChange('includeSymbols')}
            />
            <Label htmlFor="symbols">Incluir Símbolos</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={config.includeUppercase}
              onCheckedChange={() => handleCheckboxChange('includeUppercase')}
            />
            <Label htmlFor="uppercase">Incluir Maiúsculas</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={config.includeLowercase}
              onCheckedChange={() => handleCheckboxChange('includeLowercase')}
            />
            <Label htmlFor="lowercase">Incluir Minúsculas</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}