import MusicSection from '../components/MusicSection';
import { useTranslation } from 'react-i18next';

export default function Music() {
  const { t} = useTranslation();

  return (
    <main className="pt-20">
      <MusicSection />

      {/* About Album */}
      <section className="flex justify-center items-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 box">
            <h3 className="font-display fs-2xl fw-bold mb-4">Upcoming Album</h3>
            <p className="lh-relaxed mb-4">
              {t('music.about')}
            </p>
            <p>
              Expected release: 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
