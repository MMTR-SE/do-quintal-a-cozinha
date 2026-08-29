# Testando o quart (cubrift/quart) ao vivo

O [quart](https://github.com/cubrift/quart) é um chatbot autônomo de WhatsApp
(Node.js + Baileys + Vercel AI SDK + OpenAI). Este setup sobe o bot em Docker
com terminal interativo para exibir o **QR code** de pareamento.

## Como rodar

1. Configure as variáveis (as duas são **obrigatórias** — o bot valida no boot):

   ```bash
   cp docker/quart/.env.example docker/quart/.env
   # edite docker/quart/.env e preencha OPENAI_API_KEY e GIPHY_API_KEY
   ```

2. Suba o bot (o build clona o repositório `cubrift/quart` automaticamente):

   ```bash
   docker compose -f docker/quart/docker-compose.yml up --build -d
   ```

3. Veja o QR code no log (ou `docker attach quart` para terminal interativo):

   ```bash
   docker compose -f docker/quart/docker-compose.yml logs -f quart
   ```

4. No WhatsApp: **Aparelhos conectados → Conectar um aparelho** → escaneie o QR.

## Observações

- A sessão do WhatsApp fica persistida no volume `quart_data` — depois do
  primeiro pareamento, o bot conecta sozinho nos próximos `up`.
- Para reiniciar do zero: `docker compose -f docker/quart/docker-compose.yml down -v`
- Sem `OPENAI_API_KEY` ou `GIPHY_API_KEY` o bot **nem inicia** (crash no boot
  com mensagem apontando para o `.env.example`).
- Porta: o bot expõe um painel/QR host em `http://localhost:3000`. Se a porta
  estiver ocupada, use `QUART_PORT=3004 docker compose -f docker/quart/docker-compose.yml up -d`.
