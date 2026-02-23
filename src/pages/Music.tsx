import MusicSection from '../components/MusicSection';
import { useTranslation } from 'react-i18next';

export default function Music() {
  const { t } = useTranslation();

  return (
    <main className="pt-20">
      <MusicSection />

      {/* About Album */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-gradient-to-r from-primary-600/10 to-primary-500/5 border border-primary-500/30 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Upcoming Album</h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              I'm currently working on my debut album, blending electronic production with jazz influences and live instrumentation. The project explores the intersection of electronic music and traditional jazz harmony.
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
