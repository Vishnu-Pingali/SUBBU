"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { LOCATIONS } from "@/config/memories";

function createPulseIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;
          width:36px;height:36px;
          border-radius:50%;
          background:${color}22;
          animation:ripple 2s ease-out infinite;
        "></div>
        <div style="
          width:14px;height:14px;
          border-radius:50%;
          background:${color};
          box-shadow:0 0 12px ${color},0 0 24px ${color};
          position:relative;z-index:1;
        "></div>
        <style>
          @keyframes ripple {
            0%{transform:scale(1);opacity:0.8}
            100%{transform:scale(2.5);opacity:0}
          }
        </style>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export default function MapInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const loc1 = LOCATIONS.location1;
    const loc2 = LOCATIONS.location2;

    const midLat = (loc1.lat + loc2.lat) / 2;
    const midLng = (loc1.lng + loc2.lng) / 2;

    const map = L.map(containerRef.current, {
      center: [midLat, midLng],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
    });

    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 18, subdomains: "abcd" }
    ).addTo(map);

    // Markers
    L.marker([loc1.lat, loc1.lng], { icon: createPulseIcon("#ec4899") })
      .addTo(map)
      .bindTooltip(`<strong>${loc1.city}</strong><br><small>${loc1.name}</small>`, {
        permanent: true, direction: "top", className: "map-tooltip",
        offset: [0, -20],
      });

    L.marker([loc2.lat, loc2.lng], { icon: createPulseIcon("#a855f7") })
      .addTo(map)
      .bindTooltip(`<strong>${loc2.city}</strong><br><small>${loc2.name}</small>`, {
        permanent: true, direction: "top", className: "map-tooltip",
        offset: [0, -20],
      });

    // Curved animated line via SVG overlay
    const svgLayer = L.svg({ padding: 0.5 }).addTo(map);
    void svgLayer;

    // Draw a Bezier-ish polyline via intermediate points
    const bezierPoints: L.LatLngExpression[] = [];
    const steps = 60;
    const ctrlLat = midLat + 3;
    const ctrlLng = midLng;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = (1 - t) ** 2 * loc1.lat + 2 * (1 - t) * t * ctrlLat + t ** 2 * loc2.lat;
      const lng = (1 - t) ** 2 * loc1.lng + 2 * (1 - t) * t * ctrlLng + t ** 2 * loc2.lng;
      bezierPoints.push([lat, lng]);
    }

    // Solid line
    L.polyline(bezierPoints, {
      color: "rgba(236,72,153,0.25)",
      weight: 2,
      dashArray: "6 4",
    }).addTo(map);

    // Pulsing animated dashes
    const animLine = L.polyline(bezierPoints, {
      color: "#ec4899",
      weight: 2,
      dashArray: "12 20",
      dashOffset: "0",
    }).addTo(map);

    let offset = 0;
    const anim = setInterval(() => {
      offset -= 1;
      (animLine as unknown as { options: { dashOffset: string } }).options.dashOffset = String(offset);
      animLine.redraw();
    }, 50);

    return () => {
      clearInterval(anim);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .map-tooltip {
          background: rgba(10,10,30,0.9) !important;
          border: 1px solid rgba(236,72,153,0.4) !important;
          color: white !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          box-shadow: 0 0 12px rgba(236,72,153,0.3) !important;
        }
        .map-tooltip::before { display: none !important; }
        .leaflet-container { background: #0a0a1e !important; }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
