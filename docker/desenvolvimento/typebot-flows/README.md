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

1. Suba o Typebot (`bash docker/desenvolvimento/typebot-whatsapp.sh subir`) e
   entre em http://localhost:3002 (o código de login chega no Mailpit, em
   http://localhost:8025).
2. No builder, em **Create a new typebot**, escolha **Import a file** e selecione o
   JSON desta pasta (é o mesmo caminho do export/import oficial:
   <https://docs.typebot.com/editor/export-import>). Repita para os fluxos que
   quiser testar.
3. **Troque o placeholder pela sua chave local** (uma vez, nos arquivos):

   ```bash
   API_KEY=$(grep -m1 '^API_KEY=' .env | cut -d= -f2-)
   sed -i "s/TROCAR-PELA-API-KEY-LOCAL/$API_KEY/" docker/desenvolvimento/typebot-flows/*.json
   ```

   (Alternativa: manter `{{apiKey}}` nos headers e definir a variável `apiKey` no
   próprio Typebot — assim a chave não fica em arquivo nenhum.)
4. Publique o fluxo e use o **novo** id público dele ao ligar a instância de
   WhatsApp: `bash docker/desenvolvimento/typebot-whatsapp.sh typebot <id-publico>`.

## Como atualizar estas cópias (quando o fluxo mudar na VPS)

```bash
SSH_HOST=quintal TSB_CONTAINER=typebot-typebot-db-1 TSB_USER=postgres \
  bash docker/desenvolvimento/typebot-flows/exportar-fluxos.sh
```

O comando só lê (o `exportar-fluxos.sh` faz `SELECT`) — não altera nada na VPS.
Sem `SSH_HOST`, ele exporta do Typebot local (`postgres`/`typebot`/`quintal`).

O passo a passo completo do ambiente local está em
[`../TYPEBOT-WHATSAPP.md`](../TYPEBOT-WHATSAPP.md).
