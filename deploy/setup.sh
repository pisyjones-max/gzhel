#!/usr/bin/env bash
# Первая установка. Другие сайты на сервере не трогает: свой каталог, свой pm2-процесс gzhel, свой порт.
set -e
APP=gzhel
DIR=/var/www/gzhel
PORT=${PORT:-3010}
REPO=https://github.com/pisyjones-max/gzhel.git

command -v node >/dev/null || { echo "Нет node, поставь Node 20+"; exit 1; }
command -v pm2 >/dev/null || npm i -g pm2

mkdir -p /var/www
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull --ff-only; else git clone "$REPO" "$DIR"; fi
cd "$DIR"
bash deploy/env.sh
npm ci --no-audit --no-fund
nice -n 10 npm run build

pm2 delete $APP >/dev/null 2>&1 || true
pm2 start npm --name $APP -- run start -- -p "$PORT"
pm2 save

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then ufw allow "$PORT"/tcp; fi

echo "Готово: http://$(curl -s ifconfig.me):$PORT"
