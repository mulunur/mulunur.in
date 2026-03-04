import { useState, useEffect, useRef } from 'react';

interface BouncingYuzuProps {
  onYuzuClick: () => void;
}

export default function BouncingYuzu({ onYuzuClick }: BouncingYuzuProps) {
  const [position, setPosition] = useState({ x: 40, y: 0 });
  const velocityRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYuzuClick = (e: React.MouseEvent) => {
    console.log("Yuzu clicked!");
    e.stopPropagation();
    onYuzuClick();
  };

  useEffect(() => {
    const animate = () => {
      setPosition((prevPos) => {
        if (!containerRef.current) return prevPos;

        const container = containerRef.current;
        const imageSize = 90; // 100px image
        const maxX = container.clientWidth - imageSize;
        const maxY = container.clientHeight - imageSize;

        let newX = prevPos.x + velocityRef.current.x;
        let newY = prevPos.y + velocityRef.current.y;

        // Bounce off walls
        if (newX <= 0 || newX >= maxX) {
          velocityRef.current.x *= -1;
          newX = Math.max(0, Math.min(newX, maxX));
        }

        if (newY <= 0 || newY >= maxY) {
          velocityRef.current.y *= -1;
          newY = Math.max(0, Math.min(newY, maxY));
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      <div
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'none',
        }}
        className="drop-shadow-2xl"
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
