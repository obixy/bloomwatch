import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Flower,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Sidebar() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);

  const regions = [
    {
      name: 'Brasil',
      desc: 'Monitoramento de floração e apicultura',
      coordinates: '15°S, 47°W',
      stats: {
        flowerDensity: 85,
        beeActivity: 78,
        bloomIntensity: 92,
        pollenProduction: 88,
        nectarQuality: 82,
        hiveHealth: 76,
      },
      trends: {
        flowers: '+12% este mês',
        bees: '+8% esta semana',
        risk: 'Baixo risco',
      },
      dominantSpecies: {
        flowers: ['Ipê-amarelo', 'Aroeira', 'Assa-peixe'],
        bees: ['Apis mellifera', 'Tetragonisca angustula'],
      },
      alerts: ['Floração máxima em 5 dias', 'Temperatura ideal'],
    },

    {
      name: 'Califórnia',
      desc: 'Safras agrícolas e polinização',
      coordinates: '36°N, 119°W',
      stats: {
        flowerDensity: 75,
        beeActivity: 70,
        bloomIntensity: 80,
        pollenProduction: 72,
        nectarQuality: 68,
        hiveHealth: 65,
      },
      trends: {
        flowers: '+5% este mês',
        bees: '+3% esta semana',
        risk: 'Alerta de seca',
      },
      dominantSpecies: {
        flowers: ['Amêndoa', 'Laranjeira', 'Abacateiro'],
        bees: ['Apis mellifera', 'Osmia lignaria'],
      },
      alerts: ['Umidade do solo baixa', 'Polinização em andamento'],
    },
  ];

  const overallStats = {
    totalFlowers: '2.8M',
    activeBees: '1.2M',
    bloomCoverage: '68%',
    pollinationRate: '82%',
    alertLevel: 'Moderado',
  };

  const StatBar = ({
    value,
    label,
    color = 'bg-blue-500',
  }: {
    value: number;
    label: string;
    color?: string;
  }) => (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-neutral-300">{label}</span>
        <span className="text-neutral-400">{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <aside
      className="
      absolute left-4 top-4 bottom-4 w-80 rounded-3xl flex flex-col overflow-hidden
      shadow-[0_0_40px_rgba(0,0,0,0.5)]
      backdrop-blur-2xl border border-black/20
      bg-black/20 dark:bg-black/30
    "
    >
      <div className="p-5 border-b border-white/10 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Obee
            </h1>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              NASA Space Apps · 2025
            </p>
          </div>
          <Button
            onClick={() => setShowStatistics(!showStatistics)}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90"
            size="sm"
          >
            {showStatistics ? 'Ver Regiões' : 'Estatísticas'}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-4 overflow-auto">
        {showStatistics ? (
          <div className="space-y-4">
            <Card className="bg-white/10 dark:bg-neutral-900/50 backdrop-blur-md border-white/10 dark:border-neutral-800">
              <CardHeader>
                <CardTitle className="text-lg text-neutral-100 dark:text-neutral-200 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Visão Geral do Ecossistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <Flower className="w-6 h-6 mx-auto mb-2 text-green-400" />
                    <div className="text-2xl font-bold text-neutral-100">
                      {overallStats.totalFlowers}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Flores Ativas
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    🐝
                    <div className="text-2xl font-bold text-neutral-100">
                      {overallStats.activeBees}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Abelhas Ativas
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 mx-auto mb-2 text-blue-400">🌸</div>
                    <div className="text-2xl font-bold text-neutral-100">
                      {overallStats.bloomCoverage}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Cobertura de Floração
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 mx-auto mb-2 text-purple-400">
                      ⚡
                    </div>
                    <div className="text-2xl font-bold text-neutral-100">
                      {overallStats.pollinationRate}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Taxa de Polinização
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      Nível de Alerta: {overallStats.alertLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 dark:bg-neutral-900/50 backdrop-blur-md border-white/10 dark:border-neutral-800">
              <CardHeader>
                <CardTitle className="text-lg text-neutral-100 dark:text-neutral-200">
                  Métricas por Região
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regions.map((region) => (
                  <div key={region.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-neutral-200">
                        {region.name}
                      </h4>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {region.coordinates}
                      </span>
                    </div>

                    <StatBar
                      value={region.stats.flowerDensity}
                      label="Densidade de Flores"
                      color="bg-green-500"
                    />
                    <StatBar
                      value={region.stats.beeActivity}
                      label="Atividade de Abelhas"
                      color="bg-yellow-500"
                    />
                    <StatBar
                      value={region.stats.bloomIntensity}
                      label="Intensidade de Floração"
                      color="bg-pink-500"
                    />
                    <StatBar
                      value={region.stats.pollenProduction}
                      label="Produção de Pólen"
                      color="bg-orange-500"
                    />

                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Tendência Flores: {region.trends.flowers}</span>
                      <span>Abelhas: {region.trends.bees}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-3">
            {regions.map((region) => (
              <Card
                key={region.name}
                className="
                  bg-white/10 dark:bg-neutral-900/50
                  backdrop-blur-md border-white/10 dark:border-neutral-800
                  hover:bg-white/20 dark:hover:bg-neutral-800/70
                  transition-all cursor-pointer
                "
                onClick={() =>
                  setExpandedRegion(
                    expandedRegion === region.name ? null : region.name
                  )
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-neutral-100 dark:text-neutral-200">
                      {region.name}
                    </CardTitle>
                    {expandedRegion === region.name ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-400 dark:text-neutral-500">
                    {region.desc}
                  </p>
                </CardHeader>

                {expandedRegion === region.name && (
                  <CardContent className="pt-0 border-t border-white/10 dark:border-neutral-800">
                    {/* Estatísticas Rápidas */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-white/5 rounded">
                        <div className="text-green-400 text-sm">🌺</div>
                        <div className="text-xs text-neutral-300">
                          {region.stats.flowerDensity}%
                        </div>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded">
                        <div className="text-yellow-400 text-sm">🐝</div>
                        <div className="text-xs text-neutral-300">
                          {region.stats.beeActivity}%
                        </div>
                      </div>
                    </div>

                    {/* Espécies Dominantes */}
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-neutral-300 mb-1">
                        Espécies Dominantes
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {region.dominantSpecies.flowers.map((flower, index) => (
                          <span
                            key={index}
                            className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded"
                          >
                            {flower}
                          </span>
                        ))}
                        {region.dominantSpecies.bees.map((bee, index) => (
                          <span
                            key={index}
                            className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded"
                          >
                            {bee}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Alertas */}
                    <div className="space-y-1">
                      {region.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs text-amber-300"
                        >
                          <Clock className="w-3 h-3" />
                          {alert}
                        </div>
                      ))}
                    </div>

                    {/* Tendências */}
                    <div className="mt-3 p-2 bg-white/5 rounded text-xs">
                      <div className="flex justify-between text-neutral-300">
                        <span>
                          Tendência Flores:{' '}
                          <span className="text-green-400">
                            {region.trends.flowers}
                          </span>
                        </span>
                        <span>
                          Abelhas:{' '}
                          <span className="text-yellow-400">
                            {region.trends.bees}
                          </span>
                        </span>
                      </div>
                      <div className="mt-1 text-amber-400">
                        {region.trends.risk}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-white/10 dark:border-neutral-800">
        <div className="flex gap-2">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90">
            Compartilhar
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => setShowStatistics(!showStatistics)}
          >
            {showStatistics ? '🌍' : '📊'}
          </Button>
        </div>
      </div>
    </aside>
  );
}
