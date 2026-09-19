import { useTranslation } from 'react-i18next';
import ContactSection from '../components/ContactSection';

export default function CV() {
  const { t, i18n } = useTranslation();
  
  // Determine which files to use based on the current language
  const isRussian = i18n.language === 'ru';
  const cvImage = isRussian 
    ? '/cv/CV - Taisia Kartamysheva-RU.png' 
    : '/cv/CV - Taisia Kartamysheva-EN.png';
  const cvFile = isRussian 
    ? '/cv/CV-Kartamysheva-RU.pdf' 
    : '/cv/CV-Kartamysheva-EN.pdf';
  const cvFileName = isRussian
    ? 'CV - Картамышева Таисия.pdf'
    : 'CV - Taisia Kartamysheva.pdf';

  return (
    <main className="pt-6">
      <section className="flex justify-center items-center pb-20">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">{t('cv.title')}</h1>

          {/* Download button */}
          <div className="flex justify-center mb-6">
            <a
              href={cvFile}
              download={cvFileName}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              {t('cv.downloadLabel')}
            </a>
          </div>

          {/* CV Image Container */}
          <div className="flex justify-center items-center overflow-hidden">
            <img
              src={cvImage}
              alt={t('cv.title')}
              className="shadow-lg w-166 h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
