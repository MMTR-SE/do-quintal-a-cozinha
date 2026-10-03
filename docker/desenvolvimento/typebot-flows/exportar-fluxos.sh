#!/usr/bin/env bash
#
# Exporta os fluxos PUBLICADOS do Typebot para JSON versionavel.
#
# Le apenas (SELECT) o banco do Typebot e grava um .json por fluxo nesta pasta.
# Como os fluxos da VPS tem a API_KEY de producao embutida nos blocos Webhook,
# o exportador faz dois ajustes para poder versionar e testar localmente:
#   1. o valor dos headers `API_KEY` vira o placeholder TROCAR-PELA-API-KEY-LOCAL
#   2. a base de producao (https://mulheresrurais.com.br/api) vira
#      http://dev-quintal:3000/api (o site local, que o viewer alcanca pela rede
#      interna do Docker)
#
# Uso local (banco do proprio ambiente de desenvolvimento):
#   bash docker/desenvolvimento/typebot-flows/exportar-fluxos.sh
#
# Uso apontando para outro ambiente -- ex.: a VPS, somente leitura:
#   SSH_HOST=quintal TSB_CONTAINER=typebot-typebot-db-1 TSB_USER=postgres \
#     bash docker/desenvolvimento/typebot-flows/exportar-fluxos.sh
#
# Variaveis: SSH_HOST, TSB_CONTAINER (padrao postgres), TSB_DB (padrao typebot),
#            TSB_USER (padrao quintal), TSB_SEM_LOCAL=1 para nao trocar a base.

set -u

AQUI="$(cd "$(dirname "$0")" && pwd)"
SSH_HOST="${SSH_HOST:-}"
CONTAINER="${TSB_CONTAINER:-postgres}"
DB="${TSB_DB:-typebot}"
USUARIO="${TSB_USER:-quintal}"

SQL=$(cat <<'SQL'
select t.name || '<<<>>>' || json_build_object(
  'typebot', json_build_object(
    'id', t.id, 'name', t.name, 'publicId', t."publicId", 'version', t.version, 'icon', t.icon,
    'groups', p.groups, 'variables', p.variables, 'edges', p.edges,
    'theme', p.theme, 'settings', p.settings, 'events', p.events
  ),
  'version', p.version
)::text
from "PublicTypebot" p join "Typebot" t on t.id = p."typebotId"
where p.id in (select distinct on (p2."typebotId") p2.id from "PublicTypebot" p2 order by p2."typebotId", p2."updatedAt" desc)
order by t.name;
SQL
)

if [ -n "$SSH_HOST" ]; then
  SAIDA="$(ssh "$SSH_HOST" "docker exec -i $CONTAINER psql -U $USUARIO -d $DB -tA -f -" <<<"$SQL" 2>/dev/null)"
else
  SAIDA="$(docker exec -i "$CONTAINER" psql -U "$USUARIO" -d "$DB" -tA -f - <<<"$SQL" 2>/dev/null)"
fi

if [ -z "${SAIDA// /}" ]; then
  echo "nenhum fluxo publicado encontrado (container=$CONTAINER db=$DB usuario=$USUARIO ssh=${SSH_HOST:-nao})" >&2
  exit 1
fi

printf '%s\n' "$SAIDA" | node -e '
  const fs = require("fs");
  const path = require("path");
  const dir = process.argv[1];
  const semLocal = process.env.TSB_SEM_LOCAL === "1";
  const PLACEHOLDER = "TROCAR-PELA-API-KEY-LOCAL";
  const PROD = "https://mulheresrurais.com.br/api";
  const LOCAL = "http://dev-quintal:3000/api";

  let entrada = "";
  process.stdin.on("data", (d) => (entrada += d));
  process.stdin.on("end", () => {
    let total = 0;
    for (const linha of entrada.split("\n").filter(Boolean)) {
      const corte = linha.indexOf("<<<>>>");
      if (corte < 0) continue;
      const nome = linha.slice(0, corte);

      let fluxo;
      try {
        fluxo = JSON.parse(linha.slice(corte + 6));
      } catch {
        console.error("  json invalido, pulando: " + nome);
        continue;
      }

      // 1) redige qualquer header de API key (nao depende de conhecer o valor)
      let redigidos = 0;
      const anda = (o) => {
        if (Array.isArray(o)) return o.forEach(anda);
        if (!o || typeof o !== "object") return;
        if (o.webhook && Array.isArray(o.webhook.headers)) {
          for (const h of o.webhook.headers) {
            if (h && typeof h.value === "string" && /api[_-]?key/i.test(h.key || "")) {
              if (h.value !== PLACEHOLDER) redigidos++;
              h.value = PLACEHOLDER;
            }
          }
        }
        Object.values(o).forEach(anda);
      };
      anda(fluxo);

      // 2) aponta a base da API para o site local
      let texto = JSON.stringify(fluxo, null, 2);
      let trocados = 0;
      if (!semLocal && texto.includes(PROD)) {
        trocados = texto.split(PROD).length - 1;
        texto = texto.split(PROD).join(LOCAL);
      }

      const slug = nome.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      fs.writeFileSync(path.join(dir, slug + ".json"), texto + "\n");
      console.log(
        "  " + nome.padEnd(18) + " -> " + slug + ".json" +
        " (API_KEY redigida em " + redigidos + " bloco(s)" +
        (semLocal ? "" : ", base local em " + trocados + " lugar(es)") + ")"
      );
      total++;
    }
    console.log("  fluxos exportados: " + total);
  });
' "$AQUI"
