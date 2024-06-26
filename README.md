# Teste Prático IOT Nest

## Descrição do Projeto

Esta aplicação lista os dados dos campeonatos disponibilizados pela API fornecida. O usuário pode selecionar um campeonato e visualizar todas as rodadas desse campeonato, além de aplicar filtros por equipe e rodada.

## Funcionalidades

- Listar campeonatos disponíveis.
- Exibir todas as rodadas de um campeonato selecionado.
- Filtrar jogos por equipe.
- Filtrar jogos por rodada.
- Funcionar adequadamente em desktops e dispositivos móveis.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Configuração do Ambiente

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/WesleyDevCarvalho/teste-IotNest
```

2. Instale as dependências do projeto:

```bash
npm install
```


3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

VITE_API_BASE_URL=https://api.example.com 
VITE_TOKEN=seu-token-aqui


## Build da Solução

Para construir a aplicação para produção, execute:

```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist`.

## Deploy

Para fazer o deploy da aplicação, você pode usar qualquer serviço de hospedagem estática, como Vercel, Netlify, GitHub Pages, etc. Aqui está um exemplo de como fazer o deploy usando o Vercel:

1. Instale o Vercel CLI:

```bash
npm install -g vercel
```

2. Faça login no Vercel:

```bash
vercel login
```

3. Execute o comando de deploy:

```bash
vercel
```

Siga as instruções no terminal para completar o deploy.


## Instruções de Uso

1. Ao iniciar a aplicação, selecione um campeonato na lista de campeonatos disponíveis.
2. Após selecionar um campeonato, os filtros de equipe e rodada serão exibidos.
3. Use o filtro de equipe para visualizar os jogos de uma equipe específica.
4. Use o filtro de rodada para visualizar os jogos de uma rodada específica.
5. Os filtros de equipe e rodada podem ser usados em conjunto para filtrar os jogos de uma equipe em uma rodada específica.










