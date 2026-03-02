import { useTranslation } from 'react-i18next';
import AboutCard from '../components/AboutCard';

export default function About() {
const { t } = useTranslation();
  return (
    <main className="pt-20">
      <AboutCard />

      {/* Timeline */}
      <section className="flex items-center justify-center  py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">{t("about.journey")}</h2>

          <div className="space-y-8">
            {[
              { year: '2006', title: 'Started at age 5', desc: 'Vocal and choir lessons at music school' },
              { year: '2010', title: 'Age 9', desc: 'Started piano lessons and tennis' },
              { year: '2015', title: 'First Programs', desc: 'Explored beauty of programming and math' },
              { year: '2016', title: 'Electric Guitar', desc: 'Transitioned to electric guitar' },
              { year: '2017', title: 'Art School', desc: 'Transitioned from tennis to art school, studing paintings' },
              { year: '2019', title: 'University', desc: 'Started studying Computer Science at Moscow Technological University' },
              { year: '2022', title: 'First full time job', desc: 'Started working as a software developer at Main Science-Informational-Computational Centre (GNIVC)' },
              { year: '2024', title: 'Music', desc: 'Working on debut music album' },
            ].map((milestone, i) => (
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
