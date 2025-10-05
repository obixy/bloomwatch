import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { InfoButton } from './InfoButton';
import { InfoModal } from './InfoModal';
import { Button } from './ui/button';

export function Sidebar() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [tabValue, setTabValue] = useState('regions');
  const [selectedRegion, setSelectedRegion] = useState('California');
  const regions = [
    {
      name: 'Brazil',
      desc: 'Agricultural crops and pollination',
    },
    {
      name: 'California',
      desc: 'Monitoring of flowering and beekeeping',
    },
  ];
  const events = [
    {
      title: 'Flowering Alert',
      desc: 'Intense flowering forecast for the coming weeks.',
    },
    {
      title: 'Frost Risk',
      desc: 'Low temperatures may affect hives.',
    },
    {
      title: 'High Bee Activity',
      desc: 'Monitoring indicates a peak in pollination.',
    },
  ];

  return (
    <>
      <aside className="fixed left-6 top-6 bottom-6 w-72 rounded-2xl flex flex-col shadow-lg border border-neutral-800 bg-black/80 backdrop-blur-xl">
        <div className="px-2 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-cyan-200 tracking-tight">
              BloonWatch
            </h1>
            <p className="text-xs text-neutral-500">NASA Space Apps · 2025</p>
          </div>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 rounded-lg border border-neutral-700 text-black"
            onClick={() =>
              alert('Feature to connect other databases coming soon!')
            }
          >
            Connect Base
          </Button>
        </div>

        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="flex-1 flex flex-col"
        >
          <TabsList className="flex border-neutral-800 bg-transparent px-2 mt-4">
            <TabsTrigger
              value="regions"
              className="flex-1 py-2 text-center font-medium text-cyan-200"
            >
              Regions
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex-1 py-2 text-center font-medium text-cyan-200"
            >
              Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regions" className="flex-1">
            <ScrollArea className="px-2 py-3">
              <div className="space-y-2">
                {regions.map((region) => {
                  const isSelected = selectedRegion === region.name;
                  return (
                    <button
                      key={region.name}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-colors focus:outline-none
                        ${
                          isSelected
                            ? 'bg-cyan-900 border-cyan-700'
                            : 'bg-transparent border-neutral-700 hover:bg-cyan-800'
                        }`}
                      onClick={() => {
                        if (region.name === 'Brazil') setShowRegionModal(true);
                        setSelectedRegion(region.name);
                      }}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-base font-semibold ${
                            isSelected ? 'text-cyan-200' : 'text-neutral-200'
                          }`}
                        >
                          {region.name}
                        </span>
                        <span
                          className={`text-xs ${
                            isSelected ? 'text-cyan-300' : 'text-neutral-400'
                          }`}
                        >
                          {region.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}

                <InfoButton
                  className="w-full text-left px-3 py-2 rounded-lg border bg-cyan-900 border-cyan-700"
                  onClick={() => setShowRegionModal(true)}
                />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="events" className="flex-1">
            <ScrollArea className="px-2 py-3 overflow-auto">
              <div className="space-y-2">
                {events.map((event, idx) => (
                  <div
                    key={idx}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900"
                  >
                    <span className="text-base font-semibold text-cyan-200">
                      {event.title}
                    </span>
                    <span className="block text-xs text-neutral-400 mt-1">
                      {event.desc}
                    </span>
                  </div>
                ))}

                <InfoButton
                  className="w-full text-left px-3 py-2 rounded-lg border bg-cyan-900 border-cyan-700"
                  onClick={() => setShowEventModal(true)}
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </aside>

      <InfoModal
        open={showRegionModal}
        onOpenChange={setShowRegionModal}
        title="Informações sobre Regiões"
        description={
          <>
            Aqui você poderá colocar informações detalhadas sobre as regiões
            monitoradas, como dados de floração, atividade das abelhas, alertas
            e recomendações específicas para cada local.
            <br />
            <br />
            (Edite este texto conforme necessário)
          </>
        }
        buttonLabel="Entendi"
        onButtonClick={() => setSelectedRegion('California')}
      />
      <InfoModal
        open={showEventModal}
        onOpenChange={setShowEventModal}
        title="Informações sobre Eventos"
        description={
          <>
            Aqui você poderá colocar informações sobre os eventos, como alertas
            de floração, riscos climáticos, picos de atividade das abelhas e
            outras notificações relevantes para os usuários.
            <br />
            <br />
            (Edite este texto conforme necessário)
          </>
        }
        buttonLabel="Fechar"
      />
    </>
  );
}
