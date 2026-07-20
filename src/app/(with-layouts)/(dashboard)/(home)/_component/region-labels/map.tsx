"use client";

import { Button } from "@/components/tailgrids/core/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { MenuDotsIcon, MinusIcon, PlusIcon } from "@/utils/icon";
import type { Layer, LeafletMouseEvent, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { GeoJSON, MapContainer, useMap } from "react-leaflet";
import { CountryFeature, ImportData } from "./types";

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

// Country style helpers

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

// Custom Zoom Controls (no default Leaflet controls)

function ZoomControls() {
  const map = useMap();
  return (
    <div className="absolute right-3 bottom-3 z-999 flex flex-col divide-y divide-border-secondary overflow-hidden rounded-md border border-border-secondary bg-background-white-primary">
      {[
        { label: <PlusIcon />, action: () => map.zoomIn() },
        { label: <MinusIcon />, action: () => map.zoomOut() },
      ].map(({ label, action }, index) => (
        <button
          key={index}
          onClick={action}
          className="flex size-8.5 items-center justify-center text-text-secondary transition-all duration-300 hover:bg-button-primary-outline-hover-background [&>svg]:bg-transparent!"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// Tooltip component

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
      className="rounded-lg bg-tooltip-background px-3 py-2 text-sm leading-5 font-medium text-tooltip-text-color shadow-[0_0_1px_0_rgba(16,24,40,0.25),0_4px_4px_-2px_rgba(16,24,40,0.05)]"
    >
      {tooltip.name}
      {tooltip.imp !== null && <span> ( Imp. {tooltip.imp.toLocaleString()})</span>}
    </div>
  );
}

// GeoJSON layer with interaction

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

    // Map GeoJSON country name to keys in IMPORT_DATA
    const importKey = name === "USA" ? "United States of America" : name;
    const imp: number | null = IMPORT_DATA[importKey] ?? null;

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
          (activeLayerRef.current as L.Path).setStyle(defaultStyle);
        }
        activeLayerRef.current = layer;
        path.setStyle(highlightStyle);
      },
    });
  }

  return <GeoJSON data={geoData} style={defaultStyle} onEachFeature={onEachFeature} />;
}

// Main component

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
        <Button iconOnly size="xs" variant="ghost">
          <MenuDotsIcon />
        </Button>
      </CardHeader>

      {/* Map wrapper – position:relative so tooltip & zoom are anchored */}
      <CardContent
        className="p-0"
        ref={containerRef}
        style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}
      >
        <MapContainer
          center={[20, 10]}
          zoom={0.5}
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
      </CardContent>
    </Card>
  );
}
