'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
  () => import('./territory-map').then((mod) => mod.TerritoryMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Carregando mapa...</p>
      </div>
    ),
  }
);

export function TerritoryMapClient() {
  return <DynamicMap />;
}
