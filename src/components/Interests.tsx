import { useTranslation } from 'react-i18next';

const PLAYLISTS_URL = 'https://open.spotify.com/user/31q35dwip663cnr2o7pylgu3yaoi';

export default function Interests() {
  const { t } = useTranslation();
  const interests = t('about.interests', { returnObjects: true }) as string[];

  return (
    <section className="flex items-center justify-center pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="fs-lg lh-relaxed mb-6">
          {t('about.interestsLabel')} {interests.join(', ')}
        </p>

        <a
          href={PLAYLISTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link fw-semibold"
        >
          {t('about.playlists')} ↗
        </a>
      </div>
    </section>
  );
}
