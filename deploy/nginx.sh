#!/usr/bin/env bash
# Открывает сайт на 80 порту через nginx. Чужие сайты не трогает: свой конфиг и свой server_name.
# Использование: bash deploy/nginx.sh            (по IP)
#                bash deploy/nginx.sh домен.ru www.домен.ru   (IP + домен)
set -e
PORT=${PORT:-3010}
IP=$(curl -s ifconfig.me)
NAMES="$IP $*"
command -v nginx >/dev/null || { apt-get update -y && apt-get install -y nginx; }

cat > /etc/nginx/conf.d/gzhel.conf <<'CONF'
server {
  listen 80;
  server_name __NAMES__;
  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;
  location /_next/static/ {
    proxy_pass http://127.0.0.1:__PORT__;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
  location / {
    proxy_pass http://127.0.0.1:__PORT__;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
CONF
sed -i "s|__NAMES__|$NAMES|; s|__PORT__|$PORT|g" /etc/nginx/conf.d/gzhel.conf

nginx -t
systemctl reload nginx || systemctl restart nginx
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then ufw allow 80/tcp; fi
echo "Готово: http://$IP"
