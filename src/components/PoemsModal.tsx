import { useEffect } from 'react';

interface PoemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  poem: string;
}

const poems = [
`Я нашла тебя в дискорде,
Узнала твое имя - Юзу,
Ты стал для меня открытием,
Как солнце в небе по утрам.`,

  `Летит и плавает Юзу мяч,
Прошелся по стенам легко,
И время в танце не спешит,
Волшебный круг все ввысь летит.`,

  `В движенье жизнь, в прыганье смысл,
Узу весёлый мне поёт,
Танцует в воздухе с улыбкой,
И в прыгах радость мне поёт.`,

  `Жёлтый мяч танцует в воздухе,
Как звезда упала с выси,
Прыг-скок, беги, лети скорее,
Приноси утеху игры.`,

  `Когда танцует мой Юзу,
Забуду грусть, забуду боль,
Волшебный мой волшебный мяч,
Тебе спасибоч.`,

  `В пространстве воздуха летает,
Красивый мне приносит сон,
Прыгаю, танцую вместе,
И слышу радости звон.`,

  `Юзу летит, Юзу танцует,
В движенье вечном, в танце том,
На стенки мяч наш отскочит,
И создаёт волшебный дом.`,
];

export function getRandomPoem(): string {
  return poems[Math.floor(Math.random() * poems.length)];
}

export default function PoemsModal({ isOpen, onClose, poem }: PoemsModalProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 opacity-0 pointer-events-none"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="backdrop-blur relative w-66 h-64 border-4 border-blue-600 shadow-2xl flex flex-col items-center justify-center gap-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:bg-blue-600 rounded transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Poem Text */}
        <div className="text-white text-center leading-relaxed overflow-auto max-h-64">
          <pre
            className="font-mono text-sm whitespace-pre-wrap"
            style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
          >
            {poem}
          </pre>
        </div>
      </div>
    </div>
  );
}
