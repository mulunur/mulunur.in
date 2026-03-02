# Развертывание сайта на удаленном сервере

## Локальная подготовка

### 1. Собрать production build
```bash
npm run build
```
Это создаст папку `dist/` с оптимизированным фронтендом.

### 2. Проверить build локально
```bash
NODE_ENV=production PORT=3000 npm run server
```
Откроешь http://localhost:3000 - сайт будет доступен как на production.

## Развертывание на удаленном сервере

### Структура на сервере
```
/var/www/mulunur.in/
├── package.json
├── server.js
├── dist/                    # Собранный фронтенд (создается после npm run build)
├── messages/                # Папка с сохраненными сообщениями
├── node_modules/
└── pm2.config.js            # Конфиг для PM2 (опционально)
```

### Способ 1: Через SCP (простой способ)

**На локальной машине:**
```bash
# 1. Собираем проект
npm run build

# 2. Загружаем файлы на сервер
scp -r package.json package-lock.json server.js dist/ user@your-server.com:/var/www/mulunur.in/
```

**На удаленном сервере:**
```bash
cd /var/www/mulunur.in

# Установим зависимости
npm install --production

# Запустим сервер
NODE_ENV=production PORT=80 node server.js
```

### Способ 2: Через Git (рекомендуется)

**На локальной машине:**
```bash
# Добавляем в .gitignore
echo "node_modules/
dist/
.env
messages/
*.log" >> .gitignore

git add .
git commit -m "Add backend and production build"
git push origin main
```

**На удаленном сервере:**
```bash
cd /var/www/mulunur.in

# Клонируем репозиторий
git clone https://github.com/mulunur/mulunur.in.git .

# Устанавливаем зависимости
npm install --production

# Собираем фронтенд
npm run build

# Запустим сервер
NODE_ENV=production PORT=80 node server.js
```

### Способ 3: С PM2 (production manager, рекомендуется)

**Установка PM2 на сервере:**
```bash
npm install -g pm2
```

**Создание конфига** (создай файл `pm2.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'mulunur-website',
    script: './server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    restart_delay: 4000,
    max_memory_restart: '1G',
    instances: 'max',
    exec_mode: 'cluster',
    error_file: './logs/error.log',
    out_file: './logs/out.log'
  }]
};
```

**На удаленном сервере:**
```bash
# Запуск через PM2
pm2 start pm2.config.js

# Автозагрузка при перезагрузке сервера
pm2 startup
pm2 save

# Смотреть логи
pm2 logs mulunur-website

# Перезагрузка после обновлений
pm2 restart mulunur-website
```

### Способ 4: С Nginx (для production на боевом сервере)

**Конфиг Nginx** (`/etc/nginx/sites-available/mulunur.in`):
```nginx
upstream mulunur_backend {
    server localhost:3001;
}

server {
    listen 80;
    server_name mulunur.in www.mulunur.in;

    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mulunur.in www.mulunur.in;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    client_max_body_size 10M;

    # Статические файлы (кеширование)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://mulunur_backend;
        proxy_cache_valid 30d;
        add_header Cache-Control "public, immutable";
    }

    # API
    location /api/ {
        proxy_pass http://mulunur_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Все остальное на приложение (SPA)
    location / {
        proxy_pass http://mulunur_backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активировать конфиг:
```bash
sudo ln -s /etc/nginx/sites-available/mulunur.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Резервная копия сообщений

Важно регулярно архивировать папку `messages/`:
```bash
# На сервере - создать архив
tar -czf messages-backup-$(date +%Y%m%d).tar.gz messages/

# Скопировать на локальную машину
scp user@your-server.com:/var/www/mulunur.in/messages-backup-*.tar.gz ~/backups/
```

## Обновление сайта

```bash
# На локальной машине
npm run build
git add .
git commit -m "Update content"
git push origin main

# На удаленном сервере
cd /var/www/mulunur.in
git pull origin main
npm run build
pm2 restart mulunur-website  # если используешь PM2
```

## Переменные окружения

При необходимости создание файла `.env`:
```
NODE_ENV=production
PORT=3001
```

Затем в server.js добавить:
```javascript
import dotenv from 'dotenv';
dotenv.config();
```

И добавить в dependencies `dotenv`.

## Логи и мониторинг

- PM2 логи: `pm2 logs`
- Nginx логи: `/var/log/nginx/access.log`, `/var/log/nginx/error.log`
- Сообщения сохраняются: `/var/www/mulunur.in/messages/`
