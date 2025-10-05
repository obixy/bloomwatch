import { useEffect, useRef, useState } from 'react';
import { mapTimeline } from './components/mock';
import { Sidebar } from './components/sidebar';
import { SliderComponent } from './components/slider';
import { ZoomControls } from './components/zoom-control';

export function ObeeApp() {
  const [zoom, setZoom] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMapImage, setCurrentMapImage] = useState<string>(
    mapTimeline['satellite-view']
  );

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
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    // Supondo que a imagem cobre 100% do container (w-full h-full)
    // O tamanho "visível" é containerWidth/zoom e containerHeight/zoom
    const imgWidth = containerWidth * zoom;
    const imgHeight = containerHeight * zoom;

    // Limites máximos para arrastar
    const maxX = Math.max(0, (imgWidth - containerWidth) / 2);
    const maxY = Math.max(0, (imgHeight - containerHeight) / 2);

    setPosition((prev) => {
      let newX = prev.x + e.movementX;
      let newY = prev.y + e.movementY;

      // Limita para não sair da área da imagem
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      return { x: newX, y: newY };
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 0.001;
    const newZoom = Math.min(Math.max(zoom - e.deltaY * zoomFactor, 0.3), 4);

    setZoom(newZoom);
  };

  // Função para atualizar imagem do mapa conforme slider
  const handleSliderChange = (key: string) => {
    if (mapTimeline[key]) {
      setCurrentMapImage(mapTimeline[key]);
    }
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
            src={currentMapImage}
            alt="Satellite View"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
          {/* Grid fixa, não se move com a imagem */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
              backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
              zIndex: 2,
            }}
          />
        </div>
      </div>

      <Sidebar />

      <SliderComponent onChangeMapImage={handleSliderChange} />

      <ZoomControls
        onZoomIn={() => setZoom((z) => Math.min(z + 0.2, 4))}
        onZoomOut={() => setZoom((z) => Math.max(z - 0.2, 0.3))}
        onReset={() => {
          setZoom(1);
          setPosition({ x: 0, y: 0 });
        }}
      />

      {currentMapImage && currentMapImage.includes('prevision') && (
        <div
          className="fixed bottom-6 right-6 bg-neutral-900 bg-opacity-80 rounded-lg shadow-lg p-4 text-sm z-50 border border-neutral-700"
          style={{ minWidth: '220px', maxWidth: '320px' }}
        >
          <h3 className="font-medium text-base mb-2 text-green-300">
            Forecast
          </h3>

          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#fee723] inline-block border border-yellow-700" />{' '}
              Blooming hotspot
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
