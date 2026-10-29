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
    <section className="flex justify-center items-center py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display fs-title fw-bold mb-12 text-center">
          {contactData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="box p-6">
              <h3 className="fs-lg fw-semibold mb-2">
                {contactData.emailLabel}
              </h3>
              <a
                href={`mailto:${contactData.email}`}
                className="fs-xl"
              >
                {contactData.email}
              </a>
            </div>

            <div className="box p-6">
              <h3 className="fs-lg fw-semibold mb-4">
                {contactData.social}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/mulunur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 round-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/anthropocene_angel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 round-sm"
                >
                  Telegram
                </a>
              </div>
            </div>

            <p>
              {contactData.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
