import { useEffect, useRef } from 'react';

interface BouncingYuzuProps {
  onYuzuClick: () => void;
}

export default function BouncingYuzu({ onYuzuClick }: BouncingYuzuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const yuzuRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 40, y: 0 });
  const velocityRef = useRef({ x: 0.75, y: 0.75 });
  const boundsRef = useRef({ maxX: 0, maxY: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const handleYuzuClick = (e: React.MouseEvent) => {
    console.log("Yuzu clicked!");
    e.stopPropagation();
    onYuzuClick();
  };

  useEffect(() => {
    const IMAGE_SIZE_PX = 80; // matches `w-20 h-20` (5rem = 80px)

    const updateBounds = () => {
      const container = containerRef.current;
      if (!container) return;

      boundsRef.current.maxX = Math.max(0, container.clientWidth - IMAGE_SIZE_PX);
      boundsRef.current.maxY = Math.max(0, container.clientHeight - IMAGE_SIZE_PX);
    };

    updateBounds();

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateBounds());
      resizeObserver.observe(containerRef.current);
    }

    const animate = () => {
      const container = containerRef.current;
      const yuzuEl = yuzuRef.current;
      if (!container || !yuzuEl) return;

      const { maxX, maxY } = boundsRef.current;
      const nextX = posRef.current.x + velocityRef.current.x;
      const nextY = posRef.current.y + velocityRef.current.y;

      let newX = nextX;
      let newY = nextY;

      // Bounce off walls (clamp inside bounds)
      if (newX <= 0 || newX >= maxX) {
        velocityRef.current.x *= -1;
        newX = Math.max(0, Math.min(newX, maxX));
      }

      if (newY <= 0 || newY >= maxY) {
        velocityRef.current.y *= -1;
        newY = Math.max(0, Math.min(newY, maxY));
      }

      posRef.current.x = newX;
      posRef.current.y = newY;

      // Imperatively update transform (avoid React re-render per frame)
      yuzuEl.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      <div
        ref={yuzuRef}
        className="drop-shadow-2xl will-change-transform"
        style={{ position: 'absolute', left: 0, top: 0, transform: 'translate3d(40px, 0px, 0)' }}
      >
        <img
          src="/images/yuzu.png"
          alt="yuzu"
          className="w-20 h-20 object-contain select-none cursor-pointer pointer-events-auto hover:brightness-110 transition-all"
          style={{
            filter: 'drop-shadow(0 5px 25px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))',
          }}
          onClick={handleYuzuClick}
        />
      </div>
    </div>
  );
}
