# Integração Strapi ↔ Nossa Produção

Este documento explica como os produtos cadastrados no Strapi CMS são exibidos na página `/nossa-producao`.

## Como Funciona

A página `/nossa-producao` **mescla automaticamente** produtos de duas fontes:

1. **Banco de dados Prisma** (produtos existentes)
2. **Strapi CMS** (produtos cadastrados no painel admin)

### Fluxo de Dados

```
┌─────────────────┐     ┌──────────────────┐
│  Strapi CMS     │     │  Prisma DB       │
│  (porta 1337)   │     │  (SQLite)        │
└────────┬────────┘     └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
         ┌───────────────────────┐
         │  getAllProducts()     │
         │  (Server Action)      │
         └───────────┬───────────┘
                     ▼
         ┌───────────────────────┐
         │  /nossa-producao      │
         │  (Next.js Page)       │
         └───────────────────────┘
```

## Mapeamento de Campos

### Do Strapi para o formato Product

| Campo Strapi | Campo Product | Observações |
|--------------|---------------|-------------|
| `nome` | `product_name` | Obrigatório |
| `descricao` | `description` | Texto longo |
| `preco` | `price` | Número decimal |
| `categoria` | `category` | Enum mapeado* |
| `produtora` | `profile.name` | Nome da produtora |
| `imagem` | `media[0]` | URL da imagem |

\* **Mapeamento de Categorias:**
- `hortalicas` → `HORTALICAS`
- `frutas` → `FRUTAS`
- `graos` → `GRAOS`
- `processados` → `PROCESSADOS`
- `artesanato` → `ARTESANATO`
- `outros` → `OUTROS`

## Identificação de Produtos

Produtos do Strapi são identificados por IDs prefixados com `strapi-`:

```typescript
// Produto do Prisma
{ id: "uuid-123-456" }

// Produto do Strapi
{ id: "strapi-abc-def" }
```

Isso permite distinguir a origem do produto e tratar cada um apropriadamente.

## Filtros e Busca

Todos os filtros da página funcionam para produtos do Strapi:

- ✅ **Busca por nome** - Busca no campo `nome`
- ✅ **Filtro por categoria** - Filtra pela `categoria`
- ✅ **Filtro por preço** - Filtra pelo `preco`

## Limitações Atuais

### 1. Página de Detalhes
Produtos do Strapi **ainda não têm** página de detalhes (`/nossa-producao/[id]`). 

Ao clicar em um produto do Strapi, você verá "Produto não encontrado".

**Solução futura:** Implementar `getProductById` para Strapi.

### 2. Imagens
- Apenas **uma imagem** por produto (campo `imagem`)
- Imagens devem ser enviadas via painel do Strapi
- URLs são automaticamente prefixadas com `NEXT_PUBLIC_STRAPI_URL`

### 3. Produtora
- Campo simples de texto (não é uma relação)
- Nome da produtora fica em `profile.name`
- Não há perfil completo da produtora

## Configuração Necessária

### 1. Content Type "produto"

Certifique-se de criar o Content Type com os campos corretos:

```
produto
├── nome (Text) - obrigatório
├── descricao (Text - Long)
├── preco (Number - Decimal)
├── categoria (Enumeration)
│   ├── hortalicas
│   ├── frutas
│   ├── graos
│   ├── processados
│   ├── artesanato
│   └── outros
├── produtora (Text)
└── imagem (Media - Single)
```

### 2. Permissões de API

Em **Settings → Roles → Public**, habilite:
- ✅ `find` (para listar produtos)
- ✅ `findOne` (para página de detalhes - quando implementada)

### 3. Variáveis de Ambiente

```env
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_aqui
```

## Testando a Integração

1. **Inicie o Strapi:**
   ```bash
   npm run cms:dev
   ```

2. **Adicione produtos no painel admin:**
   - Acesse http://localhost:1337/admin
   - Content Manager → Produto → Create new entry
   - Preencha os campos e clique em **Publish**

3. **Visualize em /nossa-producao:**
   ```bash
   npm run dev
   ```
   - Acesse http://localhost:3000/nossa-producao
   - Seus produtos do Strapi devem aparecer junto com os do Prisma

## Código Fonte

O código principal está em:

- **Server Action:** `src/app/actions/get-all-products.ts`
  - Função `getProductsFromStrapi()` - Busca do Strapi
  - Função `getAllProducts()` - Mescla ambas as fontes

- **Cliente Strapi:** `src/lib/strapi.ts`
  - Funções helper para API REST

- **Página:** `src/app/(pages)/nossa-producao/page.tsx`
  - Não precisa de alterações (usa o Server Action)

## Performance

- **Cache do React Query:** 5 minutos (stale time)
- **ISR do Next.js:** Não aplicado (página client-side)
- **Erro do Strapi:** Falha silenciosa (não quebra a página)

Se o Strapi estiver offline, apenas os produtos do Prisma são exibidos.

## Próximos Passos

1. ✅ Listar produtos do Strapi em `/nossa-producao`
2. ⏳ Implementar página de detalhes para produtos do Strapi
3. ⏳ Adicionar suporte a múltiplas imagens
4. ⏳ Criar relação "Produtora" como Content Type separado
5. ⏳ Adicionar cache/revalidação otimizada

---

**Dúvidas?** Consulte o [README.md](./README.md) ou [QUICKSTART.md](./QUICKSTART.md).
