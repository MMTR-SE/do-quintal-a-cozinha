# Guia Rápido - Strapi CMS

## 🚀 Primeiros Passos (5 minutos)

### 1. Iniciar o Strapi

```bash
npm run cms:dev
```

Aguarde até ver a mensagem: `Server started successfully`

### 2. Criar Conta de Administrador

1. Acesse: http://localhost:1337/admin
2. Preencha o formulário de cadastro:
   - Nome
   - Email
   - Senha (mínimo 8 caracteres)
3. Clique em "Let's start"

### 3. Criar seu Primeiro Content Type

1. No menu lateral, clique em **Content-Type Builder**
2. Clique em **+ Create new collection type**
3. Digite o nome: `produto`
4. Clique em **Continue**

### 4. Adicionar Campos ao Content Type

Adicione os seguintes campos:

#### Campo 1: Nome
- Clique em **+ Add another field**
- Selecione **Text**
- Name: `nome`
- Marque **Required field**
- Clique em **Finish**

#### Campo 2: Descrição
- Clique em **+ Add another field**
- Selecione **Text**
- Name: `descricao`
- Type: **Long text**
- Clique em **Finish**

#### Campo 3: Preço
- Clique em **+ Add another field**
- Selecione **Number**
- Name: `preco`
- Number format: **decimal**
- Clique em **Finish**

#### Campo 4: Categoria (opcional)
- Clique em **+ Add another field**
- Selecione **Enumeration**
- Name: `categoria`
- Values (um por linha):
  ```
  hortalicas
  frutas
  graos
  processados
  artesanato
  outros
  ```
- Clique em **Finish**

#### Campo 5: Produtora (opcional)
- Clique em **+ Add another field**
- Selecione **Text**
- Name: `produtora`
- Clique em **Finish**

#### Campo 6: Imagem (opcional)
- Clique em **+ Add another field**
- Selecione **Media**
- Name: `imagem`
- Type: **Single media**
- Clique em **Finish**

5. Clique em **Save** no canto superior direito
6. Aguarde o servidor reiniciar (15-30 segundos)

### 5. Configurar Permissões de API

1. No menu lateral, vá em **Settings** (ícone de engrenagem)
2. Em **Users & Permissions Plugin**, clique em **Roles**
3. Clique em **Public**
4. Expanda **Produto**, **Receita** e **História**
5. Marque as seguintes permissões:
   - ✅ find
   - ✅ findOne
6. Clique em **Save** no canto superior direito

### 6. Criar API Token

1. Em **Settings**, clique em **API Tokens**
2. Clique em **+ Create new API Token**
3. Preencha:
   - Name: `Next.js App`
   - Token duration: `Unlimited`
   - Token type: `Read-only`
4. Clique em **Save**
5. **IMPORTANTE:** Copie o token gerado (você não poderá vê-lo novamente)

### 7. Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env.local` na raiz do projeto Next.js:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_copiado_aqui
```

### 8. Adicionar Produtos

1. No menu lateral, clique em **Content Manager**
2. Clique em **Produto**
3. Clique em **+ Create new entry**
4. Preencha:
   - Nome: `Feijão Orgânico`
   - Descrição: `Feijão cultivado sem agrotóxicos pelas mulheres do MMTR-SE`
   - Preço: `15.90`
   - Categoria: `graos`
   - Produtora: `Maria da Silva`
   - Imagem: (opcional) faça upload de uma imagem
5. Clique em **Save**
6. Clique em **Publish** no canto superior direito

Repita para adicionar mais produtos!

### 9. Testar a Integração

1. Inicie o Next.js:
   ```bash
   npm run dev
   ```

2. Acesse: http://localhost:3000/exemplo-strapi

Você deverá ver os produtos listados! 🎉

---

## 📝 Comandos Úteis

```bash
# Iniciar em modo desenvolvimento (com auto-reload)
npm run cms:dev

# Build para produção
npm run cms:build

# Iniciar em modo produção
npm run cms:start

# Acessar console do Strapi
cd cms && npm run console
```

## 🔗 Links Importantes

- **Painel Admin**: http://localhost:1337/admin
- **API REST**: http://localhost:1337/api
- **Documentação Strapi**: https://docs.strapi.io
- **Página de Exemplo**: http://localhost:3000/exemplo-strapi

## 💡 Dicas

- Use `populate=*` na URL da API para incluir relações: `/api/produtos?populate=*`
- Configure CORS em `cms/config/middlewares.ts` se precisar acessar de outro domínio
- Backup regular do arquivo `cms/.tmp/data.db` (banco de dados SQLite)
- Para produção, migre para PostgreSQL ou MySQL

## 🐛 Problemas Comuns

### Erro 403 ao acessar a API
- Verifique se configurou as permissões em Settings → Roles → Public

### Token inválido
- Certifique-se de copiar o token completo sem espaços
- Verifique se a variável `STRAPI_API_TOKEN` está definida no `.env.local`

### Strapi não inicia
- Delete a pasta `cms/.cache` e tente novamente
- Verifique se a porta 1337 não está em uso

---

**Pronto para começar!** 🚀

Para mais detalhes, consulte o [README.md](./README.md) completo.
