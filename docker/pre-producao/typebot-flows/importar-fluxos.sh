#!/usr/bin/env bash
#
# Importa os fluxos versionados no repositório para o Typebot da PRÉ-PRODUÇÃO,
# criando e publicando cada um.
#
# Os *.json ficam em um único lugar do repositório (docker/desenvolvimento/
# typebot-flows) e servem para qualquer instância: o que muda é o endereço da
# API do site gravado dentro do fluxo (TSB_API_BASE). O login é automático: o
# script pede o código por e-mail, lê o link no Mailpit interno e completa a
# sessão -- o mesmo caminho que o navegador usa.
#
# Uso (na raiz do repositório):
#   bash docker/pre-producao/typebot-flows/importar-fluxos.sh              # todos
#   bash docker/pre-producao/typebot-flows/importar-fluxos.sh mulheres-main # um só
#
# Variáveis (os padrões já apontam para a pré-produção):
#   TYPEBOT_URL        https://typebot-dev.mulheresrurais.com.br
#   TYPEBOT_EMAIL      e-mail do dono do workspace (o primeiro login o cria)
#   MAILPIT_URL        https://typebot-dev.mulheresrurais.com.br/mailpit
#   MAILPIT_USER       usuário do HTTP basic auth do Mailpit
#   MAILPIT_PASSWORD   senha do HTTP basic auth do Mailpit
#   TSB_FLUXOS_DIR     diretório dos *.json (padrão docker/desenvolvimento/typebot-flows)
#   TSB_API_BASE       endereço da API do site gravado nos fluxos
#                      (padrão https://dev.mulheresrurais.com.br/api)
#   TSB_SUFIXO         sufixo do publicId (padrão -dev)
#   TSB_DOCKER         prefixo para falar com o Docker da VPS (padrão "ssh quintal docker")
#   TSB_CONTAINER      container do Postgres do Typebot (padrão pre-quintal-postgres)
#   TSB_DB             banco do Typebot (padrão typebot)
#   TSB_USER           usuário do Postgres (padrão quintal)
#   TSB_SITE_CONTAINER container do site, de onde sai a API_KEY (padrão pre-quintal)
#   TSB_API_KEY        sobrescreve a API_KEY usada no lugar do placeholder
#
# A senha do Mailpit está no .env do deploy (na VPS):
#   ssh quintal "grep -E '^MAILPIT_(USER|PASSWORD)=' /var/www/dev.mulheresrurais.com.br/.env"
#
# Os arquivos versionados seguem com o placeholder TROCAR-PELA-API-KEY-LOCAL:
# a chave entra só no fluxo importado, nunca no repositório.

set -u

AQUI="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(cd "$AQUI/../../.." && pwd)"

TYPEBOT_URL="${TYPEBOT_URL:-https://typebot-dev.mulheresrurais.com.br}"
MAILPIT_URL="${MAILPIT_URL:-https://typebot-dev.mulheresrurais.com.br/mailpit}"
EMAIL="${TYPEBOT_EMAIL:-admin@quintal.local}"
SUFIXO="${TSB_SUFIXO:--dev}"
FLUXOS_DIR="${TSB_FLUXOS_DIR:-$RAIZ/docker/desenvolvimento/typebot-flows}"
API_BASE="${TSB_API_BASE:-https://dev.mulheresrurais.com.br/api}"
BASE_ORIGEM="${TSB_API_BASE_ORIGEM:-http://dev-quintal:3000/api}"
DOCKER="${TSB_DOCKER:-ssh quintal docker}"
CONTAINER="${TSB_CONTAINER:-pre-quintal-postgres}"
SITE_CONTAINER="${TSB_SITE_CONTAINER:-pre-quintal}"
DB="${TSB_DB:-typebot}"
USUARIO="${TSB_USER:-quintal}"
PLACEHOLDER="TROCAR-PELA-API-KEY-LOCAL"

filtro="${1:-}"

if [ ! -d "$FLUXOS_DIR" ]; then
  echo "não achei os fluxos em $FLUXOS_DIR" >&2
  echo "aponte com TSB_FLUXOS_DIR=/caminho/para/typebot-flows" >&2
  exit 1
fi

CURL_AUTH=()
if [ -n "${MAILPIT_USER:-}" ] && [ -n "${MAILPIT_PASSWORD:-}" ]; then
  CURL_AUTH=(-u "$MAILPIT_USER:$MAILPIT_PASSWORD")
elif [ -n "${MAILPIT_USER:-}" ] || [ -n "${MAILPIT_PASSWORD:-}" ]; then
  echo "defina MAILPIT_USER e MAILPIT_PASSWORD (ou nenhum dos dois)" >&2
  exit 1
fi

JAR="$(mktemp -t typebot-import.XXXXXX)"
ESTADO="$(mktemp -d -t typebot-fluxos.XXXXXX)"
trap 'rm -f "$JAR"; rm -rf "$ESTADO"' EXIT

