import { z } from 'zod';

export const urlSchema = z.object({
  url: z.string()
    .url('URL inválida')
    .min(1, 'URL não pode estar vazia'),
});

export const currencySchema = z.object({
  amount: z.number()
    .min(1, 'O valor deve ser maior que 1')
    .positive('O valor deve ser positivo'),
  from: z.string()
    .min(3, 'Código da moeda deve ter 3 caracteres')
    .max(3, 'Código da moeda deve ter 3 caracteres')
    .toUpperCase(),
  to: z.string()
    .min(3, 'Código da moeda deve ter 3 caracteres')
    .max(3, 'Código da moeda deve ter 3 caracteres')
    .toUpperCase(),
}).refine((data) => data.from !== data.to, {
  message: 'As moedas de origem e destino devem ser diferentes',
  path: ['to'],
});

export const passwordSchema = z.object({
  length: z.number()
    .min(4, 'O tamanho mínimo da senha é 4 caracteres')
    .max(50, 'O tamanho máximo da senha é 50 caracteres'),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
}).refine((data) => {
  return data.includeNumbers || data.includeSymbols || 
         data.includeUppercase || data.includeLowercase;
}, {
  message: 'Selecione pelo menos um tipo de caractere',
  path: ['includeNumbers'],
}); 