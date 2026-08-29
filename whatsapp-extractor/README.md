# WhatsApp Extractor (sem IA)

Extrai conversas do WhatsApp — grupos e mensagens diretas — usando apenas
[Baileys](https://github.com/WhiskeySockets/Baileys) (a mesma lib que o quart usa).
**Nenhum modelo de IA externo é necessário.**

## Como rodar

```bash
cd whatsapp-extractor
npm install
npm start
```

1. No primeiro uso aparece um **QR code** no terminal — escaneie com o WhatsApp:
   *Aparelhos conectados → Conectar um aparelho*.
2. Ao conectar, o script lista os **grupos participantes** e começa a salvar as
   mensagens recebidas em `data/conversas.jsonl` (uma mensagem por linha, JSON).
3. A sessão fica em `data/auth/` — nos próximos `npm start` ele conecta sozinho.

## Filtros (variáveis de ambiente)

| Variável | Efeito |
|---|---|
| `GROUP_ID` | Captura só o grupo com esse jid (ex.: `5531999999999-123@g.us`) |
| `GROUP_NAME` | Captura grupos cujo nome contém o texto (ex.: `QUINTAL`) |
| `DATA_DIR` | Pasta de dados (padrão: `./data`) |
| `INCLUDE_SELF=1` | Salva também as mensagens enviadas pelo próprio bot |
| `LOG_LEVEL` | Nível de log do pino (padrão: `info`) |

Sem `GROUP_ID`/`GROUP_NAME`, captura **todos os grupos** (e DMs).

## Formato de cada linha (JSONL)

```json
{
  "id": "BAE5...",
  "ts": "2026-08-28T21:00:00.000Z",
  "chat": "Nome do Grupo",
  "chatId": "5531...@g.us",
  "isGroup": true,
  "sender": "5531...@s.whatsapp.net",
  "type": "conversation",
  "text": "mensagem...",
  "hasMedia": false,
  "fromMe": false
}
```

## Observações

- Mídias (fotos/áudios/vídeos) são sinalizadas com `hasMedia: true` e o tipo no
  campo `type`, mas **não são baixadas** (só o texto/caption é salvo). Dá para
  adicionar download depois via `downloadMediaMessage`.
- Para remover o pareamento: apague `data/auth/` e rode de novo (novo QR).
- O script não envia mensagens — apenas escuta e registra.
