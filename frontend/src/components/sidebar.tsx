import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from './ui/button';

export function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [tabValue, setTabValue] = useState('regions');
  const [selectedRegion, setSelectedRegion] = useState('California');
  const regions = [
    {
      name: 'Brazil',
      desc: 'Monitoring of flowering and beekeeping',
    },
    {
      name: 'California',
      desc: 'Agricultural crops and pollination',
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
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-cyan-200 tracking-tight">
              Obee
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
                        if (region.name === 'Brazil') setShowModal(true);
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
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </aside>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600 dark:text-cyan-300">
              How to use the application
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mb-4 text-neutral-700 dark:text-neutral-300">
            Welcome to Obee!
            <br />
            <br />
            1. Select a region to view flowering data, bee activity, and alerts.
            <br />
            2. Explore trends and dominant species.
            <br />
            3. Use zoom controls and filters to analyze specific areas.
            <br />
            4. Share relevant information with your community.
            <br />
            <br />
            This platform integrates satellite data and artificial intelligence
            to support beekeepers and researchers in environmental monitoring.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2 rounded-lg"
              onClick={() => setSelectedRegion('California')}
            >
              Understood
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
