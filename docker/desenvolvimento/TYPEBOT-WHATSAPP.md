# Typebot + WhatsApp local (Evolution API)

Como ligar um número de WhatsApp aos fluxos do Typebot que rodam **na sua máquina**.
Nada aqui sobe para a VPS: são serviços apenas do ambiente de desenvolvimento.

## O que sobe

| Serviço | Endereço | Para que serve |
|---|---|---|
| `typebot-builder` | http://localhost:3002 | criar/editar os fluxos |
| `typebot-viewer` | http://localhost:3003 | executar os fluxos (é ele que a Evolution chama) |
| `mailpit` | http://localhost:8025 | caixa de entrada dos códigos de login do Typebot |
| `evolution-api` | http://localhost:8080 | ponte WhatsApp ↔ Typebot (Baileys) |
| `evolution-manager` | http://localhost:8180 | interface para ver QR/status no navegador |
| `dev-quintal` | http://localhost:3001 | o site (API `/api/product`, `/api/recipe`) |
| `cms` | http://localhost:1337 | painel do CMS |

## Passo a passo

1. **Subir tudo** (na raiz do repositório):

   ```bash
   bash docker/desenvolvimento/typebot-whatsapp.sh subir
   ```

2. **Entrar no Typebot**: http://localhost:3002 → *Sign in* com o seu e-mail → o
   **código de login** chega no Mailpit (http://localhost:8025) → crie um fluxo e
   **publique**. Guarde o **id público** do bot (aparece ao compartilhar/publicar,
   algo como `meu-fluxo-abc123`).

3. **Parear o WhatsApp**:

   ```bash
   bash docker/desenvolvimento/typebot-whatsapp.sh criar
   ```

   O QR é salvo em `/tmp/evolution-qrcode.png` — abra e escaneie em
   *WhatsApp → Aparelhos conectados → Conectar um aparelho*.
   Alternativa: abra http://localhost:8180 e informe `http://localhost:8080` e a
   chave (padrão `quintal-evolution-dev`; também disponível em
   `docker exec evolution-api printenv AUTHENTICATION_API_KEY`).

4. **Ligar a instância ao bot**:

   ```bash
   bash docker/desenvolvimento/typebot-whatsapp.sh typebot <id-publico-do-bot>
   ```

5. **Testar**: mande uma mensagem para o número pareado — o fluxo responde.
   `#SAIR` encerra a sessão.

6. **Conferir**: `bash docker/desenvolvimento/typebot-whatsapp.sh status`

## Chamando a API do site dentro do fluxo

Nos blocos **Webhook** (HTTP request) do Typebot, use a rede interna do Docker:

- URL: `http://dev-quintal:3000/api/product` (ou `/api/recipe`)
- Header: `API_KEY: <valor de API_KEY do seu .env>`
- Body (JSON), por exemplo:

  ```json
  {
    "product_name": "{{nome do produto}}",
    "phone_number": "{{telefone}}",
    "category": "AGRICOLA",
    "price": "12.50",
    "media": []
  }
  ```

O item cai no Postgres do site (aparece em http://localhost:3001) e é espelhado no CMS.

A Evolution também envia variáveis prontas para o fluxo: `remoteJid`, `pushName`,
`instanceName`, `serverUrl`, `apiKey` e `ownerJid`.

## Fluxos versionados (os que rodam hoje na VPS)

Os fluxos **publicados** no Typebot da VPS estão versionados em
[`typebot-flows/`](typebot-flows/README.md) — 7 fluxos (v6.1), exportados por
`SELECT` no banco do Typebot, já com a API_KEY de produção substituída pelo
placeholder `TROCAR-PELA-API-KEY-LOCAL` e apontando para
`http://dev-quintal:3000/api`.

```bash
# 1) suba o Typebot
bash docker/desenvolvimento/typebot-whatsapp.sh subir

# 2) importe e publique os fluxos de uma vez (login automático pelo Mailpit)
bash docker/desenvolvimento/typebot-flows/importar-fluxos.sh
```

3. Ligue a instância de WhatsApp a um deles (o `publicId` ganha o sufixo `-local`):
   `bash docker/desenvolvimento/typebot-whatsapp.sh typebot mulheres-main-local`

O importador troca o placeholder `TROCAR-PELA-API-KEY-LOCAL` pela `API_KEY` do seu
ambiente **só no fluxo importado**; os arquivos do repositório seguem sem chave.
Para importar na mão (ou trocar a chave manualmente) veja
[`typebot-flows/README.md`](typebot-flows/README.md).

Para atualizar as cópias depois de mudar algo na VPS:

```bash
SSH_HOST=quintal TSB_CONTAINER=typebot-typebot-db-1 TSB_USER=postgres \
  bash docker/desenvolvimento/typebot-flows/exportar-fluxos.sh
```

(esse comando só lê o banco do Typebot da VPS — não altera nada lá)

## Problemas comuns

- **O QR expirou** (a Evolution limita a 30 s): rode
  `bash docker/desenvolvimento/typebot-whatsapp.sh conectar` de novo.
- **Não chega o código de login do Typebot**: veja o Mailpit
  (http://localhost:8025) — o SMTP do dev aponta para ele.
- **O fluxo responde mas não grava nada no site**: confira o header `API_KEY` do
  bloco **Webhook** (deve ser a chave do seu `.env`) e a base usada
  (`{{baseUrl}}` → `http://dev-quintal:3000/api`).
- **A UI da Evolution não abre**: ela depende do `nginx.conf` corrigido
  (`evolution-manager-nginx.conf`) montado pelo compose — se trocar a imagem,
  confira isso.
- **Instância presa em `connecting`**: é o pareamento pendente; gere o QR e
  escaneie.

## Observações

- **Não use em produção**: o canal Baileys é não oficial e o número pode ser
  banido — use um chip de teste.
- Os dados da Evolution ficam no banco `evolution` (Postgres) e no volume
  `evolution_instances`.
- Para apagar a instância: `bash docker/desenvolvimento/typebot-whatsapp.sh apagar`.
- Para *ler* conversas de um grupo (extração de conhecimento), existe o
  `whatsapp-extractor/` na branch `test/quart` — é outro caso de uso.
- A VPS não é tocada por este setup: os serviços estão só no
  `docker/desenvolvimento/docker-compose.yml`.
