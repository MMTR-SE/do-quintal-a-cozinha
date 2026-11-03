# Do Quintal a Cozinha

Do Quintal a Cozinha é uma aplicação de software livre, desenvolvido pelas e para as mulheres do MMTR-SE (Movimento da Mulher Trabalhadora Rural de Sergipe) em parceria com [Intervozes](https://intervozes.org.br/), [Coolab](https://coolab.org) e muitas mão e corações.

## 🚀 Sobre o Projeto

Este projeto é uma iniciativa do MMTR-SE para dar visibilidade à lida das mulheres do movimento em muitos campos.
Amostra para mundo as suas histórias, suas criações, suas produções e inspirações, onde se possa ter um cantinho para fuxicar além de contar com a ajuda de uma ajudante virtual, conectando o que elas querem inserir ao site de uma forma mais inclusiva

## 🛠️ Tecnologias

Estamos utilizando nesse projeto:

- Next.js
- Node.js
- Prisma (ORM)
- SQLite (Banco de dados)
- Docker (opcional)

Caso queira saber mais informações sobre como nosso código está estruturado, visite nossa [wiki](https://github.com/catuaba07/do-quintal-a-cozinha/wiki/Estrutura-do-c%C3%B3digo)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/catuaba07/do-quintal-a-cozinha.git
cd do-quintal-a-cozinha
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o Prisma e o banco de dados SQLite:

```bash
# Execute as migrações do banco de dados
npx prisma migrate dev

# Gere os tipos do Prisma
npx prisma generate
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em: http://localhost:3000

## 📦 Configuração do Banco de Dados

O projeto utiliza Prisma como ORM e SQLite como banco de dados. O arquivo de configuração do banco de dados está localizado em `prisma/schema.prisma`.

Para gerenciar o banco de dados, você pode usar os seguintes comandos:

```bash
# Visualizar o banco de dados usando Prisma Studio
npx prisma studio

# Criar uma nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações pendentes
npx prisma migrate deploy
```

> **Observação:** O arquivo do banco de dados SQLite será criado automaticamente na pasta `prisma` após a primeira migração.

## 🐳 Usando Docker (Opcional)

Se preferir usar Docker, certifique-se de ter o Docker Compose instalado e execute:

```bash
docker compose -f docker/desenvolvimento/docker-compose.yml up -d
```

O site estará disponível em: http://localhost:3001

> **Observação:** O Docker está configurado com hot-reload, ou seja, as alterações no código serão automaticamente refletidas no site.

## 📝 CMS - Gerenciamento de Conteúdo

O projeto utiliza **Strapi** como CMS headless para gerenciar conteúdos dinâmicos (produtos, receitas e histórias).

### Iniciar o Strapi

```bash
# Na raiz do projeto
npm run cms:dev
```

Acesse o painel administrativo em: http://localhost:1337/admin

### Primeiro Acesso

1. No primeiro acesso, você precisará criar uma conta de administrador
2. Configure os tipos de conteúdo (Content Types) conforme necessário
3. Crie um API Token em **Settings → API Tokens** para integrar com o Next.js

Para a configuração dos campos, permissões e integração com o Next.js, consulte [`cms/README.md`](cms/README.md) e [`cms/INTEGRATION.md`](cms/INTEGRATION.md).

## 🤝 Contribuidores

Agradecemos a todas as pessoas que contribuíram para este projeto:

- [@joanasouza](https://github.com/joanasouza)
- [@gustavogalo](https://github.com/gustavogalo)
- [@Luisotee](https://github.com/Luisotee)
- Jullie
- [henmohr](https://github.com/henmohr)
- Cris
- telemias
