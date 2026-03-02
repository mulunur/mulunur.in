import MusicSection from '../components/MusicSection';
import { useTranslation } from 'react-i18next';

export default function Music() {
  const { t} = useTranslation();

  return (
    <main className="pt-20">
      <MusicSection />

      {/* About Album */}
      <section className="flex justify-center items-center py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-r from-primary-600/10 to-primary-500/5 border border-primary-500/30 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Upcoming Album</h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              {t('music.about')}
            </p>
            <p className="text-dark-300">
              Expected release: 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
