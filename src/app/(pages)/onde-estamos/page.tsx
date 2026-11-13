"use client";

import { PageHeader } from "@/components/page-header";
import dynamic from "next/dynamic";

interface TerritoryMapProps {
  center?: [number, number];
  zoom?: number;
}

// Dynamically import the map to avoid SSR issues
const DynamicMap = dynamic<TerritoryMapProps>(
  () => import("@/components/territory-map").then((mod) => mod.TerritoryMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-lg bg-gray-200 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    ),
  }
);


export default function OndeEstamos() {
  return (
    <>
      <PageHeader
        title="Onde Estamos"
        subtitle="Territórios de atuação do MMTR-SE"
      />


      <main className="container-wrapper">
        <div className="container flex flex-col gap-6 py-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                Nossos Territórios
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
                <p>
                  O MMTR-SE está presente em diversos territórios do estado de <strong>Sergipe</strong>,
                  fortalecendo a organização das mulheres trabalhadoras rurais e
                  promovendo o feminismo rural a partir de suas realidades locais.
                </p>

                <p>
                  O movimento desenvolve atividades de formação política, organização
                  comunitária e luta pelos direitos das mulheres do campo em diferentes
                  regiões do estado, sempre respeitando e valorizando as especificidades
                  de cada território.
                </p>
              </div>

              {/* Map Section */}
              <div className="my-8">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">
                  Área de Atuação
                </h3>
                <DynamicMap
                  center={[-10.5, -37.1]}
                  zoom={8}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
