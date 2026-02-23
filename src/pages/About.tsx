import { useTranslation } from 'react-i18next';
import AboutCard from '../components/AboutCard';

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="pt-20">
      <AboutCard />

      {/* Timeline */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Journey</h2>

          <div className="space-y-8">
            {[
              { year: '2005', title: 'Started at age 5', desc: 'Piano lessons at music school' },
              { year: '2010', title: 'Age 14', desc: 'Started programming + music production' },
              { year: '2012', title: 'Fractal Projects', desc: 'Created generative art with fractals' },
              { year: '2015', title: '3D Modeling', desc: 'Explored 3D design and modeling' },
              { year: '2018', title: 'Electric Guitar', desc: 'Transitioned to electric guitar' },
              { year: '2023', title: 'Jazz Piano Focus', desc: 'Started jazz piano studies' },
              { year: '2026', title: 'Album in Progress', desc: 'Working on debut music album' },
            ].map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-xl font-bold text-primary-400">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-dark-700 pl-6 relative">
                  <div className="absolute -left-3.5 w-4 h-4 bg-primary-500 rounded-full" />
                  <h3 className="text-lg font-semibold text-white mb-1">
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
