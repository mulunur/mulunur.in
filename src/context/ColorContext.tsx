import { createContext, useContext, useState, type ReactNode } from 'react';

const colors = [
  '#f69cf7', // Pink
  '#199b92', // Teal
  '#00a1c5', // Blue
  '#bf3803', // Salmon
  '#33dbb1', // Mint
  '#e1ff37', // Yellow
  '#cf5eff', // Purple
  '#fe5454', // Light Red
  '#37b9ff', // Sky Blue
  '#ff974e', // Peach
];

interface ColorContextType {
  currentColor: string;
  changeColor: () => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
  };

  return (
    <ColorContext.Provider value={{ currentColor, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within ColorProvider');
  }
  return context;
}
