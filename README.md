# Template Next.js com App Router

Este é um template ilustrativo para o Next.js utilizando o App Router mais recente, TypeScript, Tailwind CSS e várias outras tecnologias modernas. O projeto demonstra conceitos-chave como Server Components, Client Components e Roteamento Dinâmico.

## Tecnologias Incluídas

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Estilização**: 
  - Tailwind CSS 
  - shadcn-ui (biblioteca de componentes)
- **Gerenciamento de Estado**: Zustand
- **Requisições & Cache**:
  - Axios
  - TanStack React Query v5
- **Formulários & Validação**:
  - React Hook Form
  - Zod

## Estrutura do Projeto

O projeto segue a estrutura do App Router do Next.js:

- `/src/app`: Rotas e páginas da aplicação
  - `/ssr-example`: Exemplo de Server-Side Rendering
  - `/client-example`: Exemplo de Client Components
  - `/items/[itemId]`: Exemplo de rota dinâmica
- `/src/components`: Componentes reutilizáveis
  - `/ui`: Componentes do shadcn-ui
- `/src/lib`: Utilidades e funções auxiliares
- `/src/store`: Stores Zustand para gerenciamento de estado

## Exemplos Incluídos

- **Server-Side Rendering**: Demonstração de fetching de dados no servidor
- **Client Components**: Interatividade com useState e Zustand
- **Roteamento Dinâmico**: Como receber e usar parâmetros de URL

## Como Usar

Para executar este projeto localmente:

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Visite `http://localhost:3000` para ver a aplicação.

## Aprendizado

Este template é projetado para ajudar a entender os principais conceitos do Next.js App Router:

- **Server Components vs Client Components**: Quando usar cada um
- **Data Fetching no Servidor**: Como buscar dados no servidor com segurança
- **Roteamento Dinâmico**: Como criar rotas com parâmetros dinâmicos
- **Gerenciamento de Estado**: Como usar Zustand para estado global
- **Provedores**: Como configurar React Query e outros provedores

## Licença

Este projeto é distribuído sob a licença MIT.
