import { useTranslation } from 'react-i18next';

export default function AboutCard() {
  const { t } = useTranslation();

  return (
    <section className="flex items-center justify-center pt-20 pb-8 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center">
          {t('about.title')}
        </h2>
      </div>
    </section>
  );
}
