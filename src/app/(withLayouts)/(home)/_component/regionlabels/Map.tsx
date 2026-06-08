"use client";
import { Card, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { MenuDotsIcon, MinusIcon, PlusIcon } from "@/utils/icon";
import type { Layer, LeafletMouseEvent, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { GeoJSON, MapContainer, useMap } from "react-leaflet";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CountryFeature {
  type: string;
  properties: {
    name: string;
    ISO_A2?: string;
  };
  geometry: unknown;
}

interface ImportData {
  [countryName: string]: number;
}

// ---------------------------------------------------------------------------
// Mock import data – replace with real data source
// ---------------------------------------------------------------------------
const IMPORT_DATA: ImportData = {
  "United States of America": 2548,
  "United Kingdom": 1342,
  Germany: 987,
  China: 1876,
  India: 643,
  Brazil: 412,
  France: 789,
  Australia: 521,
  Canada: 934,
  Japan: 1123,
};

// ---------------------------------------------------------------------------
// Muted greyscale tile (CartoDB Positron – no labels variant)
// ---------------------------------------------------------------------------
const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';

// ---------------------------------------------------------------------------
// Country style helpers
// ---------------------------------------------------------------------------
const defaultStyle: PathOptions = {
  fillColor: "var(--background-gray-secondary_alt)",
  fillOpacity: 1,
  color: "var(--color-card-border)",
  weight: 0.8,
};

const highlightStyle: PathOptions = {
  fillColor: "var(--color-brand-500)",
  fillOpacity: 0.9,
  color: "var(--color-base-white)",
  weight: 1,
};

// ---------------------------------------------------------------------------
// Custom Zoom Controls (no default Leaflet controls)
// ---------------------------------------------------------------------------
function ZoomControls() {
  const map = useMap();
  return (
    <div className="border border-border-secondary absolute bottom-3 right-3 flex flex-col z-999 rounded-[6px] divide-y divide-border-secondary bg-background-white-primary overflow-hidden">
      {[
        { label: <PlusIcon />, action: () => map.zoomIn() },
        { label: <MinusIcon />, action: () => map.zoomOut() },
      ].map(({ label, action }, index) => (
        <button
          key={index}
          onClick={action}
          className="size-8.5 flex items-center justify-center text-text-secondary [&>svg]:bg-transparent! hover:bg-button-primary-outline-hover-background transition-all duration-300"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tooltip component
// ---------------------------------------------------------------------------
interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  imp: number | null;
}

function CountryTooltip({ tooltip }: { tooltip: TooltipState }) {
  if (!tooltip.visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: tooltip.x + 12,
        top: tooltip.y - 10,
        zIndex: 2000,
        pointerEvents: "none",
      }}
      className="bg-tooltip-background rounded-lg px-3 py-2 text-sm font-medium leading-5 text-tooltip-text-color shadow-[0_0_1px_0_rgba(16,24,40,0.25),0_4px_4px_-2px_rgba(16,24,40,0.05)] "
    >
      {tooltip.name}
      {tooltip.imp !== null && <span> ( Imp. {tooltip.imp.toLocaleString()})</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GeoJSON layer with interaction
// ---------------------------------------------------------------------------
function CountriesLayer({
  geoData,
  setTooltip,
  containerRef,
}: {
  geoData: GeoJSON.FeatureCollection;
  setTooltip: React.Dispatch<React.SetStateAction<TooltipState>>;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const activeLayerRef = useRef<Layer | null>(null);

  function onEachFeature(feature: CountryFeature, layer: Layer) {
    const name: string = feature.properties?.name ?? "Unknown";
    const imp: number | null = IMPORT_DATA[name] ?? null;

    // @ts-ignore – Leaflet path methods exist at runtime
    const path = layer as L.Path;

    layer.on({
      mouseover(e: LeafletMouseEvent) {
        path.setStyle(highlightStyle);
        const rect = containerRef.current?.getBoundingClientRect();
        const rawX = e.originalEvent.clientX - (rect?.left ?? 0);
        const rawY = e.originalEvent.clientY - (rect?.top ?? 0);
        setTooltip({ visible: true, x: rawX, y: rawY, name, imp });
      },
      mousemove(e: LeafletMouseEvent) {
        const rect = containerRef.current?.getBoundingClientRect();
        const rawX = e.originalEvent.clientX - (rect?.left ?? 0);
        const rawY = e.originalEvent.clientY - (rect?.top ?? 0);
        setTooltip((prev) => ({ ...prev, x: rawX, y: rawY }));
      },
      mouseout() {
        if (activeLayerRef.current !== layer) {
          path.setStyle(defaultStyle);
        }
        setTooltip((prev) => ({ ...prev, visible: false }));
      },
      click() {
        // Reset previously active
        if (activeLayerRef.current && activeLayerRef.current !== layer) {
          // @ts-ignore
          (activeLayerRef.current as L.Path).setStyle(defaultStyle);
        }
        activeLayerRef.current = layer;
        path.setStyle(highlightStyle);
      },
    });
  }

  return (
    <GeoJSON
      data={geoData}
      style={defaultStyle}
      // @ts-ignore – feature typing mismatch is benign
      onEachFeature={onEachFeature}
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function RegionLabelsMap() {
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    name: "",
    imp: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch world GeoJSON (Natural Earth via public CDN)
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  return (
    <Card>
      {/* Header */}
      <CardHeader className="mb-6">
        <CardTitle>Region Labels</CardTitle>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </CardHeader>

      {/* Map wrapper – position:relative so tooltip & zoom are anchored */}
      <div
        ref={containerRef}
        style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}
      >
        <MapContainer
          center={[20, 10]}
          zoom={0}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          className="w-full rounded-xl bg-card-background!"
          style={{ height: 223 }}
        >
          {/* Country polygons */}
          {geoData && (
            <CountriesLayer
              geoData={geoData}
              setTooltip={setTooltip}
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
            />
          )}

          {/* Custom zoom */}
          <ZoomControls />
        </MapContainer>

        {/* Floating tooltip */}
        <CountryTooltip tooltip={tooltip} />
      </div>
    </Card>
  );
}
