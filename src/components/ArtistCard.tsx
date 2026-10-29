import { useTranslation } from 'react-i18next';

const ARTIST_LINKS = {
  spotify: 'https://open.spotify.com/artist/34m9zlmlzpu7I8Etfb6uHA',
  yandex: 'https://music.yandex.ru/artist/25946736',
  soundcloud: 'https://soundcloud.com/mulunur',
};

export default function ArtistCard() {
  const { t } = useTranslation();

  const platforms = [
    { key: 'spotify', label: 'Spotify', href: ARTIST_LINKS.spotify },
    { key: 'yandex', label: t('artistCard.yandex'), href: ARTIST_LINKS.yandex },
    { key: 'soundcloud', label: 'SoundCloud', href: ARTIST_LINKS.soundcloud },
  ];

  return (
    <div className="flex justify-center pt-6">
      <div className="box-featured w-fit max-w-full px-8 py-6">
        <div>
          <p className="mb-1 kicker">
            {t('artistCard.kicker')}
          </p>
          <h3 className="font-display mb-1 fs-3xl fw-bold">mulünur</h3>
          <p className="mb-4">{t('artistCard.line')}</p>

          <div className="flex flex-wrap justify-center gap-2">
            {platforms.map(({ key, label, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill inline-flex items-center gap-1 px-3.5 py-1.5 fs-sm fw-semibold"
              >
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
