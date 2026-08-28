#!/bin/sh
# Cria o banco de dados do CMS (Strapi) se ainda não existir.
# Executado pelo entrypoint do postgres apenas na primeira inicialização do volume.
set -e

if ! psql -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='quintal_cms'" | grep -q 1; then
  echo "Criando banco quintal_cms..."
  psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE quintal_cms OWNER $POSTGRES_USER;"
else
  echo "Banco quintal_cms já existe."
fi
