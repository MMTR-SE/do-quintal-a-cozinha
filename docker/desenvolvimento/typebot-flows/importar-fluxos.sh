#!/usr/bin/env bash
#
# Importa para o Typebot LOCAL os fluxos versionados em typebot-flows/*.json,
# criando e publicando cada um.
#
# O login e automatico: o script pede o codigo por e-mail, le o link no Mailpit
# e completa a sessao (o mesmo caminho que o navegador usa).
#
# Uso (na raiz do repositorio, com o Typebot local de pe):
#   bash docker/desenvolvimento/typebot-flows/importar-fluxos.sh              # todos
#   bash docker/desenvolvimento/typebot-flows/importar-fluxos.sh mulheres-main  # um so
#
# Variaveis:
#   TYPEBOT_URL    (padrao http://localhost:3002)
#   MAILPIT_URL    (padrao http://localhost:8025)
#   TYPEBOT_EMAIL  (padrao admin@quintal.local)
#   TSB_SUFIXO     (padrao -local; entra no publicId dos bots importados)
#   TSB_CONTAINER/TSB_DB/TSB_USER  container/banco/usuario do Postgres do Typebot
#   TSB_API_KEY    sobrescreve a chave usada no lugar de TROCAR-PELA-API-KEY-LOCAL
#
# Os arquivos versionados seguem com o placeholder: a chave local entra so no
# fluxo importado, nunca no repositorio.

set -u

AQUI="$(cd "$(dirname "$0")" && pwd)"
TYPEBOT_URL="${TYPEBOT_URL:-http://localhost:3002}"
MAILPIT_URL="${MAILPIT_URL:-http://localhost:8025}"
EMAIL="${TYPEBOT_EMAIL:-admin@quintal.local}"
SUFIXO="${TSB_SUFIXO:--local}"
CONTAINER="${TSB_CONTAINER:-postgres}"
DB="${TSB_DB:-typebot}"
USUARIO="${TSB_USER:-quintal}"
PLACEHOLDER="TROCAR-PELA-API-KEY-LOCAL"

filtro="${1:-}"

JAR="$(mktemp -t typebot-import.XXXXXX)"
trap 'rm -f "$JAR"' EXIT

# ---------------------------------------------------------------------------
# chave local da API do site (vai no lugar do placeholder dentro do fluxo)
# ---------------------------------------------------------------------------
chave_local() {
  local k
  k="${TSB_API_KEY:-}"
  if [ -z "$k" ]; then
    k="$(docker exec desenvolvimento-dev-quintal-1 printenv API_KEY 2>/dev/null | tr -d '\r')"
  fi
  if [ -z "$k" ] && [ -f .env ]; then
    k="$(grep -m1 '^API_KEY=' .env | cut -d= -f2-)"
  fi
  echo "$k"
}

# ---------------------------------------------------------------------------
# login: csrf -> pede o e-mail -> le o link no Mailpit -> callback
# ---------------------------------------------------------------------------
login() {
  echo "fazendo login em $TYPEBOT_URL como $EMAIL..."
  local csrf id token email_enc
  csrf="$(curl -s -c "$JAR" "$TYPEBOT_URL/api/auth/csrf" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).csrfToken||"")}catch{console.log("")}})')"
  if [ -z "$csrf" ]; then
    echo "  nao consegui pegar o csrf em $TYPEBOT_URL (o Typebot esta de pe?)" >&2
    exit 1
  fi

  curl -s -b "$JAR" -c "$JAR" -X POST "$TYPEBOT_URL/api/auth/signin/nodemailer" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "csrfToken=$csrf" --data-urlencode "email=$EMAIL" --data-urlencode "json=true" \
    -o /dev/null

  for _ in $(seq 1 20); do
    id="$(curl -s "$MAILPIT_URL/api/v1/messages?limit=1" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log((j.messages||[])[0]?.ID||"")}catch{console.log("")}})')"
    [ -n "$id" ] && break
    sleep 1
  done

  local dados
  dados="$(curl -s "$MAILPIT_URL/api/v1/message/$id" | node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      const j=JSON.parse(s);
      const m=String(j.HTML||"").match(/email-redirect\?token=([0-9]+)&amp;email=([^"'"'"']+)/);
      if(!m){console.log("");return;}
      const email=decodeURIComponent(m[2]);
      console.log(m[1]+" "+encodeURIComponent(email));
    })')"
  token="${dados%% *}"
  email_enc="${dados##* }"
  if [ -z "$token" ] || [ -z "$email_enc" ]; then
    echo "  nao achei o link de login no e-mail (Mailpit em $MAILPIT_URL?)" >&2
    exit 1
  fi

  curl -s -b "$JAR" -c "$JAR" -o /dev/null \
    "$TYPEBOT_URL/api/auth/callback/nodemailer?token=$token&email=$email_enc&callbackUrl=$(node -e 'console.log(encodeURIComponent(process.argv[1]+"/typebots"))' "$TYPEBOT_URL")"

  local sessao
  sessao="$(curl -s -b "$JAR" "$TYPEBOT_URL/api/auth/session" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s)?.user?.email||"")}catch{console.log("")}})')"
  if [ -z "$sessao" ]; then
    echo "  o login nao completou (sessao vazia)" >&2
    exit 1
  fi
  echo "  sessao: $sessao"
}

