# WhatsApp Extractor (sem IA para captura; IA opcional via Groq)

Extrai conversas de **um grupo** do WhatsApp usando [Baileys](https://github.com/WhiskeySockets/Baileys)
(a mesma lib que o quart usa). A **captura é 100% local e sem IA**; a IA (Groq,
plano gratuito) é opcional e usada só em dois pontos:

1. **Transcrição de áudios** (whisper-large-v3-turbo) — o texto entra no registro;
2. **Geração de conhecimento** (`npm run knowledge`) — resume o que foi falado.

## Como rodar

```bash
cd whatsapp-extractor
npm install
# escolha o grupo e configure a chave (opcional p/ áudio/conhecimento):
cp .env.example .env   # preencha GROUP_NAME e GROQ_API_KEY
npm start
```

1. No primeiro uso aparece um **QR code** — escaneie com o WhatsApp
   (*Aparelhos conectados → Conectar um aparelho*).
2. Ao conectar, o script lista os grupos e marca qual está sendo capturado.
3. As mensagens vão para `data/conversas.jsonl` (uma por linha) e o terminal
   mostra em tempo real. Áudios aparecem como `(áudio) <transcrição>`.

## Escutar apenas um grupo

| Variável | Efeito |
|---|---|
| `GROUP_NAME` | Captura só grupos cujo nome contém o texto (ex.: `GROUP_NAME=SALA`) |
| `GROUP_ID` | Captura só o grupo com esse jid (ex.: `5531999999999-123@g.us`) |

Sem as duas, captura **todos** os grupos — para escutar um grupo só, defina uma delas.

## Transcrição de áudios

- Precisa de `GROQ_API_KEY` (grátis em console.groq.com) e de **ffmpeg** no sistema
  (`sudo apt install ffmpeg` — o WhatsApp envia ogg/opus, que o Groq não aceita; o
  script converte para mp3 na hora).
- O texto transcrito entra nos campos `text` e `transcript` do registro JSONL.

## Gerar conhecimento do que é falado

```bash
npm run knowledge
```

- Lê as mensagens **novas** desde a última execução (marcador em
  `data/knowledge-offset.txt`), envia para o Groq (`llama-3.3-70b-versatile`) e
  anexa o resumo em **`data/conhecimento.md`** — temas, decisões, pedidos,
  nomes citados e próximos passos.
- Requer `GROQ_API_KEY`.

## Formato de cada linha (JSONL)

```json
{
  "id": "BAE5...",
  "ts": "2026-08-28T21:00:00.000Z",
  "chat": "Nome do Grupo",
  "chatId": "5531...@g.us",
  "isGroup": true,
  "sender": "5531...@s.whatsapp.net",
  "type": "audioMessage",
  "text": "transcrição do áudio...",
  "transcript": "transcrição do áudio...",
  "hasMedia": true,
  "fromMe": false
}
```

## Observações

- Imagens/vídeos são sinalizados (`hasMedia`) mas não baixados; só o caption/texto.
- Mensagens do próprio número pareado são ignoradas por padrão — use
  `INCLUDE_SELF=1` para incluí-las.
- Para remover o pareamento: apague `data/auth/` e rode de novo.
- O script não envia mensagens — apenas escuta, registra e transcreve.
