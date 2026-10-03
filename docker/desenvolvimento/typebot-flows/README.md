# Fluxos do Typebot (versionados)

Cópias em JSON dos fluxos **publicados** no Typebot da VPS, para rodar e testar
localmente sem depender do servidor. Foram exportados com
`exportar-fluxos.sh` (somente `SELECT` no banco do Typebot — nada foi alterado lá).

| Arquivo | Fluxo de origem | Grupos / blocos |
|---|---|---|
| `mulheres-main.json` | Mulheres Main | 11 / 19 |
| `cadastro.json` | Cadastro | 8 / 35 |
| `perfil.json` | Perfil | 19 / 62 |
| `novo-produto.json` | Novo Produto | 14 / 49 |
| `editar-produtos.json` | Editar Produtos | 21 / 66 |
| `remover-produto.json` | Remover Produto | 10 / 26 |
| `nova-receita.json` | Nova Receita | 16 / 70 |

Versão dos fluxos: **6.1**. Cada JSON é um fluxo independente (não há saltos entre eles).

## O que o export faz para poder versionar

1. **Redige a API_KEY**: os blocos `Webhook` dos fluxos da VPS trazem a chave de
   produção embutida no header `API_KEY`. No arquivo versionado o valor vira
   `TROCAR-PELA-API-KEY-LOCAL` — a chave nunca entra no repositório.
2. **Aponta para o site local**: a variável `baseUrl` (que valia
   `https://mulheresrurais.com.br/api`) passa a ser `http://dev-quintal:3000/api`,
   o endereço do site de desenvolvimento visto de dentro da rede do Docker (é por
   onde os webhooks do Typebot saem).

URLs de conteúdo (imagens/links dentro das mensagens) continuam apontando para
produção — por isso alguma imagem pode não abrir localmente.

## Como importar no Typebot local

Com o Typebot de pé, o script faz tudo: loga sozinho (o código de login é lido no
Mailpit), importa cada fluxo, define o `publicId` (`<nome>-local`) e publica.

```bash
bash docker/desenvolvimento/typebot-flows/importar-fluxos.sh                # todos
bash docker/desenvolvimento/typebot-flows/importar-fluxos.sh mulheres-main  # um só
```

Ele troca `TROCAR-PELA-API-KEY-LOCAL` pela `API_KEY` do ambiente local **apenas no
fluxo importado** — os arquivos do repositório seguem com o placeholder.

Depois ligue a instância de WhatsApp ao fluxo:

```bash
bash docker/desenvolvimento/typebot-whatsapp.sh typebot mulheres-main-local
```

### Se preferir importar na mão

1. No builder (http://localhost:3002), em **Create a new typebot** escolha
   **Import a file** e selecione o JSON desta pasta (é o mesmo caminho do
   export/import oficial: <https://docs.typebot.com/editor/export-import>).
2. Publique e use o **novo** id público dele ao ligar a instância de WhatsApp.
   (Sem o script, troque antes o placeholder pela chave local — veja abaixo.)

### Plano do workspace

Os fluxos usam bloco de **upload de arquivo**, que o plano FREE não deixa
publicar (`File upload blocks can't be published on the free plan`). O compose de
desenvolvimento já sobe com `DEFAULT_WORKSPACE_PLAN=UNLIMITED` e
`ADMIN_EMAIL=admin@quintal.local`. Se o seu workspace foi criado antes disso:

```bash
docker exec postgres psql -U quintal -d typebot -c "update \"Workspace\" set plan='UNLIMITED';"
```

### Trocar o placeholder manualmente (opcional)

```bash
API_KEY=$(grep -m1 '^API_KEY=' .env | cut -d= -f2-)
sed -i "s/TROCAR-PELA-API-KEY-LOCAL/$API_KEY/" docker/desenvolvimento/typebot-flows/*.json
```

(Alternativa: manter `{{apiKey}}` nos headers e definir a variável `apiKey` no
próprio Typebot — assim a chave não fica em arquivo nenhum.)

## Como atualizar estas cópias (quando o fluxo mudar na VPS)

```bash
SSH_HOST=quintal TSB_CONTAINER=typebot-typebot-db-1 TSB_USER=postgres \
  bash docker/desenvolvimento/typebot-flows/exportar-fluxos.sh
```

O comando só lê (o `exportar-fluxos.sh` faz `SELECT`) — não altera nada na VPS.
Sem `SSH_HOST`, ele exporta do Typebot local (`postgres`/`typebot`/`quintal`).

O passo a passo completo do ambiente local está em
[`../TYPEBOT-WHATSAPP.md`](../TYPEBOT-WHATSAPP.md).
