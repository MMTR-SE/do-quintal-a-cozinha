#!/bin/sh
# Cria o banco de dados do Typebot se ainda não existir.
# Executado pelo entrypoint do postgres apenas na primeira inicialização do volume.
set -e

if ! psql -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='typebot'" | grep -q 1; then
  echo "Criando banco typebot..."
  psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE typebot OWNER $POSTGRES_USER;"
else
  echo "Banco typebot já existe."
fi
