export type Region = {
  name: string;
  desc: string;
  coordinates: string;
  stats: {
    flowerDensity: number;
    beeActivity: number;
    bloomIntensity: number;
    pollenProduction: number;
    nectarQuality: number;
    hiveHealth: number;
  };
  trends: {
    flowers: string;
    bees: string;
    risk: string;
  };
  dominantSpecies: {
    flowers: string[];
    bees: string[];
  };
  alerts: string[];
};

export const regions: Region[] = [
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

export const overallStats = {
  totalFlowers: '2.8M',
  activeBees: '1.2M',
  bloomCoverage: '68%',
  pollinationRate: '82%',
  alertLevel: 'Moderado',
};
