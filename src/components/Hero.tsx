import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
          {t('home.title')}
        </h1>

        <p className="font-logo text-3xl md:text-4xl font-bold text-primary-400 mb-8">
          {t('home.nickname')}
        </p>

        <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>
    </section>
  );
}
