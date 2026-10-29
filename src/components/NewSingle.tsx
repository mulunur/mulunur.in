import { useTranslation } from "react-i18next";

export default function NewSingle() {
    const { t } = useTranslation();

    return (
        <div className="mb-8 p-6 box single-card">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <div className="flex-shrink-0 md:w-48">
                    <img
                        src="/images/single-cover.jpg"
                        alt="Священное королевство (о природе)"
                        className="single-cover w-full"
                    />
                </div>

                {/* Single Info */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <p className="fs-sm fw-semibold mb-1">{t("music.newSingle.attention")}</p>
                        <h3 className="fs-2xl fw-bold mb-2">
                            <span>Mulünur</span>
                            <span className="font-display"> - Священное королевство (о природе)</span>
                        </h3>
                        <p className="mb-4">
                            {t("music.newSingle.description")}
                        </p>
                    </div>

                    {/* Streaming Links */}
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://open.spotify.com/track/02UfwQNqrQ4WwIYESfyjTn?si=d3667c5198d04cd4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-green px-4 py-2 fw-semibold"
                        >
                            Spotify
                        </a>
                        <a
                            href="https://music.yandex.ru/album/42021068/track/151231294?utm_source=web&utm_medium=copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-yellow px-4 py-2 fw-semibold"
                        >
                            {t("music.newSingle.YandexMusic")}
                        </a>
                        <a
                            href="https://soundcloud.com/mulunur/svyashhennoe-korolevstvo-o?si=7544ecc3cf014e37adbb8eaaf6703726&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-orange px-4 py-2 fw-semibold"
                        >
                            SoundCloud
                        </a>
                    </div>
                    <p className="fs-sm mt-3">
                        {t("music.newSingle.OtherPlatforms")}
                    </p>
                </div>
            </div>
        </div>

    )
}
