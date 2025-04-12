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

export const apiValidatorSchema = z.object({
  id: z.string().optional(),
  url: z.string()
    .url('URL inválida')
    .min(1, 'URL não pode estar vazia'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], {
    errorMap: () => ({ message: 'Método HTTP inválido' })
  }),
  headers: z.array(z.object({
    key: z.string().min(1, 'Nome do header é obrigatório'),
    value: z.string().min(1, 'Valor do header é obrigatório')
  })),
  body: z.string().optional(),
  createdAt: z.date().optional()
}).refine((data) => {
  if (['POST', 'PUT', 'PATCH'].includes(data.method) && !data.body) {
    return false;
  }
  return true;
}, {
  message: 'Body é obrigatório para métodos POST, PUT e PATCH',
  path: ['body']
});

export const graphqlValidatorSchema = z.object({
  id: z.string().optional(),
  url: z.string()
    .url('URL inválida')
    .min(1, 'URL não pode estar vazia'),
  headers: z.array(z.object({
    key: z.string().min(1, 'Nome do header é obrigatório'),
    value: z.string().min(1, 'Valor do header é obrigatório')
  })),
  query: z.string().min(1, 'Query GraphQL é obrigatória'),
  variables: z.string().optional(),
  operationName: z.string().optional(),
  createdAt: z.date().optional()
});

export type ApiValidatorRequest = z.infer<typeof apiValidatorSchema>;
export type GraphQLValidatorRequest = z.infer<typeof graphqlValidatorSchema>; 