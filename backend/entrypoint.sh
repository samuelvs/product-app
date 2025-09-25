#!/bin/sh

if [ ! -f /app/.env ]; then
  cp /app/.env.example /app/.env
  echo ".env criado a partir de .env.example"
fi

exec "$@"
