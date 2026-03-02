import { useTranslation } from 'react-i18next';

export default function PortfolioGrid() {
  const { t } = useTranslation();

  const portfolioData = t('portfolio', { returnObjects: true }) as any;
  const projects = portfolioData.projects;

  return (
    <section className="flex items-center justify-center py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {portfolioData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              className="group bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-600/20"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-600/20 to-primary-500/5 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-dark-700 flex items-center justify-center text-primary-400/30 text-4xl group-hover:scale-105 transition-transform">
                  📸
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.name}
                </h3>
                <p className="text-dark-300 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary-600/20 text-primary-300 rounded border border-primary-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
