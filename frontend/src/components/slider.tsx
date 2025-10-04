import { useState } from 'react';
import { Slider } from './ui/slider';

interface TimelineData {
  date: string;
  value: number;
  type: 'real' | 'forecast';
  confidence?: number;
}

export function SliderComponent() {
  const [timeline, setTimeline] = useState(50);
  const totalSteps = 100;
  const realDataThreshold = 50;

  const sampleData: TimelineData[] = [
    { date: '2024-01-01', value: 100, type: 'real' },
    { date: '2024-01-15', value: 120, type: 'real' },
    { date: '2024-02-01', value: 90, type: 'real' },
    { date: '2024-02-15', value: 110, type: 'real' },
    { date: '2024-03-01', value: 130, type: 'real' },
    { date: '2024-03-15', value: 125, type: 'forecast', confidence: 0.9 },
    { date: '2024-04-01', value: 140, type: 'forecast', confidence: 0.8 },
    { date: '2024-04-15', value: 135, type: 'forecast', confidence: 0.7 },
    { date: '2024-05-01', value: 150, type: 'forecast', confidence: 0.6 },
  ];

  const currentIndex = Math.floor(
    (timeline / totalSteps) * (sampleData.length - 1)
  );
  const currentData = sampleData[currentIndex];

  const colors = {
    real: {
      track: 'bg-blue-500',
      thumb: 'bg-blue-600',
      text: 'text-blue-400',
      border: 'border-blue-400',
    },
    forecast: {
      track: 'bg-orange-500',
      thumb: 'bg-orange-600',
      text: 'text-orange-400',
      border: 'border-orange-400',
    },
    mixed: {
      track: 'bg-gradient-to-r from-blue-500 to-orange-500',
    },
  };

  const getTrackColor = (value: number) => {
    if (value <= realDataThreshold) {
      return colors.real.track;
    } else {
      return colors.forecast.track;
    }
  };

  const getStepMarks = () => {
    const marks = [];
    const stepSize = totalSteps / (sampleData.length - 1);

    for (let i = 0; i < sampleData.length; i++) {
      const position = i * stepSize;
      const isReal = sampleData[i].type === 'real';

      marks.push({
        position,
        type: sampleData[i].type,
        label: sampleData[i].date,
        isReal,
      });
    }

    return marks;
  };

  const stepMarks = getStepMarks();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[700px] backdrop-blur-2xl bg-black/20 border border-black/20 rounded-2xl px-6 py-4 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center mb-4">
        <div
          className={`px-3 py-1 rounded-full border ${
            currentData.type === 'real'
              ? colors.real.border + ' ' + colors.real.text
              : colors.forecast.border + ' ' + colors.forecast.text
          } bg-white/5 text-sm font-medium`}
        >
          {currentData.type === 'real' ? '📊 Dados Reais' : '🔮 Previsão'}
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-white">
            {currentData.value.toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-neutral-400">
            {new Date(currentData.date).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      {currentData.type === 'forecast' && currentData.confidence && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Confiança da Previsão</span>
            <span>{Math.round(currentData.confidence * 100)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1.5">
            <div
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${currentData.confidence * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between text-xs text-neutral-400 mb-2">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Dados Reais
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          Previsão
        </span>
      </div>

      <div className="relative">
        <Slider
          value={[timeline]}
          onValueChange={(v) => setTimeline(v[0])}
          max={totalSteps}
          step={1}
          className="cursor-pointer relative z-10"
        />

        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full bg-gray-600 overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${getTrackColor(
              timeline
            )}`}
            style={{ width: `${timeline}%` }}
          />
        </div>

        <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 pointer-events-none">
          {stepMarks.map((mark, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm cursor-pointer"
              style={{
                left: `${mark.position}%`,
                backgroundColor: mark.isReal ? '#3b82f6' : '#f97316',
              }}
              title={`${mark.label} (${mark.isReal ? 'Real' : 'Previsão'})`}
            />
          ))}
        </div>
      </div>

      <div className="text-center text-sm mt-3 text-neutral-300">
        {timeline < realDataThreshold
          ? `${Math.round((realDataThreshold - timeline) / 5)} dias atrás`
          : `${Math.round((timeline - realDataThreshold) / 5)} dias à frente`}
      </div>

      <div className="flex justify-between text-xs text-white mt-2">
        {sampleData
          .filter((_, index) => index % 2 === 0)
          .map((data, index) => (
            <div key={index} className="text-center">
              {new Date(data.date).toLocaleDateString('pt-BR', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