# ---------------------------------------------------------------------------
# workspace do usuario logado (via banco do Typebot)
# ---------------------------------------------------------------------------
workspace() {
  docker exec "$CONTAINER" psql -U "$USUARIO" -d "$DB" -tAc \
    "select m.\"workspaceId\" from \"MemberInWorkspace\" m join \"User\" u on u.id = m.\"userId\" where u.email = '$EMAIL' order by m.\"createdAt\" limit 1" \
    2>/dev/null | tr -d ' \r'
}

orpc() { # $1 = procedimento, $2 = corpo json
  curl -s -b "$JAR" -X POST "$TYPEBOT_URL/api/orpc/$1" \
    -H 'Content-Type: application/json' \
    -H "Origin: $TYPEBOT_URL" \
    -H "Referer: $TYPEBOT_URL/typebots" \
    --data-binary "$2"
}

# ---------------------------------------------------------------------------
login

WS="$(workspace)"
if [ -z "$WS" ]; then
  echo "nao achei o workspace de $EMAIL no banco $DB (rode o Typebot e faca login uma vez na UI)" >&2
  exit 1
fi
echo "workspace: $WS"

API_KEY="$(chave_local)"
if [ -z "$API_KEY" ]; then
  echo "aviso: nao achei a API_KEY local; os fluxos vao subir com o placeholder $PLACEHOLDER" >&2
else
  echo "API_KEY local encontrada (${#API_KEY} caracteres) — o placeholder sera substituido no fluxo importado"
fi

total=0
falhas=0

for arquivo in "$AQUI"/*.json; do
  nome_arquivo="$(basename "$arquivo" .json)"
  if [ -n "$filtro" ] && [ "$nome_arquivo" != "$filtro" ]; then
    continue
  fi

  nome="$(node -e 'console.log(require(process.argv[1]).typebot.name)' "$arquivo")"
  echo "importando $nome ($nome_arquivo.json)..."

  payload="$(node -e '
    const fs = require("fs");
    const [arquivo, ws, chave] = process.argv.slice(1);
    const j = JSON.parse(fs.readFileSync(arquivo, "utf8"));
    const typebot = { ...j.typebot, folderId: null };
    if (chave) {
      typebot.groups = JSON.parse(JSON.stringify(typebot.groups).split("TROCAR-PELA-API-KEY-LOCAL").join(chave));
    }
    process.stdout.write(JSON.stringify({ json: { workspaceId: ws, typebot, version: j.version } }));
  ' "$arquivo" "$WS" "$API_KEY")"

  resposta="$(orpc typebot/importTypebot "$payload")"
  id="$(echo "$resposta" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log((j.json&&j.json.typebot&&j.json.typebot.id)||"")}catch{console.log("")}})')"

  if [ -z "$id" ]; then
    echo "  falhou: $(echo "$resposta" | head -c 200)"
    falhas=$((falhas + 1))
    continue
  fi

  slug="$(node -e 'const n=require(process.argv[1]).typebot.name;console.log(n.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+process.argv[2])' "$arquivo" "$SUFIXO")"

  orpc typebot/updateTypebot "{\"json\":{\"typebotId\":\"$id\",\"typebot\":{\"publicId\":\"$slug\"}}}" >/dev/null
  publicacao="$(orpc typebot/publishTypebot "{\"json\":{\"typebotId\":\"$id\"}}")"

  if echo "$publicacao" | grep -q '"message":"success"'; then
    echo "  ok -> publicId: $slug"
    total=$((total + 1))
  else
    echo "  importou mas nao publicou: $(echo "$publicacao" | head -c 160)"
    if echo "$publicacao" | grep -qi "free plan"; then
      echo "    -> o workspace esta no plano FREE e os fluxos usam bloco de upload de arquivo."
      echo "       Ajuste o plano do workspace atual e rode de novo:"
      echo "       docker exec $CONTAINER psql -U $USUARIO -d $DB -c \"update \\\"Workspace\\\" set plan='UNLIMITED';\""
      echo "       (em ambientes novos, o compose ja sobe com DEFAULT_WORKSPACE_PLAN=UNLIMITED)"
    fi
    total=$((total + 1))
    falhas=$((falhas + 1))
  fi
done

echo
echo "fluxos importados: $total (falhas: $falhas)"
echo "para ligar a instancia de WhatsApp a um deles:"
echo "  bash docker/desenvolvimento/typebot-whatsapp.sh typebot <publicId>"
