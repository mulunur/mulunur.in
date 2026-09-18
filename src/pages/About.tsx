import { useTranslation } from 'react-i18next';
import AboutCard from '../components/AboutCard';
import SkillsList from '../components/SkillsList';

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export default function About() {
  const { t } = useTranslation();

  const journeyData = t('about.timeline', { returnObjects: true }) as Milestone[];
  const techStack = t('skills.techStack', { returnObjects: true }) as string[];
  return (
    <main className="pt-20">
      <AboutCard />

      <SkillsList />

      <section className="flex items-center justify-center py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-12">
            {t('skills.technologicalStack')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <div key={i} className="p-4 bg-dark-800 rounded-lg border border-dark-700 text-center hover:border-primary-500/50 transition-colors">
                <span className="text-dark-200 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="flex items-center justify-center  py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-12 text-center">{t("about.journey")}</h2>

          <div className="space-y-8">
            {journeyData.map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-xl font-bold text-primary-400">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-dark-700 pl-6 relative">
                  <div className="absolute -left-3.5 w-4 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-lg font-semibold mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-dark-400">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
