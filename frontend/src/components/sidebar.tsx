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
              alert('Funcionalidade de conectar outras bases em breve!')
            }
          >
            Conectar Base
          </Button>
        </div>

        <Tabs
          value={tabValue}
          onValueChange={setTabValue}
          className="flex-1 flex flex-col"
        >
          <TabsList className="flex border-neutral-800 bg-transparent px-2 mt-4">
            <TabsTrigger
              value="regioes"
              className="flex-1 py-2 text-center font-medium text-cyan-200"
            >
              Regiões
            </TabsTrigger>
            <TabsTrigger
              value="eventos"
              className="flex-1 py-2 text-center font-medium text-cyan-200"
            >
              Eventos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regioes" className="flex-1">
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
                        if (region.name === 'Brasil') setShowModal(true);
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
          <TabsContent value="eventos" className="flex-1">
            <ScrollArea className="px-2 py-3 overflow-auto">
              <div className="space-y-2">
                {eventos.map((evento, idx) => (
                  <div
                    key={idx}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900"
                  >
                    <span className="text-base font-semibold text-cyan-200">
                      {evento.title}
                    </span>
                    <span className="block text-xs text-neutral-400 mt-1">
                      {evento.desc}
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
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2 rounded-lg">
              Entendi
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
