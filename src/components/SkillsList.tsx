import { useTranslation } from 'react-i18next';

interface SkillCategory {
  title: string;
  items: string[];
}

interface SkillsData {
  title: string;
  programming: SkillCategory;
  design: SkillCategory;
  music: SkillCategory;
}

export default function SkillsList() {
  const { t } = useTranslation();

  const skillsData = t('skills', { returnObjects: true }) as SkillsData;

  const categories: { key: keyof Pick<SkillsData, 'programming' | 'design' | 'music'>; icon: string }[] = [
    { key: 'programming', icon: '💻' },
    { key: 'design', icon: '🎨' },
    { key: 'music', icon: '🎵' },
  ];

  return (
    <section className="flex items-center justify-center py-20 bg-dark-800">
      <div className="items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-center">
          {skillsData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(({ key, icon }) => {
            const category = skillsData[key];
            return (
              <div
                key={key}
                className="p-8 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-600/10"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-2xl font-semibold text-primary-400 mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center text-dark-300">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
