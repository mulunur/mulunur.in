import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Определяем пути для статических файлов
// Поддерживаем оба варианта: когда server.js в корне и когда в dist
let DIST_DIR = path.join(__dirname, 'dist');
if (!fs.existsSync(DIST_DIR)) {
  // Если dist не найдена, предполагаем что мы уже в папке dist
  DIST_DIR = __dirname;
}

console.log(`📁 DIST_DIR: ${DIST_DIR}`);
console.log(`✅ dist exists: ${fs.existsSync(DIST_DIR)}`);

// Подаем статические файлы фронтенда из папки dist
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  console.log(`✅ Статические файлы подаются из: ${DIST_DIR}`);
}

// SPA fallback - отправляем index.html для всех маршрутов
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

// Запуск HTTP сервера
app.listen(PORT, () => {
  console.log(`\n🚀 HTTP сервер запущен на http://localhost:${PORT}`);
  console.log(`📌 Режим: ${NODE_ENV}`);
  console.log(`📁 Фронтенд подается из: ${DIST_DIR}`);

  const audioDir = path.join(DIST_DIR, 'audio');
  if (fs.existsSync(audioDir)) {
    const audioFiles = fs.readdirSync(audioDir).filter(f => /\.(mp3|wav|ogg|m4a)$/i.test(f));
    console.log(`🎵 Найдено аудиофайлов: ${audioFiles.length}`);
  } else {
    console.warn(`⚠️  Папка audio не найдена: ${audioDir}`);
  }
  console.log('');
});

// Запуск HTTPS сервера (если доступны сертификаты)
const certPath = process.env.CERT_PATH || '/etc/letsencrypt/live/mulunur.in/fullchain.pem';
const keyPath = process.env.KEY_PATH || '/etc/letsencrypt/live/mulunur.in/privkey.pem';

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  const options = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS сервер запущен на https://localhost:${HTTPS_PORT}`);
  });
} else if (NODE_ENV === 'production') {
  console.warn('⚠️  HTTPS сертификаты не найдены. Установите Let\'s Encrypt сертификаты для безопасного подключения.');
  console.warn(`Ожидаемые пути: ${certPath} и ${keyPath}`);
}
