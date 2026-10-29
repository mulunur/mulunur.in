import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BouncingYuzu from './components/BouncingYuzu';
import FilmGrainBackground from './components/FilmGrainBackground';
import FilmGrainOverlay from './components/FilmGrainOverlay';
import PoemsModal, { getRandomPoem } from './components/PoemsModal';
import Home from './pages/Home';
import About from './pages/About';
import Paintings from './pages/Paintings';
import Music from './pages/Music';
import CV from './pages/CV';
import { ColorProvider, useColor } from './context/ColorContext';
import './i18n/i18n';
import './index.css';

function AppContent() {
  const { currentColor, changeColor } = useColor();

  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', currentColor);
  }, [currentColor]);

  return (
    <div
      className="relative min-h-screen flex flex-col cursor-pointer"
      onClick={changeColor}
    >
      <FilmGrainBackground />
      <FilmGrainOverlay />

      {/* Content above background/noise */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Navigate to="/about" replace />} />
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/music" element={<Music />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Navigate to="/cv" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPoem, setCurrentPoem] = useState('');

  const handleYuzuClick = () => {
    setCurrentPoem(getRandomPoem());
    setIsModalOpen(true);
  };

  return (
    <div>
      <Router>
        <ColorProvider>
          <PoemsModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            poem={currentPoem}
          />
          <AppContent />
        </ColorProvider>
      </Router>
      <BouncingYuzu onYuzuClick={handleYuzuClick} />
    </div>
  );
}

export default App;
