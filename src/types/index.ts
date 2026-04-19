export type MaterialType = 'Corrugated Board' | 'PET' | 'HDPE' | 'Aluminum' | 'Glass' | 'Paper' | 'LDPE' | 'PP';

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  virginPercentage: number;
  pcrPercentage: number;
  density: number; // kg/m3 or similar unit
  carbonFactor: number; // kg CO2e per kg
  recyclabilityScore: number; // 0-100
}

export type LifecycleState = 'Draft' | 'In Review' | 'Approved' | 'Obsolete';

export interface PackagingComponent {
  id: string;
  name: string;
  thumbnail?: string;
  dimensions: string;
  weight: number; // in grams
  materialId: string;
  supplierName: string;
  state: LifecycleState;
  type: 'Bottle' | 'Box' | 'Label' | 'Cap' | 'Pump' | 'Pallet' | 'Wrap';
}

export interface SKUComponent {
  componentId: string;
  quantity: number;
  level: 'Primary' | 'Secondary' | 'Tertiary';
}

export interface SKU {
  id: string;
  skuNumber: string;
  name: string;
  productWeight: number; // in grams
  components: SKUComponent[];
  plantId: string;
}

export interface PlantLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'Manufacturing' | 'Distribution' | 'Contract Packer';
}
