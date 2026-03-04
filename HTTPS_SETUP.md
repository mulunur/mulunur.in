# Установка HTTPS для вашего сайта

## Шаг 1: Получить бесплатный SSL сертификат от Let's Encrypt

### На Linux сервере:

```bash
# Установите Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Получите сертификат (замените domain.com на ваш домен)
sudo certbot certonly --standalone -d domain.com -d www.domain.com

# Следите за датой истечения (обычно 90 дней)
# Автоматическое продление настраивается автоматически
```

### На macOS:
```bash
brew install certbot
certbot certonly --standalone -d domain.com -d www.domain.com
```

## Шаг 2: Порты

- **HTTP**: 3001 (HTTP)
- **HTTPS**: 3443 (HTTPS)

Убедитесь, что эти порты открыты в вашем файерволе/облачном провайдере.

## Шаг 3: Настройка Nginx (Рекомендуется)

Nginx будет проксировать трафик на ваш Node.js сервер и автоматически редиректить с HTTP на HTTPS:

```bash
sudo nano /etc/nginx/sites-available/default
```

Вставьте конфигурацию:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name domain.com www.domain.com;
    
    # Автоматический редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name domain.com www.domain.com;

    # SSL сертификаты от Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;

    # Сильные SSL параметры
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS - принудительная работа по HTTPS на 1 год
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Другие заголовки безопасности
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass https://localhost:3443;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Проверьте конфигурацию и перезагрузитесь:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Шаг 4: Обновить pm2

```bash
pm2 restart mulunur-website

# Или пересоздать конфигурацию
pm2 delete mulunur-website
pm2 start pm2.config.js
pm2 save
```

## Шаг 5: Проверить сертификат

```bash
# Проверить срок действия
certbot certificates

# Проверить на сайте
curl -I https://domain.com
```

## Переменные окружения

Обновите переменные в `pm2.config.js` согласно вашему домену:

```javascript
CERT_PATH: '/etc/letsencrypt/live/ВАЕR_ДОМЕН/fullchain.pem',
KEY_PATH: '/etc/letsencrypt/live/ВАШ_ДОМЕН/privkey.pem'
```

## Автоматическое обновление сертификата

Let's Encrypt сертификаты действуют 90 дней. Автоматическое обновление обычно настраивается при установке:

```bash
# Проверить cron работет
sudo systemctl status certbot.timer

# Или вручную
sudo certbot renew --dry-run
```

## Безопасность

✅ Включены:
- TLS 1.2 и 1.3
- HSTS для принудительного HTTPS
- Ограничение содержимого (X-Content-Type-Options)
- Защита от clickjacking (X-Frame-Options)

## Помощь

- [Let's Encrypt документация](https://letsencrypt.org/docs/)
- [Nginx конфигурация](https://www.nginx.com/resources/wiki/)
- [Mozilla SSL конфиг генератор](https://ssl-config.mozilla.org/)
