import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { InfoButton } from "./InfoButton";
import { InfoModal } from "./InfoModal";
import { Button } from "./ui/button";

export function Sidebar() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showBrazilModal, setShowBrazilModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [tabValue, setTabValue] = useState("regions");
  const [selectedRegion, setSelectedRegion] = useState("California");
  const regions = [
    {
      name: "Brazil - Amazonas",
      descNLine: [
        'Amazon rainforest region region (-3.4627875,-62.2373404), granules: "HLS.S30.T20MNB._"',
        "Important target for preservation missions and natural sciences.",
      ],
    },
    {
      name: "California",
      descNLine: [
        'Carrizo Plains region (35.1898639,-119.8632972), granules: "HLS.S30.T10SGD._"',
        "Superblooms can happen in the northeast region between March and April.",
      ],
    },
  ];
  const events = [
    {
      title: "Bloom Tracking",
      descNLine: [
        "Tracking multiple simultanous flower bloomings in this region.",
        "Usually happening after after heavy raining in the desert, this increases polinator population, activity and efficiency.",
      ],
    },
    {
      title: "Snow Tracking",
      descNLine: [
        "Tracking unusual amounts of snow in this region.",
        "Snow and low temperatures are unusual in this region, and dectecting possible threats to polinator population and activity is crucial to devise response plans.",
      ],
    },
    {
      title: "Forest Preservation Tracking",
      descNLine: [
        "Monitoring forest health and tracking illegal deforestation activities.",
        "Satellite imagery can detect changes in forest cover, helping identify unauthorized logging and illegal land clearing.",
        "Tracking populations of endangered vegetation species to assess threats to biodiversity and promote conservation efforts.",
      ],
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
              alert("Feature to connect other databases coming soon!")
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
                  if (region.name === "Brazil") {
                    return (
                      <button
                        key={region.name}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-colors focus:outline-none ${
                          isSelected
                            ? "bg-cyan-900 border-cyan-700"
                            : "bg-transparent border-neutral-700 hover:bg-cyan-800"
                        }`}
                        onClick={() => {
                          setShowBrazilModal(true);
                          setSelectedRegion(region.name);
                        }}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-base font-semibold ${
                              isSelected ? "text-cyan-200" : "text-neutral-200"
                            }`}
                          >
                            {region.name}
                          </span>
                          {region.descNLine &&
                            region.descNLine.map((desc) => (
                              <span
                                className={`text-xs ${
                                  isSelected
                                    ? "text-cyan-300"
                                    : "text-neutral-400"
                                }`}
                              >
                                {desc}
                              </span>
                            ))}
                        </div>
                      </button>
                    );
                  }
                  return (
                    <button
                      key={region.name}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-colors focus:outline-none ${
                        isSelected
                          ? "bg-cyan-900 border-cyan-700"
                          : "bg-transparent border-neutral-700 hover:bg-cyan-800"
                      }`}
                      onClick={() => {
                        setShowRegionModal(true);
                        setSelectedRegion(region.name);
                      }}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-base font-semibold ${
                            isSelected ? "text-cyan-200" : "text-neutral-200"
                          }`}
                        >
                          {region.name}
                        </span>
                        {region.descNLine &&
                          region.descNLine.map((desc) => (
                            <span
                              className={`text-xs ${
                                isSelected
                                  ? "text-cyan-300"
                                  : "text-neutral-400"
                              }`}
                            >
                              {desc}
                            </span>
                          ))}
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
                    {event.descNLine &&
                      event.descNLine.map((desc) => (
                        <span className="block text-xs text-neutral-400 mt-1">
                          {desc}
                        </span>
                      ))}
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
        title="Additional Region Information"
        description={
          <>
            New regions can be effectively supported and monitored using any{" "}
            <b>multispectral satellite dataset</b>, which provides detailed
            insights across a variety of domains. Whether it’s for environmental
            monitoring, urban planning, or disaster management, the flexibility
            of these datasets allows for extensive coverage.
            <br />
            These regions can be continuously tracked by importing{" "}
            <b>satellite data</b> through ongoing mission subscriptions. One
            such resource is the{" "}
            <a
              style={{ color: "blue" }}
              href="https://www.earthdata.nasa.gov/data/catalog/lpcloud-hlss30-2.0"
              target="_blank"
            >
              NASA LPCloud HLSS30 Data
            </a>
            , which offers high-resolution datasets for accurate monitoring.
            Subscribing to these services allows for the application of advanced
            analysis techniques, including:
            <ul style={{ listStyleType: "circle" }}>
              <li style={{ fontWeight: "bold" }}>Land Cover Classification</li>
              <li style={{ fontWeight: "bold" }}>
                Vegetation Index Monitoring
              </li>
              <li style={{ fontWeight: "bold" }}>Urban Growth Detection</li>
              <li>And many more advanced methods.</li>
            </ul>
            By utilizing data from these sources, you can monitor dynamic
            changes in any region and gain <b>actionable insights</b> that aid
            in both short-term decision making and long-term planning.
          </>
        }
        buttonLabel="Close"
      />
      <InfoModal
        open={showBrazilModal}
        onOpenChange={(open) => {
          setShowBrazilModal(open);
          if (!open) setSelectedRegion("California");
        }}
        title="Informações sobre o Brasil"
        description={
          <>
            Aqui você pode colocar informações específicas sobre a região do
            Brasil, como dados agrícolas, polinização, alertas e recomendações
            para apicultores.
            <br />
            <br />
            (Edite este texto conforme necessário)
          </>
        }
        buttonLabel="Sair"
        onButtonClick={() => setSelectedRegion("California")}
      />
      <InfoModal
        open={showEventModal}
        onOpenChange={setShowEventModal}
        title="Additional Event Tracking Information"
        description={
          <>
            A wide range of important events can be tracked using this
            methodology, spanning areas from scientific research to public
            health, safety, and even private applications.
            <br />
            These events can be continuously monitored by importing satellite
            data through a subscription. This allows the use of advanced
            detection algorithms, including:
            <ul
              style={{
                listStyleType: "circle",
              }}
            >
              <li>Principal Component Analysis (PCA) </li>
              <li>Mixture Residual Reflectance</li>
              <li>And other specialized techniques.</li>
            </ul>
            By leveraging data collected from the{" "}
            <a
              style={{ color: "blue" }}
              href="https://www.sciencebase.gov/catalog/item/5807a2a2e4b0841e59e3a18d"
              target="_blank"
            >
              USGS Spectral Library
            </a>
            , which includes an extensive collection of materials, minerals,
            vegetation, and artificial features, you can gain valuable insights
            and stay informed on key developments.
          </>
        }
        buttonLabel="Close"
      />
    </>
  );
}
