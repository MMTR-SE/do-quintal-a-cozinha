# Do Quintal a Cozinha

  Aplicativo desenvolvido pelas e paras as mulheres do MMTR-SE

![](https://md.coolab.org/uploads/upload_122e84e11ea4901d32b1e0307c692e01.png)


Aplicativo desenvolvido pelas mulheres do MMTR-SE (Movimento da Mulher Trabalhadora Rural de Sergipe).

## 🚀 Sobre o Projeto

Este projeto é uma iniciativa do MMTR-SE para conectar produtoras rurais com consumidores, promovendo a comercialização direta de produtos do quintal à cozinha.

## 🛠️ Tecnologias

- Next.js
- Node.js
- Prisma (ORM)
- SQLite (Banco de dados)
- Docker (opcional)

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

O projeto utiliza **Strapi** como CMS headless para gerenciar conteúdos dinâmicos.

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

Para mais detalhes, consulte a [documentação do CMS](./cms/README.md).

## 🤝 Contribuidores

Agradecemos a todas as pessoas que contribuíram para este projeto:

- [@josantostd](https://github.com/josantostd)
- [@gustavogalo](https://github.com/gustavogalo)
- [@Luisotee](https://github.com/Luisotee)
- Jullie
- hmohr
- Cris
- telemias
