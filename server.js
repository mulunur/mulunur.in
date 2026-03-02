import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MESSAGES_DIR = path.join(__dirname, 'messages');

// Определяем пути для статических файлов
const DIST_DIR = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// В production - подаем статические файлы фронтенда
if (NODE_ENV === 'production' && fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// Создаем папку messages, если её нет
if (!fs.existsSync(MESSAGES_DIR)) {
  fs.mkdirSync(MESSAGES_DIR, { recursive: true });
}

// POST endpoint - сохранение сообщения
app.post('/api/messages', (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    // Создаем уникальное имя файла с временной меткой
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}_${name.replace(/\s+/g, '_')}.txt`;
    const filepath = path.join(MESSAGES_DIR, filename);

    // Формируем содержимое файла
    const fileContent = `Автор: ${name}
Email: ${email}
Дата: ${new Date().toLocaleString('ru-RU')}
─────────────────────

${message}`;

    // Сохраняем файл
    fs.writeFileSync(filepath, fileContent, 'utf-8');

    res.json({ success: true, message: 'Сообщение сохранено', filename });
  } catch (error) {
    console.error('Ошибка при сохранении сообщения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// GET endpoint - получение всех сообщений
app.get('/api/messages', (req, res) => {
  try {
    if (!fs.existsSync(MESSAGES_DIR)) {
      return res.json([]);
    }

    const files = fs.readdirSync(MESSAGES_DIR);
    const messages = files.map(file => {
      const filepath = path.join(MESSAGES_DIR, file);
      const content = fs.readFileSync(filepath, 'utf-8');
      const stats = fs.statSync(filepath);

      return {
        filename: file,
        content,
        createdAt: stats.birthtime
      };
    });

    // Сортируем по дате (новые сверху)
    messages.sort((a, b) => b.createdAt - a.createdAt);

    res.json(messages);
  } catch (error) {
    console.error('Ошибка при чтении сообщений:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// GET endpoint - получение одного сообщения
app.get('/api/messages/:filename', (req, res) => {
  try {
    const filepath = path.join(MESSAGES_DIR, req.params.filename);

    // Проверка на security (не давать доступ выше MESSAGES_DIR)
    if (!filepath.startsWith(MESSAGES_DIR)) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    res.json({ filename: req.params.filename, content });
  } catch (error) {
    console.error('Ошибка при чтении сообщения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// SPA fallback - отправляем index.html для всех остальных маршрутов
app.get('*', (req, res) => {
  if (NODE_ENV === 'production' && fs.existsSync(DIST_DIR)) {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Режим: ${NODE_ENV}`);
  console.log(`Сообщения сохраняются в папке: ${MESSAGES_DIR}`);
});