json() { node -e "$1" "${@:2}"; }

# ---------------------------------------------------------------------------
# chave da API do site (entra no lugar do placeholder dentro do fluxo)
# ---------------------------------------------------------------------------
chave_api() {
  local k
  k="${TSB_API_KEY:-}"
  if [ -z "$k" ]; then
    k="$($DOCKER exec "$SITE_CONTAINER" printenv API_KEY 2>/dev/null | tr -d '\r')"
  fi
  echo "$k"
}

# ---------------------------------------------------------------------------
# login: csrf -> pede o e-mail -> lê o link no Mailpit -> callback
# ---------------------------------------------------------------------------
login() {
  echo "fazendo login em $TYPEBOT_URL como $EMAIL..."
  local csrf id token email_enc
  csrf="$(curl -s -c "$JAR" "$TYPEBOT_URL/api/auth/csrf" | json 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).csrfToken||"")}catch{console.log("")}})')"
  if [ -z "$csrf" ]; then
    echo "  nao consegui pegar o csrf em $TYPEBOT_URL (o Typebot esta de pe?)" >&2
    exit 1
  fi

  curl -s -b "$JAR" -c "$JAR" -X POST "$TYPEBOT_URL/api/auth/signin/nodemailer" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "csrfToken=$csrf" --data-urlencode "email=$EMAIL" --data-urlencode "json=true" \
    -o /dev/null

  for _ in $(seq 1 20); do
    id="$(curl -s "${CURL_AUTH[@]}" "$MAILPIT_URL/api/v1/messages?limit=1" | json 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log((j.messages||[])[0]?.ID||"")}catch{console.log("")}})')"
    [ -n "$id" ] && break
    sleep 1
  done

  local dados
  dados="$(curl -s "${CURL_AUTH[@]}" "$MAILPIT_URL/api/v1/message/$id" | json '
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
    echo "  nao achei o codigo de login no Mailpit ($MAILPIT_URL)" >&2
    exit 1
  fi

  curl -s -b "$JAR" -c "$JAR" -o /dev/null \
    "$TYPEBOT_URL/api/auth/callback/nodemailer?token=$token&email=$email_enc&callbackUrl=$(json 'console.log(encodeURIComponent(process.argv[1]+"/typebots"))' "$TYPEBOT_URL")"

  local sessao
  sessao="$(curl -s -b "$JAR" "$TYPEBOT_URL/api/auth/session" | json 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s)?.user?.email||"")}catch{console.log("")}})')"
  if [ -z "$sessao" ]; then
    echo "  o login nao completou (sessao vazia)" >&2
    exit 1
  fi
  echo "  sessao: $sessao"
}

