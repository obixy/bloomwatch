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
  const [selectedRegion, setSelectedRegion] = useState('Califórnia');
  const [tabValue, setTabValue] = useState('regioes');
  const regions = [
    {
      name: 'Brasil',
      desc: 'Monitoramento de floração e apicultura',
    },
    {
      name: 'Califórnia',
      desc: 'Safras agrícolas e polinização',
    },
  ];
  const eventos = [
    {
      title: 'Alerta de Floração',
      desc: 'Previsão de floração intensa nas próximas semanas.',
    },
    {
      title: 'Risco de geada',
      desc: 'Temperaturas baixas podem afetar as colmeias.',
    },
    {
      title: 'Alta atividade de abelhas',
      desc: 'Monitoramento indica pico de polinização.',
    },
  ];

  return (
    <>
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
          </div>
        </div>

        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="flex-1 flex flex-col"
        >
          <TabsList className="flex border-b border-white/10 dark:border-neutral-800">
            <TabsTrigger
              value="regioes"
              className="flex-1 py-2 text-center font-semibold"
            >
              Regiões
            </TabsTrigger>
            <TabsTrigger
              value="eventos"
              className="flex-1 py-2 text-center font-semibold"
            >
              Eventos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regioes" className="flex-1">
            <ScrollArea className="px-4 py-4 overflow-auto">
              <div className="space-y-3">
                {regions.map((region) => {
                  const isSelected = selectedRegion === region.name;
                  return (
                    <button
                      key={region.name}
                      className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all border
                        border-white/10 dark:border-neutral-800
                        ${
                          isSelected
                            ? 'bg-blue-500/40 dark:bg-blue-900/60 ring-2 ring-blue-400'
                            : 'bg-white/10 dark:bg-neutral-900/50 hover:bg-blue-500/30'
                        }`}
                      onClick={() => {
                        if (region.name === 'Brasil') setShowModal(true);
                        setSelectedRegion(region.name);
                      }}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-lg font-semibold ${
                            isSelected
                              ? 'text-blue-100 dark:text-cyan-200'
                              : 'text-neutral-100 dark:text-neutral-200'
                          }`}
                        >
                          {region.name}
                        </span>
                        <span
                          className={`text-xs ${
                            isSelected
                              ? 'text-blue-200 dark:text-cyan-300'
                              : 'text-neutral-400 dark:text-neutral-500'
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
          <TabsContent value="eventos" className="flex-1">
            <ScrollArea className="px-4 py-4 overflow-auto">
              <div className="space-y-3">
                {eventos.map((evento, idx) => (
                  <div
                    key={idx}
                    className="w-full px-4 py-3 rounded-xl mb-2 border border-white/10 dark:border-neutral-800 bg-white/10 dark:bg-neutral-900/50"
                  >
                    <span className="text-lg font-semibold text-blue-100 dark:text-cyan-200">
                      {evento.title}
                    </span>
                    <span className="block text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                      {evento.desc}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-white/10 dark:border-neutral-800">
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90">
              Compartilhar
            </Button>
          </div>
        </div>
      </aside>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600 dark:text-cyan-300">
              Como utilizar a aplicação
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mb-4 text-neutral-700 dark:text-neutral-300">
            Bem-vindo ao Obee!
            <br />
            <br />
            1. Selecione uma região para visualizar dados de floração, atividade
            das abelhas e alertas.
            <br />
            2. Explore as tendências e espécies dominantes.
            <br />
            3. Utilize os controles de zoom e filtros para analisar áreas
            específicas.
            <br />
            4. Compartilhe informações relevantes com sua comunidade.
            <br />
            <br />
            Esta plataforma integra dados de satélite e inteligência artificial
            para apoiar apicultores e pesquisadores no monitoramento ambiental.
          </DialogDescription>
          <DialogClose asChild>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 mt-2">
              Entendi
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
