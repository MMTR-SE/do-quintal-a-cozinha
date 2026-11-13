'use client';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { sergipeGeoJSON } from '@/data/sergipe-geojson';

// Centro aproximado de Sergipe
const centerPosition: [number, number] = [-10.5, -37.1];

export function TerritoryMap() {
  const geoJsonStyle = {
    fillColor: '#9333ea',
    fillOpacity: 0.5,
    color: '#7e22ce',
    weight: 3,
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={centerPosition}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution=''
        />
        <GeoJSON data={sergipeGeoJSON as unknown as GeoJSON.GeoJsonObject} style={geoJsonStyle} />
      </MapContainer>
      <div className="mt-2 text-center">
        <p className="text-sm text-purple-600 font-medium">
          Estado de Sergipe - Área de atuação do MMTR-SE
        </p>
      </div>
    </div>
  );
}
