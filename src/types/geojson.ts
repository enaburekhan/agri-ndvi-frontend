import type { Project } from "./project";

export interface GeoJSONFeature {
  type: "Feature";
  properties: Project;
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface ProjectFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
