#!/usr/bin/env bash
set -e
cd /var/www/gzhel
git pull --ff-only
bash deploy/env.sh
npm ci --no-audit --no-fund
nice -n 10 npm run build
pm2 reload gzhel --update-env
echo "Обновлено"
