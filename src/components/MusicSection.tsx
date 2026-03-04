import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

interface AudioFile {
  filename: string;
  path: string;
  name: string;
}

export default function MusicSection() {
  const { t } = useTranslation();
  const musicData = t('music', { returnObjects: true }) as any;
  
  const [playing, setPlaying] = useState<number | null>(null);
  const [tracks, setTracks] = useState<AudioFile[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  // Загружаем доступные аудиофайлы с сервера
  useEffect(() => {
    const loadAudioFiles = async () => {
      try {
        const response = await fetch('/api/audio-files');
        const audioFiles: AudioFile[] = await response.json();
        setTracks(audioFiles);
      } catch (error) {
        console.log('Невозможно загрузить список треков:', error);
      }
    };

    loadAudioFiles();
  }, []);

  const handlePlay = (index: number) => {
    // Если уже играет этот трек, паузируем
    if (playing === index) {
      setPlaying(null);
      if (audioRefs.current[index]) {
        audioRefs.current[index]?.pause();
      }
      return;
    }

    // Паузируем предыдущий трек
    if (playing !== null && audioRefs.current[playing]) {
      audioRefs.current[playing]?.pause();
    }

    // Играем новый трек
    setPlaying(index);
    if (audioRefs.current[index]) {
      audioRefs.current[index]?.play();
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    setDuration(audio.duration);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return duration ? (currentTime / duration) * 100 : 0;
  };

  return (
    <section className="flex items-center justify-center bg-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
          {tracks.length > 0 ? (
            tracks.map((track: AudioFile, index: number) => (
              <div
                key={index}
                className="p-6 bg-dark-900 rounded-lg border border-dark-700 hover:border-primary-500/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Play Button */}
                  <button
                    onClick={() => handlePlay(index)}
                    className="flex-shrink-0 w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors"
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
                    <h4 className="text-lg font-semibold">
                      {track.name}
                    </h4>
                    <p className="text-dark-400 text-sm">
                      mulünur
                    </p>
                  </div>

                  {/* Time Info */}
                  {playing === index && (
                    <div className="text-sm text-dark-400">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </div>
                  )}

                  {/* Audio Element */}
                  <audio
                    ref={(el) => {
                      audioRefs.current[index] = el;
                    }}
                    src={track.path}
                    onEnded={() => setPlaying(null)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                </div>

                {/* Progress Bar */}
                {playing === index && (
                  <div className="mt-4 h-1 bg-dark-700 rounded-full overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-primary-500 transition-all" 
                      style={{ width: `${getProgressPercentage()}%` }} 
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-dark-400">Загрузка треков...</p>
          )}
        </div>
      </div>
    </section>
  );
}
