import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-dark-900 border-t border-dark-700 mt-20">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              mulünur
            </h3>
            <p className="mt-2 text-dark-400 text-sm">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-dark-200 font-semibold mb-4">{t('nav.home')}</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a href="/" className="hover:text-primary-400 transition-colors">
                  {t('nav.portfolio')}
                </a>
              </li>
              <li>
                <a href="/music" className="hover:text-primary-400 transition-colors">
                  {t('nav.music')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='grid grid-cols-2'>
            <div>
            <h4 className="text-dark-200 font-semibold mb-4">{t('footer.links.github')}</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a
                  href="https://github.com/mulunur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('footer.links.github')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-dark-200 font-semibold mb-4">{t('footer.links.telegram')}</h4>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <a
                  href="https://t.me/anthropocene_angel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('footer.links.telegram')}
                </a>
              </li>
            </ul>
          </div>
        </div>
          </div>

        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-dark-400">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
      <img className="bottom-0 h-40 left-1/2 -translate-x-1/2" src={'/images/rainbowSpark.png'} alt="Company Logo" />
    </footer>
  );
}
