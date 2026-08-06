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

O projeto utiliza Strapi para gerenciar produtos, receitas e histórias.

```bash
npm run cms:dev
```

Acesse `http://localhost:1337/admin`, crie e publique os registros nos content types `Produto`, `Receita` e `História`. Para a configuração dos campos, permissões e integração com o Next.js, consulte [`cms/README.md`](cms/README.md) e [`cms/INTEGRATION.md`](cms/INTEGRATION.md).


## Como funciona

![](https://md.coolab.org/uploads/upload_122e84e11ea4901d32b1e0307c692e01.png)

A aplicação está dividida em 4 grandes sessões:
- Nossa Produção
- Nossas Histórias
- Nossas Receitas
- Nosso Espaço

### Nossa Produção
Está é uma sessão publica, que lista a produção feita pelas mulheres. O cadastro dos produtos é feito via API. Estamos usando o projeto
[typebot](https://typebot.io/) como ferramenta de CMS, onde uma conversa entre a produtora e um bot hospedado na nossa infraestrutura captura e preenche o banco de dados com as informações.
O typebot está conectado com esta outra ferramenta, [typebot-client-whatsapp](https://github.com/Luisotee/typebot-client-whatsapp), que a cada etapa da conversa envia os dados para API de **Nossa Produçao**.
Mais detalhes na wiki.

### Nossas Histórias

Assim como **Nossa Produçao** visa amostrar a produção, **Nossas Histórias** tem o intuito de amostrar as histórias das mulheres que fazem parte do movimento para assim inspirar outras mulheres além de ser uma ferramenta de documentação e empoderamento. Contar e ouvir nossa própria história nos ajuda a rever o caminho por onde passamos, como foi o desdobramento e isso é um alicerce para o futuro.
Os dados apresentados nessa sessão também segue a linha de **Nossa Produção**, os dados são enviados via API através de uma conversa com a ajudante virtual (chatbot)
Veja na wiki como configurar o chatbot.
Seguimos trabalhando em uma interface de CMS agnostica ao chatbot.

### Nossas Receitas

Este é um espaço dedicado para apresentar as receitas selecionadas pelas mulheres do movimento.
Receitas caseiras e tradicionais, pertencente às suas famílias e ao território que elas ocupam.
No mesmo princípio de facilitar a inserção dos dados, essas receitas são alimentadas via chatbot e também prevemos uma interface de CMS separada do bot.

### Nosso Espaço

Ainda em processo de exploração e testes, esta sessão incorporará um software externo à plataforma, oferecendo um espaço privado para a fuxicagem. Uma área onde a interação possa ser dada tanto através da voz quanto por texto. Um lugar onde possa ser um porto fora do uso do WhatsApp.

## Licença

Este projeto esta sob a licença [AGPL](https://pt.wikipedia.org/wiki/GNU_Affero_General_Public_License)
Fique a vontade em baixar, reproduzir, alterar e distribuir.

## 🤝 Contribuições

Quer mexer no código? Adicionar alguma funcionalidade? Encontrou algo quebrado? Da uma olhada na documentação na nossa wiki. 

Agradecemos a todas as pessoas que contribuíram para este projeto:

- [@josantostd](https://github.com/josantostd)
- [@gustavogalo](https://github.com/gustavogalo)
- [@Luisotee](https://github.com/Luisotee)
- Jullie
- [henmohr](https://github.com/henmohr)
- Cris
- telemias
