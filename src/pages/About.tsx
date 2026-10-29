import { useTranslation } from 'react-i18next';
import AboutCard from '../components/AboutCard';
import Interests from '../components/Interests';

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

      <Interests />

      <section className="flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display fs-3xl fw-bold mb-12">
            {t('skills.technologicalStack')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <div key={i} className="box p-4 text-center">
                <span className="fw-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display fs-3xl fw-bold mb-12 text-center">{t("about.journey")}</h2>

          <div className="space-y-8">
            {journeyData.map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="fs-xl fw-bold">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 timeline-line pl-6 relative">
                  <div className="absolute -left-3.5 w-4 h-4 round-full" />
                  <h3 className="fs-lg fw-semibold mb-1">
                    {milestone.title}
                  </h3>
                  <p>
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
