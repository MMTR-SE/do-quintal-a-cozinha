#!/bin/sh
# Cria o banco de dados da Evolution API (WhatsApp de teste, so no ambiente de
# desenvolvimento) se ainda nao existir.
# Executado pelo entrypoint do postgres apenas na primeira inicializacao do volume.
set -e

if ! psql -U "$POSTGRES_USER" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='evolution'" | grep -q 1; then
  echo "Criando banco evolution..."
  psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE evolution OWNER $POSTGRES_USER;"
else
  echo "Banco evolution já existe."
fi
