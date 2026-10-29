import { useTranslation } from 'react-i18next';
import ArtistCard from './ArtistCard';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img
          src="/images/lettering-text.png"
          alt={t('home.nickname')}
          className="lettering-text mx-auto mb-2 mt-2.5 block h-auto"
        />

        <h1 className="hero-title text-glow font-display mb-4">
          {t('home.title')}
        </h1>

        <p className="text-glow hero-subtitle max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>

        <img
          src="/images/lettering-stroke.png"
          alt=""
          aria-hidden="true"
          className="lettering-stroke mx-auto mt-[13px] block h-auto"
        />

        <ArtistCard />
      </div>
    </section>
  );
}
