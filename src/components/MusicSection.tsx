import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function MusicSection() {
  const { t } = useTranslation();
  const musicData = t('music', { returnObjects: true }) as any;
  const tracks = musicData.tracks;
  const [playing, setPlaying] = useState<number | null>(null);

  //  max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
  return (
    <section className="flex items-center justify-center bg-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {musicData.title}
          </h2>
          <p className="text-dark-300 text-lg mb-4">
            {musicData.subtitle}
          </p>
          <div className="inline-block px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded">
            <p className="text-primary-400 font-semibold">
              {musicData.album}
            </p>
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-4">
          {tracks.map((track: any, index: number) => (
            <div
              key={index}
              className="p-6 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Play Button */}
                <button
                  onClick={() => setPlaying(playing === index ? null : index)}
                  className="flex-shrink-0 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  {playing === index ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">
                    {track.name}
                  </h4>
                  <p className="text-dark-400 text-sm">
                    {track.artist} • {track.duration}
                  </p>
                </div>

                {/* Audio Player (Hidden, for future implementation) */}
                <audio
                  key={index}
                  src={`/audio/sample-${index + 1}.mp3`}
                  autoPlay={playing === index}
                  onEnded={() => setPlaying(null)}
                />
              </div>

              {/* Progress Bar */}
              {playing === index && (
                <div className="mt-4 h-1 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 animate-pulse" style={{ width: '30%' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
