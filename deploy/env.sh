#!/usr/bin/env bash
# Создаёт .env.production с PIN продавца и ключом статистики, если файла ещё нет.
ENVF=/var/www/gzhel/.env.production
mkdir -p /var/www/gzhel-data
if [ ! -f "$ENVF" ]; then
  PIN=$(shuf -i 100000-999999 -n1)
  KEY=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
  printf 'DATA_DIR=/var/www/gzhel-data\nSHOP_PIN=%s\nADMIN_KEY=%s\n' "$PIN" "$KEY" > "$ENVF"
  chmod 600 "$ENVF"
  echo "PIN для продавцов: $PIN"
  echo "Ключ статистики: $KEY"
fi
