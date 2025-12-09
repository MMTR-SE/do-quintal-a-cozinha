# Strapi CMS - Do Quintal a Cozinha

CMS Headless para gerenciamento de conteúdo do projeto MMTR-SE.

## 🚀 Início Rápido

### Desenvolvimento

```bash
# Na raiz do projeto
npm run cms:dev

# Ou diretamente no diretório cms/
cd cms
npm run develop
```

O painel administrativo estará disponível em: **http://localhost:1337/admin**

### Primeiro Acesso

1. Acesse http://localhost:1337/admin
2. Crie sua conta de administrador no primeiro acesso
3. Configure os tipos de conteúdo (Content Types)

## 📦 Banco de Dados

O Strapi está configurado com **SQLite** (arquivo `.tmp/data.db`) para facilitar o desenvolvimento. Para produção, recomenda-se PostgreSQL ou MySQL.

## 🔌 API

### Endpoints Principais

- **REST API**: http://localhost:1337/api
- **GraphQL**: http://localhost:1337/graphql (se habilitado)

### Autenticação

Para consumir a API do Next.js:

1. Criar um API Token em: **Settings → API Tokens → Create new API Token**
2. Usar o token no header: `Authorization: Bearer YOUR_TOKEN`

## 📋 Sugestões de Content Types

Para o projeto MMTR-SE, considere criar:

### 1. Produto (já integrado com /nossa-producao)
- nome (text) - Nome do produto
- descricao (text - long) - Descrição do produto
- preco (number - decimal) - Preço do produto
- categoria (enumeration) - Categorias: hortalicas, frutas, graos, processados, artesanato, outros
- produtora (text) - Nome da produtora
- imagem (media - single) - Foto do produto

### 2. Produtora
- Nome (text)
- Biografia (richtext)
- Foto (media)
- Localização (text)
- Contato (email/phone)

### 3. Receita
- Título (text)
- Ingredientes (richtext)
- Modo de Preparo (richtext)
- Tempo de Preparo (number)
- Imagem (media)
- Produtos Relacionados (relation)

### 4. Notícia/Blog
- Título (text)
- Conteúdo (richtext)
- Imagem de Capa (media)
- Data de Publicação (date)
- Autor (text)

## 🔗 Integração com Next.js

### Exemplo de Cliente API

```typescript
// src/lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(path: string) {
  const response = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });
  
  return response.json();
}

// Uso
const produtos = await fetchAPI('/produtos?populate=*');
```

### Variáveis de Ambiente

Adicione ao `.env.local` do Next.js:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_aqui
```

## 🔒 Segurança

- ⚠️ O arquivo `.env` contém secrets e **NÃO deve** ser commitado
- Em produção, use variáveis de ambiente seguras
- Configure CORS adequadamente para permitir apenas seu domínio

## 📚 Comandos

### `develop`

Inicia o Strapi com autoReload habilitado.

```bash
npm run develop
```

### `start`

Inicia o Strapi sem autoReload (produção).

```bash
npm run start
```

### `build`

Faz build do painel administrativo.

```bash
npm run build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