# ---------------------------------------------------------------------------
# workspace do usuário logado (via banco do Typebot)
# ---------------------------------------------------------------------------
workspace() {
  # O SQL vai por stdin: com TSB_DOCKER="ssh quintal docker" as aspas do comando
  # se perdem no caminho (o ssh junta os argumentos) e o psql falharia calado.
  printf '%s\n' \
    "select m.\"workspaceId\" from \"MemberInWorkspace\" m join \"User\" u on u.id = m.\"userId\" where u.email = '$EMAIL' limit 1;" \
    | $DOCKER exec -i "$CONTAINER" psql -U "$USUARIO" -d "$DB" -tA | tr -d ' \r\n'
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
  # No primeiro login o Typebot cria o usuário; o workspace nasce ao abrir a
  # lista de bots.
  echo "workspace de $EMAIL ainda não existe; abrindo /typebots para criá-lo..."
  curl -s -b "$JAR" -o /dev/null "$TYPEBOT_URL/typebots"
  for _ in $(seq 1 10); do
    WS="$(workspace)"
    [ -n "$WS" ] && break
    sleep 1
  done
fi
if [ -z "$WS" ]; then
  echo "não achei o workspace de $EMAIL no banco $DB ($CONTAINER)" >&2
  exit 1
fi
echo "workspace: $WS"

API_KEY="$(chave_api)"
if [ -z "$API_KEY" ]; then
  echo "aviso: não achei a API_KEY do site; os fluxos vão subir com o placeholder $PLACEHOLDER" >&2
else
  echo "API_KEY do site encontrada (${#API_KEY} caracteres) — o placeholder será substituído no fluxo importado"
fi
echo "API do site nos fluxos: $API_BASE"

total=0
falhas=0

for arquivo in "$FLUXOS_DIR"/*.json; do
  nome_arquivo="$(basename "$arquivo" .json)"
  if [ -n "$filtro" ] && [ "$nome_arquivo" != "$filtro" ]; then
    continue
  fi

  nome="$(json 'console.log(require(process.argv[1]).typebot.name)' "$arquivo")"
  echo "importando $nome ($nome_arquivo.json)..."

  payload="$(json '
    const fs = require("fs");
    const [arquivo, ws, chave, base, origem] = process.argv.slice(1);
    const j = JSON.parse(fs.readFileSync(arquivo, "utf8"));
    const typebot = { ...j.typebot, folderId: null };
    let grupos = JSON.stringify(typebot.groups);
    grupos = grupos.split("TROCAR-PELA-API-KEY-LOCAL").join(chave);
    grupos = grupos.split(origem).join(base);
    typebot.groups = JSON.parse(grupos);
    process.stdout.write(JSON.stringify({ json: { workspaceId: ws, typebot, version: j.version } }));
  ' "$arquivo" "$WS" "$API_KEY" "$API_BASE" "$BASE_ORIGEM")"

  resposta="$(orpc typebot/importTypebot "$payload")"
  id="$(echo "$resposta" | json 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);console.log((j.json&&j.json.typebot&&j.json.typebot.id)||"")}catch{console.log("")}})')"

  if [ -z "$id" ]; then
    echo "  falhou: $(echo "$resposta" | head -c 200)"
    falhas=$((falhas + 1))
    continue
  fi

  slug="$(json 'const n=require(process.argv[1]).typebot.name;console.log(n.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+process.argv[2])' "$arquivo" "$SUFIXO")"

  # guarda o essencial para a segunda passada (remapear os links entre fluxos)
  json '
    const fs = require("fs");
    const [arquivo, destino, localId, resposta] = process.argv.slice(1);
    const j = JSON.parse(fs.readFileSync(arquivo, "utf8"));
    const r = JSON.parse(resposta);
    const typebot = (r.json && r.json.typebot) || {};
    fs.writeFileSync(destino, JSON.stringify({
      vpsId: j.typebot.id,
      localId,
      nome: j.typebot.name,
      groups: typebot.groups || j.typebot.groups,
    }));
  ' "$arquivo" "$ESTADO/$(basename "$arquivo")" "$id" "$resposta"

  orpc typebot/updateTypebot "{\"json\":{\"typebotId\":\"$id\",\"typebot\":{\"publicId\":\"$slug\"}}}" >/dev/null
  publicacao="$(orpc typebot/publishTypebot "{\"json\":{\"typebotId\":\"$id\"}}")"

  if echo "$publicacao" | grep -q '"message":"success"'; then
    echo "  ok -> publicId: $slug"
  else
    echo "  importou mas não publicou: $(echo "$publicacao" | head -c 160)"
    if echo "$publicacao" | grep -qi "free plan"; then
      echo "    -> o workspace está no plano FREE e os fluxos usam bloco de upload de arquivo."
      echo "       O builder sobe com DEFAULT_WORKSPACE_PLAN=UNLIMITED; se o workspace já existir no plano FREE, ajuste:"
      echo "       $DOCKER exec $CONTAINER psql -U $USUARIO -d $DB -c \"update \\\"Workspace\\\" set plan='UNLIMITED';\""
    fi
    falhas=$((falhas + 1))
  fi
  total=$((total + 1))
done

echo
echo "remapeando os links entre os fluxos (ids da origem -> ids importados)..."
json '
  const fs = require("fs");
  const path = require("path");
  const dir = process.argv[1];
  const bots = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
  const mapa = Object.fromEntries(bots.map((b) => [b.vpsId, b.localId]));
  let algum = false;
  for (const b of bots) {
    let trocas = 0;
    (function anda(o) {
      if (Array.isArray(o)) return o.forEach(anda);
      if (!o || typeof o !== "object") return;
      if (typeof o.typebotId === "string" && mapa[o.typebotId]) {
        o.typebotId = mapa[o.typebotId];
        trocas++;
      }
      Object.values(o).forEach(anda);
    })(b.groups);
    if (trocas) {
      fs.writeFileSync(
        path.join(dir, "update-" + b.localId + ".json"),
        JSON.stringify({ json: { typebotId: b.localId, typebot: { groups: b.groups } } })
      );
      console.log("  " + b.nome + ": " + trocas + " link(s) remapeado(s)");
      algum = true;
    }
  }
  if (!algum) console.log("  (nenhum link entre fluxos para remapear)");
' "$ESTADO"

for atualizacao in "$ESTADO"/update-*.json; do
  [ -e "$atualizacao" ] || continue
  id_local="$(basename "$atualizacao" .json | sed 's/^update-//')"
  curl -s -b "$JAR" -X POST "$TYPEBOT_URL/api/orpc/typebot/updateTypebot" \
    -H 'Content-Type: application/json' \
    -H "Origin: $TYPEBOT_URL" \
    -H "Referer: $TYPEBOT_URL/typebots" \
    --data-binary @"$atualizacao" >/dev/null
  orpc typebot/publishTypebot "{\"json\":{\"typebotId\":\"$id_local\"}}" >/dev/null
done

echo
echo "fluxos importados: $total (falhas: $falhas)"
echo "builder: $TYPEBOT_URL"
echo "viewer:  ${NEXT_PUBLIC_VIEWER_URL:-https://bot-dev.mulheresrurais.com.br}/<publicId>"
