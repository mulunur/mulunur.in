import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const isActive = (path: string) => location.pathname === path;
  // const tickerText = t('ticker.text');

  const navLinks = [
    { path: '/about', label: t('nav.about') },
    // { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/paintings', label: t('nav.paintings') },
    { path: '/music', label: t('nav.music') },
    { path: '/cv', label: t('nav.cv') },
  ];

  return (
    <header className="site-header">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-x-3 md:gap-x-6">
          <Link
            to="/"
            className="font-logo fs-2xl fw-bold"
          >
            mulünur
          </Link>

          {/* Announcement ticker (hidden for now)
          <div className="ticker min-w-0 flex-1" aria-label={tickerText}>
            <div className="ticker-track">
              {[false, true].map((hidden) => (
                <span key={String(hidden)} className="ticker-copy" aria-hidden={hidden || undefined}>
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="ticker-item">
                      {tickerText}
                      <span className="ticker-sep">◆</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`fs-sm fw-medium ${
 isActive(path)
 ? ''
 : ' '
 }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 fs-sm fw-medium round-sm"
            >
              {i18n.language === 'en' ? 'RU' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-2 round-sm fs-sm fw-medium ${
 isActive(path)
 ? ' '
 : ' '
 }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
