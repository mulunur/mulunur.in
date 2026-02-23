import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ContactSection() {
  const { t } = useTranslation();
  const contactData = t('contact', { returnObjects: true }) as any;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
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
                className="text-xl text-white hover:text-primary-400 transition-colors"
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
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-dark-700 hover:bg-primary-600/20 text-dark-300 hover:text-primary-400 rounded transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-dark-700 hover:bg-primary-600/20 text-dark-300 hover:text-primary-400 rounded transition-colors"
                >
                  Twitter
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
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded focus:outline-none focus:border-primary-500"
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
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded focus:outline-none focus:border-primary-500"
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
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
