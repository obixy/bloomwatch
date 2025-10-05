import React, { useState } from 'react';
import { Slider } from './ui/slider';

interface TimelineData {
  date: string;
  value: number;
  type: 'real' | 'forecast';
  confidence?: number;
}

import { mapTimeline } from './mock';

interface SliderComponentProps {
  onChangeMapImage?: (key: string) => void;
}

export function SliderComponent({ onChangeMapImage }: SliderComponentProps) {
  const [timeline, setTimeline] = useState(50);
  const totalSteps = 100;

  const timelineKeys = Object.keys(mapTimeline)
    .filter((k) => k !== 'prevision' && k !== 'satellite-view')
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const extraKeys = ['prevision', 'satellite-view'].filter(
    (k) => mapTimeline[k]
  );
  const orderedKeys = [...timelineKeys, ...extraKeys];

  const sampleData: TimelineData[] = orderedKeys.map((key) => ({
    date: key,
    value: 0,
    type:
      key === 'prevision'
        ? 'forecast'
        : key === 'satellite-view'
        ? 'real'
        : 'real',
  }));

  const currentIndex = Math.floor(
    (timeline / totalSteps) * (sampleData.length - 1)
  );
  const currentData = sampleData[currentIndex];

  React.useEffect(() => {
    if (onChangeMapImage) {
      onChangeMapImage(currentData.date);
    }
  }, [currentIndex, currentData.date, onChangeMapImage]);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[600px] bg-black/60 border border-black/30 rounded-xl px-4 py-3 shadow-lg flex flex-col gap-2 items-center">
      <div className="flex flex-col items-center gap-1 mb-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            currentData.type === 'real'
              ? 'bg-blue-900 text-blue-300'
              : 'bg-orange-900 text-orange-300'
          }`}
        >
          {currentData.type === 'real' ? 'Dados Reais' : 'Previsão'}
        </span>
        <span className="text-lg font-semibold text-white tracking-tight">
          {currentData.type === 'real'
            ? new Date(currentData.date).toLocaleDateString('pt-BR')
            : `Previsão de 4 anos`}
        </span>
      </div>

      <Slider
        value={[timeline]}
        onValueChange={(v) => setTimeline(v[0])}
        max={totalSteps}
        step={1}
        className="w-full"
      />

      <div className="flex justify-between w-full mt-2 gap-2">
        {sampleData.map((data, idx) => (
          <span
            key={data.date}
            className={`text-[10px] text-neutral-400 ${
              idx === currentIndex ? 'font-bold text-white' : ''
            }`}
            style={{ minWidth: 32, textAlign: 'center' }}
          >
            {data.type === 'real'
              ? new Date(data.date).toLocaleDateString('pt-BR', {
                  month: 'short',
                  day: 'numeric',
                })
              : 'Previsão'}
          </span>
        ))}
      </div>
    </div>
  );
}
