import { useEffect, useState } from 'react';

// Определяем API URL на основе окружения
const getApiUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001/api';
  }
  // Для production используем текущий домен
  return '/api';
};

const API_URL = getApiUrl();

interface Message {
  filename: string;
  content: string;
  createdAt: string;
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch(`${API_URL}/messages`);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке сообщений');
      }

      const data: Message[] = await response.json();
      setMessages(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Сохраненные сообщения
        </h2>

        {error && (
          <div className="p-4 mb-8 bg-red-900/30 border border-red-600 rounded text-red-400">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-dark-300">
            Загрузка сообщений...
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="text-center text-dark-300">
            Нет сохраненных сообщений
          </div>
        )}

        <div className="grid gap-6">
          {messages.map((message) => {
            // Парсим данные из содержимого файла
            const lines = message.content.split('\n');
            const author = lines[0]?.replace('Автор: ', '') || 'Unknown';
            const email = lines[1]?.replace('Email: ', '') || '';
            const date = lines[2]?.replace('Дата: ', '') || '';
            // Содержимое начинается после пустой строки (после '─────...')
            const contentStart = lines.findIndex(line => line.includes('─────'));
            const content = lines.slice(contentStart + 1).join('\n').trim();

            return (
              <div
                key={message.filename}
                className="p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-primary-500/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-400">
                      {author}
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-dark-300 hover:text-primary-400 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                  <div className="text-xs text-dark-400">
                    {date}
                  </div>
                </div>

                <div className="border-t border-dark-700 pt-4">
                  <p className="text-dark-200 whitespace-pre-wrap">
                    {content}
                  </p>
                </div>

                <div className="text-xs text-dark-400 mt-4">
                  Файл: {message.filename}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={loadMessages}
          disabled={isLoading}
          className="mt-8 px-6 py-3 bg-primary-600 hover:bg-primary-700 font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Обновить
        </button>
      </div>
    </section>
  );
}
