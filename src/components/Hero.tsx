import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <div className="inline-block px-4 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full">
            <span className="text-primary-400 text-sm font-medium">{t("home.moto")}</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {t('home.title')}
        </h1>

        <p className="text-3xl md:text-4xl font-light text-primary-400 mb-8">
          {t('home.nickname')}
        </p>

        <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/portfolio"
            className="px-8 py-3 border border-primary-500 text-primary-400 hover:bg-primary-700 font-semibold rounded transition-colors"
          >
            {t('home.cta')}
          </Link>
          <Link
            to="/contact"
            className="flex border border-primary-500 text-primary-400 hover:bg-primary-600/10 font-semibold rounded transition-colors"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce text-primary-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
