import { useTranslation } from 'react-i18next';
import AboutCard from '../components/AboutCard';
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export default function About() {
const { t } = useTranslation();

const jorneyData = t('about.timeline', { returnObjects: true }) as any;
  return (
    <main className="pt-20">
      <AboutCard />

      {/* Timeline */}
      <section className="flex items-center justify-center  py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("about.journey")}</h2>

          <div className="space-y-8">
            {jorneyData.map((milestone: { year: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; desc: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }, i: Key | null | undefined) => (
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
