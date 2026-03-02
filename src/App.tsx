import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BouncingYuzu from './components/BouncingYuzu';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Music from './pages/Music';
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
      <BouncingYuzu />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
      <Router>
        <ColorProvider>
          <AppContent />
        </ColorProvider>
      </Router>
  );
}

export default App;
