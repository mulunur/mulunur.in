import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BouncingYuzu from './components/BouncingYuzu';
import PoemsModal, { getRandomPoem } from './components/PoemsModal';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Music from './pages/Music';
import CV from './pages/CV';
import Contact from './pages/Contact';
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
      className="bg-dark-900 text-dark-100 min-h-screen flex flex-col cursor-pointer"
      onClick={changeColor}
    >
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/music" element={<Music />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPoem, setCurrentPoem] = useState('');

  const handleYuzuClick = () => {
    console.log('Yuzu clicked!');
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
