import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BouncingYuzu from './components/BouncingYuzu';
import PoemsModal, { getRandomPoem } from './components/PoemsModal';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Paintings from './pages/Paintings';
import Music from './pages/Music';
import CV from './pages/CV';
import Contact from './pages/Contact';
import { ColorProvider, useColor } from './context/ColorContext';
import './i18n/i18n';
import './index.css';

// Film grain overlay tuning.
// - Smaller tile size => chunkier, larger grain.
// - Luminance strength controls brightness speckle.
// - Chroma strength controls subtle color specks (cyan/magenta-ish).
const FILM_GRAIN_TILE_SIZE = 900;
const FILM_GRAIN_GRID_SIZE = 1800;
const FILM_GRAIN_ALPHA = 0.98;
const LUMINANCE_STRENGTH = 0.35; // 0..1-ish
const CHROMA_STRENGTH = 0.90; // 0..1-ish
const FILM_GRAIN_VARIANTS = 5;
const FILM_GRAIN_FPS = 6; // swap precomputed textures at this rate

function FilmGrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let cancelled = false;
    let resizeRaf = 0;

    // Keep work bounded: generate + tile using CSS pixel units.
    // This avoids dpr^2 blowups when precomputing grain textures.
    const dpr = 1;

    const tileRatio = FILM_GRAIN_GRID_SIZE / FILM_GRAIN_TILE_SIZE;
    const tileSizePx = Math.max(32, Math.round(FILM_GRAIN_TILE_SIZE * dpr)); // device pixels
    const gridSizePx = Math.max(8, Math.round(tileRatio * tileSizePx));

    // Visible canvas is the whole screen; we tile precomputed grain images across it.
    const resizeCanvas = () => {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };

    resizeCanvas();

    // Approximate normal distribution (mean 0, std ~1)
    const randn = () => {
      let sum = 0;
      for (let i = 0; i < 6; i++) sum += Math.random();
      return (sum / 6 - 0.5) * 2;
    };

    const wrap = (n: number, m: number) => {
      const r = n % m;
      return r < 0 ? r + m : r;
    };

    const makeGrid = () => {
      const g = new Float32Array(gridSizePx * gridSizePx);
      for (let i = 0; i < g.length; i++) g[i] = randn();
      return g;
    };

    const sampleGrid = (grid: Float32Array, x: number, y: number) => {
      const gx = (x / tileSizePx) * gridSizePx;
      const gy = (y / tileSizePx) * gridSizePx;

      const x0 = Math.floor(gx);
      const y0 = Math.floor(gy);
      const tx = gx - x0;
      const ty = gy - y0;

      const x1 = x0 + 1;
      const y1 = y0 + 1;

      const ix0 = wrap(x0, gridSizePx);
      const iy0 = wrap(y0, gridSizePx);
      const ix1 = wrap(x1, gridSizePx);
      const iy1 = wrap(y1, gridSizePx);

      const a = grid[iy0 * gridSizePx + ix0];
      const b = grid[iy0 * gridSizePx + ix1];
      const c = grid[iy1 * gridSizePx + ix0];
      const d = grid[iy1 * gridSizePx + ix1];

      const ab = a + tx * (b - a);
      const cd = c + tx * (d - c);
      return ab + ty * (cd - ab);
    };

    const render = (pattern: CanvasPattern | null) => {
      if (!pattern) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const run = async () => {
      // Precompute a small set of grain textures (expensive once), then just swap them.
      const bitmaps: ImageBitmap[] = [];
      for (let i = 0; i < FILM_GRAIN_VARIANTS; i++) {
        if (cancelled) return;

        const tileCanvas = document.createElement('canvas');
        tileCanvas.width = tileSizePx;
        tileCanvas.height = tileSizePx;
        const tileCtx = tileCanvas.getContext('2d');
        if (!tileCtx) continue;

        const imageData = tileCtx.createImageData(tileSizePx, tileSizePx);
        const data = imageData.data;

        const lumGrid = makeGrid();
        const crGrid = makeGrid();
        const cbGrid = makeGrid();

        const alpha = Math.round(255 * FILM_GRAIN_ALPHA);

        for (let y = 0; y < tileSizePx; y++) {
          for (let x = 0; x < tileSizePx; x++) {
            const lum = sampleGrid(lumGrid, x, y);
            const cr = sampleGrid(crGrid, x + 7.3, y - 2.1);
            const cb = sampleGrid(cbGrid, x - 4.9, y + 8.2);

            const base = 128;
            const gray = Math.max(0, Math.min(255, base + lum * LUMINANCE_STRENGTH * 80));

            const r = Math.max(0, Math.min(255, gray + cr * CHROMA_STRENGTH * 55));
            const b = Math.max(0, Math.min(255, gray + cb * CHROMA_STRENGTH * 55));
            const g = Math.max(0, Math.min(255, gray - (cr + cb) * CHROMA_STRENGTH * 28));

            const idx = (y * tileSizePx + x) * 4;
            data[idx] = Math.round(r);
            data[idx + 1] = Math.round(g);
            data[idx + 2] = Math.round(b);
            data[idx + 3] = alpha;
          }
        }

        tileCtx.putImageData(imageData, 0, 0);

        // Convert canvas pixels to a bitmap once; after that we only tile/render.
        const bmp = await createImageBitmap(tileCanvas);
        bitmaps.push(bmp);

        // Yield so this doesn't freeze the UI while precomputing.
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      }

      if (cancelled || bitmaps.length === 0) return;

      const patterns = bitmaps.map((bmp) => ctx.createPattern(bmp, 'repeat'));
      let idx = 0;

      // Render immediately
      render(patterns[idx] ?? null);

      if (reduceMotion.matches) return;

      const intervalMs = 1000 / FILM_GRAIN_FPS;
      const interval = window.setInterval(() => {
        if (cancelled) return;
        idx = (idx + 1) % patterns.length;
        render(patterns[idx] ?? null);
      }, intervalMs);

      const onResize = () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = window.requestAnimationFrame(() => {
          if (cancelled) return;
          resizeCanvas();
          render(patterns[idx] ?? null);
        });
      };

      window.addEventListener('resize', onResize);

      // Cleanup
      return () => {
        window.clearInterval(interval);
        window.removeEventListener('resize', onResize);
      };
    };

    const cleanupFromRun = { fn: null as null | (() => void) };
    run().then((cleanup) => {
      if (typeof cleanup === 'function') cleanupFromRun.fn = cleanup;
    });

    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => {
        if (cancelled) return;
        resizeCanvas();
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', onResize);
      cleanupFromRun.fn?.();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 film-grain-overlay"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function AppContent() {
  const { currentColor, changeColor } = useColor();

  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', currentColor);
  }, [currentColor]);

  return (
    <div
      className="relative bg-dark-900 text-dark-100 min-h-screen flex flex-col cursor-pointer"
      onClick={changeColor}
    >
      {/* Website background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/site-bg.png')" }}
        aria-hidden="true"
      />
      {/* Readability gradient over the photo */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark-900/70 via-dark-900/55 to-dark-900/85" aria-hidden="true" /> */}
      <FilmGrainOverlay />

      {/* Content above background/noise */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/music" element={<Music />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
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
