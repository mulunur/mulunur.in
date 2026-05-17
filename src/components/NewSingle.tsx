import { useTranslation } from "react-i18next";

export default function NewSingle() {
    const { t } = useTranslation();
    
    return (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-600/20 to-primary-400/10 rounded-lg border border-primary-500/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary-500/50 transition-all">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            <div className="flex-shrink-0 md:w-48">
              <img 
                src="/images/single-cover.jpg"
                alt="Священное королевство (о природе)"
                className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Single Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-primary-400 text-sm font-semibold mb-1">NEW SINGLE</p>
                <h3 className="text-2xl font-bold mb-2">
                  Mulünur - Священное королевство (о природе)
                </h3>
                <p className="text-dark-300 mb-4">
                    {t("music.newSingle.description")}
                </p>
              </div>
              
              {/* Streaming Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://soundcloud.com/mulunur/svyashhennoe-korolevstvo-o?si=7544ecc3cf014e37adbb8eaaf6703726&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-600/80 hover:bg-primary-600 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  SoundCloud
                </a>
                <a
                  href="https://open.spotify.com/track/02UfwQNqrQ4WwIYESfyjTn?si=d3667c5198d04cd4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600/80 hover:bg-green-600 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Spotify
                </a>
                <a
                  href="https://music.yandex.ru/album/42021068/track/151231294?utm_source=web&utm_medium=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow-500/90 hover:bg-yellow-600 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Яндекс Музыка
                </a>
              </div>
            </div>
          </div>
        </div>

    )
}
