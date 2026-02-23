import SkillsList from '../components/SkillsList';

export default function Skills() {
  return (
    <main className="pt-20">
      <SkillsList />
      
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Technical Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'React', 'TypeScript', 'JavaScript', 'Python', 'Three.js',
              'Tailwind CSS', 'WebGL', 'Blender', 'FL Studio', 'Web Audio API',
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
