#!/bin/bash

# Быстрая шпаргалка для развертывания

echo "=== Локальная подготовка ==="
echo "1. Собрать production build:"
echo "   npm run build"
echo ""
echo "2. Тестировать production локально:"
echo "   NODE_ENV=production PORT=3000 npm run server"
echo ""

echo "=== Загрузка на сервер (через SCP) ==="
echo "scp -r package.json package-lock.json server.js dist/ user@your-server.com:/var/www/mulunur.in/"
echo ""

echo "=== На удаленном сервере ==="
echo "cd /var/www/mulunur.in"
echo "npm install --production"
echo ""

echo "=== Запуск (вариант 1: простой) ==="
echo "NODE_ENV=production PORT=80 node server.js"
echo ""

echo "=== Запуск (вариант 2: с PM2, рекомендуется) ==="
echo "npm install -g pm2  # если еще не установлен"
echo "pm2 start pm2.config.js"
echo "pm2 startup"
echo "pm2 save"
echo ""

echo "=== Полезные команды PM2 ==="
echo "pm2 list                    # Список процессов"
echo "pm2 logs mulunur-website    # Логи"
echo "pm2 restart mulunur-website # Перезагрузить"
echo "pm2 stop mulunur-website    # Остановить"
echo ""

echo "=== Обновление после изменений ==="
echo "npm run build                # локально"
echo "git push origin main         # закоммитить"
echo "cd /var/www/mulunur.in"
echo "git pull origin main         # на сервере"
echo "npm run build"
echo "pm2 restart mulunur-website"
echo ""

echo "=== Проверка ==="
echo "curl http://localhost:3001"
echo "curl http://localhost:3001/api/messages"
