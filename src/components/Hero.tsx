import { useTranslation } from 'react-i18next';
import ArtistCard from './ArtistCard';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img
          src="/images/lettering-text.png"
          alt={t('home.nickname')}
          className="mx-auto mb-2 block h-auto"
          style={{ width: 'min(692px, 100%)', transform: 'translateX(8px)' }}
        />

        <h1 className="text-glow font-display text-5xl md:text-7xl font-bold text-white mb-4">
          {t('home.title')}
        </h1>

        <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>

        <img
          src="/images/lettering-stroke.png"
          alt=""
          aria-hidden="true"
          className="mx-auto mt-2 block h-auto"
          style={{ width: 'min(395px, 70%)', transform: 'translateX(11px)' }}
        />

        <ArtistCard />
      </div>
    </section>
  );
}
