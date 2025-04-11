'use client';

import { useState } from 'react';
import { generateSecurePassword, checkPasswordStrength, PasswordStrength } from '@/services/password';
import { Input } from './ui/input';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    numbers: true,
    symbols: true,
    uppercase: true
  });
  const [strength, setStrength] = useState<PasswordStrength>({ score: 0, feedback: { warning: '', suggestions: [] }});
  const [error, setError] = useState<string>('');

  const handleGenerate = () => {
    try {
      const newPassword = generateSecurePassword({ length, ...options });
      setPassword(newPassword);
      setStrength(checkPasswordStrength(newPassword));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar senha');
      setPassword('');
      setStrength({ score: 0, feedback: { warning: '', suggestions: [] }});
    }
  };

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

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Password Generator</h2>
      
      <div className="space-y-4">
        <Input
          value={password}
          readOnly
          className="font-mono"
          placeholder="Generated password"
        />

        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={length}
            min={8}
            max={32}
            onChange={(e) => setLength(Number(e.target.value))}
            label="Length"
          />
        </div>

        <div className="space-y-2">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                className="rounded"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}

        <button
          onClick={handleGenerate}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm">Strength:</div>
              <div className={`${getStrengthColor(strength.score)} font-medium`}>
                {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strength.score]}
              </div>
            </div>
            {strength.feedback.warning && (
              <div className="text-red-600 text-sm">{strength.feedback.warning}</div>
            )}
            {strength.feedback.suggestions.map((suggestion, i) => (
              <div key={i} className="text-gray-600 text-sm">{suggestion}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}