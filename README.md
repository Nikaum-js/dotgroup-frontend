# 🎬 Loja Virtual de Filmes

Uma loja virtual moderna e responsiva de filmes desenvolvida com Vue.js 3, integrada com a API do The Movie Database (TMDB). Este projeto foi desenvolvido como parte do desafio técnico para vaga de desenvolvedor frontend da Dotgroup.

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Catálogo de Filmes**: Exibição de filmes populares com informações detalhadas
- **Busca Inteligente**: Pesquisa de filmes em tempo real
- **Carrinho de Compras**: Sistema completo de carrinho lateral com controle de quantidade
- **Lista de Favoritos**: Adicionar/remover filmes dos favoritos com persistência local
- **Checkout Completo**: Processo de compra com validação de formulário
- **Responsividade**: Interface adaptável para desktop e mobile

### 🛒 Funcionalidades do Carrinho
- Adicionar filmes ao carrinho
- Controlar quantidade de cada item
- Remover itens individuais
- Visualizar total da compra
- Persistência dos dados durante a sessão

### ❤️ Sistema de Favoritos
- Marcar filmes como favoritos
- Página dedicada para visualizar favoritos
- Persistência no localStorage
- Contador de favoritos no header

### 💳 Processo de Checkout
- Formulário com validação completa
- Máscaras para CPF, telefone, CEP e e-mail
- Modal de confirmação de compra
- Modal de sucesso após finalização

## 🎯 Sobre o Cálculo de Preços

**⚠️ IMPORTANTE**: A API do TMDB não fornece informações de preço para os filmes. Por isso, foi implementado um sistema personalizado de cálculo de preços baseado na avaliação dos filmes.

### 💰 Como Funciona o Cálculo
O preço é calculado usando a seguinte fórmula:

```
Preço Final = Preço Base + (Avaliação ÷ 10) × Adicional Máximo
```

**Parâmetros:**
- **Preço Base**: R$ 20,00 (para todos os filmes)
- **Adicional Máximo**: R$ 30,00
- **Avaliação**: Nota do filme de 0 a 10 (vote_average da API)

**Exemplos:**
- Filme com nota 10.0: R$ 50,00 (20 + 30)
- Filme com nota 7.5: R$ 42,50 (20 + 22,50)
- Filme com nota 5.0: R$ 35,00 (20 + 15)
- Filme com nota 0.0: R$ 20,00 (20 + 0)

### 📍 Localização do Código
O cálculo de preço está implementado em `src/utils/price.ts`:

```typescript
export const calculateMoviePrice = (voteAverage: number): number => {
  const basePrice = 20;
  const maxAdditional = 30;
  const additional = (voteAverage / 10) * maxAdditional;
  return Number((Math.floor((basePrice + additional) * 100) / 100).toFixed(2));
};
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Vue Router** - Roteamento SPA
- **Vuex** - Gerenciamento de estado

### Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide Vue** - Ícones modernos
- **PostCSS** - Processamento de CSS

### API
- **TMDB API** - The Movie Database para dados dos filmes

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave da API do TMDB

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dotgroup-frontend.git
cd dotgroup-frontend
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure a API Key do TMDB

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_TMDB_API_KEY=sua_api_key_aqui
```

**Como obter a API Key:**
1. Acesse [TMDB](https://www.themoviedb.org/)
2. Crie uma conta gratuita
3. Vá em Configurações > API
4. Gere uma nova API Key
5. Cole a chave no arquivo `.env`

### 4. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CartSidebar.vue     # Carrinho lateral
│   ├── CheckoutForm.vue    # Formulário de checkout
│   ├── MovieCard.vue       # Card de filme
│   ├── Header.vue          # Cabeçalho
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── HomePage.vue        # Página inicial
│   ├── MovieDetailsPage.vue # Detalhes do filme
│   ├── CheckoutPage.vue    # Página de checkout
│   └── FavoritesPage.vue   # Página de favoritos
├── store/              # Gerenciamento de estado (Vuex)
│   └── index.ts           # Store principal
├── services/           # Serviços de API
│   └── api.ts            # Configuração do Axios
├── utils/              # Utilitários
│   └── price.ts          # Cálculo de preços
├── types/              # Tipos TypeScript
│   └── movie.ts          # Interfaces dos filmes
├── hooks/              # Composables
│   └── useMovies.ts      # Hook para filmes
└── router/             # Configuração de rotas
    └── index.ts          # Rotas da aplicação
```

## 🎨 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios
- [x] Framework Vue.js 3 com TypeScript
- [x] Layout responsivo das telas principais
- [x] Gerenciamento de estado com Vuex
- [x] Integração com API TMDB
- [x] Lista de filmes da API
- [x] Carrinho de compras funcional
- [x] Processo de checkout completo
- [x] Validação de formulário
- [x] Modal de sucesso

### ✅ Requisitos Desejáveis
- [x] Pesquisa de filmes
- [x] Máscaras nos campos (CPF, telefone, CEP, e-mail)
- [x] Sistema de favoritos completo
- [x] Persistência de dados no localStorage

### 🚀 Funcionalidades Extras
- [x] Skeleton loading para melhor UX
- [x] Tratamento de erros da API
- [x] Paginação de filmes
- [x] Contador de itens no carrinho
- [x] Animações e transições suaves
- [x] Design system consistente

## 📱 Páginas da Aplicação

### 🏠 Página Inicial (`/`)
- Exibe filmes populares
- Barra de pesquisa
- Paginação
- Botões para adicionar ao carrinho e favoritos

### 🎬 Detalhes do Filme (`/movie/:id`)
- Informações completas do filme
- Poster em alta resolução
- Avaliação e preço calculado
- Ações de carrinho e favoritos

### 🛒 Checkout (`/checkout`)
- Formulário completo de dados
- Validação em tempo real
- Resumo da compra
- Confirmação de pedido

### ❤️ Favoritos (`/favorites`)
- Lista de todos os filmes favoritos
- Opção de remover dos favoritos
- Adicionar ao carrinho direto da lista

## 🔍 Gerenciamento de Estado

O projeto utiliza **Vuex** para gerenciar:

### 🛒 Estado do Carrinho
- Lista de itens
- Quantidades
- Estado de abertura/fechamento
- Cálculo de totais

### ❤️ Estado dos Favoritos
- Lista de filmes favoritos
- Persistência no localStorage
- Controle de adição/remoção

## 🎯 Decisões de Arquitetura

### 💡 Cálculo de Preços Personalizado
Como a API do TMDB não fornece preços, foi implementado um sistema que:
- Usa a avaliação do filme como base
- Garante preços justos e proporcionais à qualidade
- Mantém um preço mínimo acessível (R$ 20,00)
- Permite filmes de alta qualidade terem preços premium

### 🏗️ Arquitetura Modular
- **Componentes**: Reutilizáveis e focados em responsabilidade única
- **Composables**: Lógica compartilhada entre componentes
- **Store**: Gerenciamento centralizado de estado
- **Services**: Abstração da camada de API
- **Types**: Tipagem forte com TypeScript

### 🎨 Design System
- **Tailwind CSS**: Utilidade-first para consistência
- **Responsividade**: Mobile-first approach
- **Acessibilidade**: Cores contrastantes e navegação por teclado
- **Performance**: Lazy loading e otimizações

## 🚀 Build e Deploy

### Produção
```bash
npm run build
# ou
yarn build
```

### Preview da Build
```bash
npm run preview
# ou
yarn preview
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview da build de produção

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de um desafio técnico. Sugestões e melhorias são sempre bem-vindas!

## 📄 Licença

Este projeto é privado e foi desenvolvido para fins de avaliação técnica.

---
