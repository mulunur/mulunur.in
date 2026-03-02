import SkillsList from '../components/SkillsList';
import { useTranslation } from 'react-i18next';

export default function Skills() {
    const { t } = useTranslation();
  return (
    <main className="pt-20">
      <SkillsList />
      
      <section className="flex items-center justify-center py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Technical Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
            {[
              '.Net', 'Python', 'React, React Native', 'TypeScript',
              'SQL', 'Operation Systems', 'Git', 'DevOps', 
              'Relational Databases', 'NoSQL',
              'Tailwind CSS', 'WebGL', 'Blender', 'Ableton', 'Web Audio API',
            ].map((tech, i) => (
              <div key={i} className="p-4 bg-dark-800 rounded-lg border border-dark-700 text-center hover:border-primary-500/50 transition-colors">
                <span className="text-dark-200 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
