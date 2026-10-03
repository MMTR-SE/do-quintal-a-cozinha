#!/usr/bin/env bash
#
# Liga um numero de WhatsApp aos fluxos do Typebot que rodam na sua maquina.
#
# Sobe a Evolution API (Baileys) no Docker, cria uma instancia, mostra o QR code
# para parear e aponta a instancia para um bot do Typebot local.
#
# Uso (na raiz do repositorio):
#   bash docker/desenvolvimento/typebot-whatsapp.sh subir
#   bash docker/desenvolvimento/typebot-whatsapp.sh criar
#   bash docker/desenvolvimento/typebot-whatsapp.sh typebot <id-publico-do-bot>
#   bash docker/desenvolvimento/typebot-whatsapp.sh status
#
# Nada aqui toca na VPS: e tudo local.

set -u

API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
INSTANCIA="${EVOLUTION_INSTANCE:-quintal-local}"
VIEWER_INTERNO="${TYPEBOT_VIEWER_INTERNO:-http://typebot-viewer:3000}"
COMPOSE="docker compose -f docker/desenvolvimento/docker-compose.yml"
PGUSER="${POSTGRES_USER:-quintal}"
export QR_ARQUIVO="${QR_ARQUIVO:-/tmp/evolution-qrcode.png}"

chave() {
  local k
  k="$(docker exec evolution-api printenv AUTHENTICATION_API_KEY 2>/dev/null | tr -d '\r')"
  echo "${k:-${EVOLUTION_API_KEY:-quintal-evolution-dev}}"
}

api() {
  curl -s -H "apikey: $(chave)" -H 'Content-Type: application/json' "$@"
}

# Le a resposta da Evolution e trata o QR code (base64) quando vier.
mostrar_qr() {
  node -e '
    let s = "";
    process.stdin.on("data", (d) => (s += d));
    process.stdin.on("end", () => {
      let j = {};
      try { j = JSON.parse(s); } catch {}
      const b64 = j.base64 || (j.qrcode && j.qrcode.base64) || "";
      const pairing = j.pairingCode || (j.qrcode && j.qrcode.pairingCode) || "";
      if (b64) {
        require("fs").writeFileSync(process.env.QR_ARQUIVO, Buffer.from(String(b64).split(",").pop(), "base64"));
        console.log("QR code salvo em " + process.env.QR_ARQUIVO);
        console.log("Abra a imagem e escaneie em WhatsApp > Aparelhos conectados > Conectar um aparelho.");
      }
      if (pairing) console.log("Codigo de pareamento (alternativa ao QR): " + pairing);
      if (!b64 && !pairing) console.log(JSON.stringify(j).slice(0, 400));
    });
  '
}

resumo() {
  node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.stringify(JSON.parse(s)).slice(0,400))}catch{console.log(s.slice(0,400)||"(sem resposta)")}})'
}

garantir_banco() {
  if docker exec postgres psql -U "$PGUSER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'evolution'" | grep -q 1; then
    echo "banco evolution: ok"
  else
    echo "criando banco evolution..."
    docker exec postgres psql -U "$PGUSER" -d postgres -c "CREATE DATABASE evolution OWNER $PGUSER;"
  fi
}

subir() {
  echo "subindo postgres, typebot, mailpit e redis da evolution..."
  $COMPOSE up -d postgres typebot-builder typebot-viewer typebot-redis mailpit evolution-redis
  for _ in $(seq 1 30); do
    docker exec postgres pg_isready -U "$PGUSER" >/dev/null 2>&1 && break
    sleep 1
  done
  # a Evolution precisa do banco criado antes de subir
  garantir_banco
  $COMPOSE up -d evolution-api evolution-manager
  echo
  echo "Evolution API ....: $API_URL"
  echo "Manager (UI) .....: http://localhost:8180   (informe $API_URL e a chave)"
  echo "Typebot builder ..: http://localhost:3002"
  echo "Typebot viewer ...: http://localhost:3003"
  echo "Mailpit (login) ..: http://localhost:8025"
  echo "Site ..............: http://localhost:3001"
}

criar() {
  garantir_banco
  echo "criando instancia $INSTANCIA..."
  api -X POST "$API_URL/instance/create" \
    -d "{\"instanceName\":\"$INSTANCIA\",\"integration\":\"WHATSAPP-BAILEYS\",\"qrcode\":true}" | mostrar_qr
}

conectar() {
  echo "buscando QR code da instancia $INSTANCIA..."
  api "$API_URL/instance/connect/$INSTANCIA" | mostrar_qr
}

ligar_typebot() {
  local bot="${1:-}"
  local url="${2:-$VIEWER_INTERNO}"
  if [ -z "$bot" ]; then
    echo "informe o id publico do bot. Ex.: bash $0 typebot meu-fluxo-abc123" >&2
    exit 1
  fi
  echo "ligando a instancia $INSTANCIA ao bot $bot ($url)..."
  api -X POST "$API_URL/typebot/create/$INSTANCIA" \
    -d "{\"enabled\":true,\"url\":\"$url\",\"typebot\":\"$bot\",\"triggerType\":\"all\",\"triggerOperator\":\"contains\",\"triggerValue\":\"\",\"expire\":20,\"keywordFinish\":\"#SAIR\",\"delayMessage\":1000,\"unknownMessage\":\"Nao entendi, pode repetir?\",\"listeningFromMe\":false,\"stopBotFromMe\":false,\"keepOpen\":false,\"debounceTime\":10}" \
    | resumo
}

status() {
  echo -n "conexao: "
  api "$API_URL/instance/connectionState/$INSTANCIA" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log(JSON.stringify(j.instance||j))}catch{console.log(s.slice(0,200)||"(sem resposta)")}})'
  echo -n "instancias: "
  api "$API_URL/instance/fetchInstances" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log(j.map(i=>(i.name||i.instanceName||"?")+" ["+(i.connectionStatus||i.state||"?")+"]").join(", ")||"(nenhuma)")}catch{console.log(s.slice(0,200))}})'
}

apagar() {
  echo "desconectando e apagando a instancia $INSTANCIA..."
  api -X DELETE "$API_URL/instance/logout/$INSTANCIA" >/dev/null
  api -X DELETE "$API_URL/instance/delete/$INSTANCIA" | resumo
}

ajuda() {
  cat <<'TXT'
Comandos:
  subir                      sobe typebot + evolution (e garante o banco evolution)
  criar                      cria a instancia de WhatsApp e mostra o QR code
  conectar                   mostra o QR code de novo (caso tenha desconectado)
  typebot <id-do-bot> [url]  liga a instancia ao bot do Typebot
  status                     estado da conexao e instancias
  apagar                     desconecta e apaga a instancia

Variaveis: EVOLUTION_INSTANCE (padrao quintal-local), EVOLUTION_API_URL,
           TYPEBOT_VIEWER_INTERNO (padrao http://typebot-viewer:3000)
TXT
}

case "${1:-ajuda}" in
  subir) subir ;;
  criar) criar ;;
  conectar) conectar ;;
  typebot) shift; ligar_typebot "$@" ;;
  status) status ;;
  apagar) apagar ;;
  ajuda | help | -h | --help) ajuda ;;
  *)
    echo "comando desconhecido: $1"
    ajuda
    exit 1
    ;;
esac
