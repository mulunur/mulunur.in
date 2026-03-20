import { useTranslation } from 'react-i18next';

interface Painting {
  id: number;
  path: string;
  name: string;
}

export default function Paintings() {
  const { t } = useTranslation();
  const paintingsData = t('paintings', { returnObjects: true }) as any;

  // Статически определённые картины
  const paintings: Painting[] = [
    {
      id: 0,
      path: '/paintings/IMG_3148.jpeg',
      name: 'Для отца (2023)'
    },
        {
      id: 4,
      path: '/paintings/IMG_6935.jpeg',
      name: 'Херувимы (2023)'
    },
    {
      id: 3,
      path: '/paintings/IMG_6818.jpeg',
      name: paintingsData.paintings?.[2]?.name || 'Меланхолия (2023)'
    },
    {
      id: 3,
      path: '/paintings/IMG_0033.jpeg',
      name: 'Самуи (2024)'
    },

  ];

  return (
    <main className="pt-20 pb-20">
      <section className="flex justify-center items-center py-12">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {paintingsData.title}
            </h1>
            {/* <p className="text-dark-300 text-lg">
              {paintingsData.subtitle}
            </p> */}
          </div>

          {/* Paintings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paintings.map((painting) => (
              <div
                key={painting.id}
                className="flex flex-col items-center"
              >
                {/* Painting Image with Shadow */}
                <div className="w-full mb-4 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <img
                    src={painting.path}
                    alt={painting.name}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Painting Name */}
                <h3 className="text-xl text-center text-dark-100">
                  {painting.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
