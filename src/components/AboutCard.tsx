import { useTranslation } from 'react-i18next';

export default function AboutCard() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          {t('about.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Programming */}
          <div className="p-8 bg-dark-800 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-colors">
            <h3 className="text-2xl font-semibold text-primary-400 mb-4">Programming</h3>
            <p className="text-dark-300 leading-relaxed">
              {t('about.bio')}
            </p>
          </div>

          {/* Right Column - Music */}
          <div className="space-y-6">
            <div className="p-8 bg-dark-800 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-colors">
              <h3 className="text-2xl font-semibold text-primary-400 mb-4">Music</h3>
              <p className="text-dark-300 leading-relaxed">
                {t('about.music')}
              </p>
            </div>

            <div className="p-8 bg-dark-800 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-colors">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">Current Project</h3>
              <p className="text-dark-300">
                {t('about.album')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-primary-600/10 to-primary-500/5 border border-primary-500/30 rounded-lg">
          <p className="text-dark-200 text-lg leading-relaxed">
            {t('about.passion')}
          </p>
        </div>
      </div>
    </section>
  );
}
