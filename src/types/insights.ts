export interface Insights {
  // --- Drone General Inspection ---
  flightSummary?: {
    durationMinutes?: number;
    distanceKm?: number;
    altitudeMeters?: number;
  };

  anomalies?: {
    count: number;
    types?: string[]; // e.g. “structural crack”, “heat hotspot”
    locations?: { lat: number; lng: number }[];
  };

  // --- NDVI Analytics ---
  ndvi?: {
    mean: number;
    min: number;
    max: number;
    histogram?: number[]; // useful for UI charts
    classifiedZones?: {
      healthy: number; // % area
      moderate: number; // % area
      stressed: number; // % area
      critical: number; // % area
    };
  };

  // --- Agriculture Insights ---
  cropHealth?: {
    status: "healthy" | "moderate" | "stressed" | "critical";
    estimatedYield?: number; // Tons/hectare or crop-unit
    diseaseLikelihood?: number; // 0–1 range
  };

  soil?: {
    moisture?: number; // %
    temperature?: number; // °C
  };

  hotspotCoordinates?: { lat: number; lng: number }[];

  // --- Allow Extension ---
  [key: string]: unknown;
}
