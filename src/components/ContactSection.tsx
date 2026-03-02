import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const API_URL = 'http://localhost:3001/api';

export default function ContactSection() {
  const { t } = useTranslation();
  const contactData = t('contact', { returnObjects: true }) as any;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при отправке сообщения');
      }

      const result = await response.json();
      alert('Спасибо за ваше сообщение! Скоро я его прочитаю.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center  py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          {contactData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
              <h3 className="text-lg font-semibold text-primary-400 mb-2">
                {contactData.emailLabel}
              </h3>
              <a
                href={`mailto:${contactData.email}`}
                className="text-xl hover:text-primary-400 transition-colors"
              >
                {contactData.email}
              </a>
            </div>

            <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
              <h3 className="text-lg font-semibold text-primary-400 mb-4">
                {contactData.social}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/mulunur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-dark-700 hover:bg-primary-600/20 text-dark-300 hover:text-primary-400 rounded transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/anthropocene_angel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-dark-700 hover:bg-primary-600/20 text-dark-300 hover:text-primary-400 rounded transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>

            <p className="text-dark-300">
              {contactData.message}
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Отправка...' : 'Send Message'}
            </button>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-600 rounded text-red-400">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
