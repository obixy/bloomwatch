import { useEffect, useRef, useState } from 'react';
import { RegionProvider } from './app/RegionContext';
import { useRegion } from './app/useRegion';
import { Sidebar } from './components/sidebar';
import { SliderComponent } from './components/slider';
import { ZoomControls } from './components/zoom-control';

function RegionInfoPanel() {
  const { selectedRegion } = useRegion();
  return (
    <div className="absolute right-4 top-4 w-80 bg-black/40 rounded-2xl p-4 text-neutral-100 shadow-lg border border-white/10 backdrop-blur-xl">
      <h2 className="text-xl font-bold mb-2">{selectedRegion.name}</h2>
      <p className="text-sm text-neutral-300 mb-2">{selectedRegion.desc}</p>
      <div className="mb-2 text-xs text-neutral-400">
        Coordenadas: {selectedRegion.coordinates}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-green-400">
          Densidade de Flores:
        </span>{' '}
        {selectedRegion.stats.flowerDensity}%<br />
        <span className="font-semibold text-yellow-400">
          Atividade de Abelhas:
        </span>{' '}
        {selectedRegion.stats.beeActivity}%<br />
        <span className="font-semibold text-pink-400">
          Intensidade de Floração:
        </span>{' '}
        {selectedRegion.stats.bloomIntensity}%<br />
        <span className="font-semibold text-orange-400">
          Produção de Pólen:
        </span>{' '}
        {selectedRegion.stats.pollenProduction}%
      </div>
      <div className="mb-2">
        <span className="font-semibold">Espécies Dominantes:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {selectedRegion.dominantSpecies.flowers.map((f, i) => (
            <span
              key={i}
              className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs"
            >
              {f}
            </span>
          ))}
          {selectedRegion.dominantSpecies.bees.map((b, i) => (
            <span
              key={i}
              className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Alertas:</span>
        <ul className="list-disc ml-5 text-amber-300">
          {selectedRegion.alerts.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Tendências:</span>
        <br />
        <span className="text-green-400">Flores:</span>{' '}
        {selectedRegion.trends.flowers}
        <br />
        <span className="text-yellow-400">Abelhas:</span>{' '}
        {selectedRegion.trends.bees}
        <br />
        <span className="text-amber-400">Risco:</span>{' '}
        {selectedRegion.trends.risk}
      </div>
    </div>
  );
}

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
    <RegionProvider>
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

        <RegionInfoPanel />

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
    </RegionProvider>
  );
}
