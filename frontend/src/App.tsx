import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/sidebar';
import { SliderComponent } from './components/slider';
import { ZoomControls } from './components/zoom-control';

export function ObeeApp() {
  const [zoom, setZoom] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 0.001;
    const newZoom = Math.min(Math.max(zoom - e.deltaY * zoomFactor, 0.3), 4);

    setZoom(newZoom);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-black text-neutral-100"
    >
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 transition-transform duration-50 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        >
          <img
            src="/satellite-view.png"
            alt="Satellite View"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
          }}
        />
      </div>

      <Sidebar />

      <SliderComponent />

      <ZoomControls
        onZoomIn={() => setZoom((z) => Math.min(z + 0.2, 4))}
        onZoomOut={() => setZoom((z) => Math.max(z - 0.2, 0.3))}
        onReset={() => {
          setZoom(1);
          setPosition({ x: 0, y: 0 });
        }}
      />
    </div>
  );
}
