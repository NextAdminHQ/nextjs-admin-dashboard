export interface CountryFeature {
  type: string;
  properties: {
    name: string;
    ISO_A2?: string;
  };
  geometry: unknown;
}

export interface ImportData {
  [countryName: string]: number;
}
