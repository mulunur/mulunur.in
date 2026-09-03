import { useTranslation } from 'react-i18next';

interface ContactData {
  title: string;
  email: string;
  emailLabel: string;
  social: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useTranslation();
  const contactData = t('contact', { returnObjects: true }) as ContactData;

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
        </div>
      </div>
    </section>
  );
}
