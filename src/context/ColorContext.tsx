import { createContext, useContext, useState, type ReactNode } from 'react';

// Curated for contrast against the pale, muted-green background photo —
// dark, saturated "protest poster" tones instead of pastels/neons, which
// sat too close in lightness to the backdrop to read.
const colors = [
  '#111111', // Black
  '#012abc', // Cobalt Blue
  '#e20071', // Hot Magenta
  '#0a6459', // Deep Petrol
  '#b10009', // Blood Red
  '#630cb9', // Deep Violet
  '#d44107', // Sunset Orange
  '#e1ff37', // Yellow
  '#12593c', // Forest Green
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
