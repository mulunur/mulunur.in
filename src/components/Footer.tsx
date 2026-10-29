import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Brand */}
          <div>
            <h3 className="font-logo fs-xl fw-bold">
              mulünur
            </h3>
            <p className="mt-2 fs-sm">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="fw-semibold mb-4">{t('nav.home')}</h4>
            <ul className="space-y-2 fs-sm">
              <li>
                <a href="/">
                  {t('nav.portfolio')}
                </a>
              </li>
              <li>
                <a href="/music">
                  {t('nav.music')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='grid grid-cols-2'>
            <div>
            <h4 className="fw-semibold mb-4">{t('footer.links.github')}</h4>
            <ul className="space-y-2 fs-sm">
              <li>
                <a
                  href="https://github.com/mulunur"
                  target="_blank"
                  rel="noopener noreferrer"
                 
                >
                  {t('footer.links.github')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="fw-semibold mb-4">{t('footer.links.telegram')}</h4>
            <ul className="space-y-2 fs-sm">
              <li>
                <a
                  href="https://t.me/anthropocene_angel"
                  target="_blank"
                  rel="noopener noreferrer"
                 
                >
                  {t('footer.links.telegram')}
                </a>
              </li>
            </ul>
          </div>
        </div>
          </div>

        {/* <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between fs-sm">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">
              Privacy
            </a>
            <a href="#">
              Terms
            </a>
          </div>
        </div> */}
      </div>
      <img className="bottom-0 h-40 left-1/2 -translate-x-1/2" src={'/images/rainbowSpark.png'} alt="Company Logo" />
    </footer>
  );
}
