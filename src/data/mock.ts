import { Material, PackagingComponent, SKU, PlantLocation } from '../types';

export const MATERIALS: Material[] = [
  {
    id: 'mat-1',
    name: 'Corrugated Board B-Flute',
    type: 'Corrugated Board',
    virginPercentage: 40,
    pcrPercentage: 60,
    density: 150,
    carbonFactor: 0.94,
    recyclabilityScore: 95,
  },
  {
    id: 'mat-2',
    name: 'Clear PET (Virgin)',
    type: 'PET',
    virginPercentage: 100,
    pcrPercentage: 0,
    density: 1380,
    carbonFactor: 2.15,
    recyclabilityScore: 85,
  },
  {
    id: 'mat-3',
    name: 'rPET (50% PCR)',
    type: 'PET',
    virginPercentage: 50,
    pcrPercentage: 50,
    density: 1380,
    carbonFactor: 1.45,
    recyclabilityScore: 85,
  },
  {
    id: 'mat-4',
    name: 'HDPE Natural',
    type: 'HDPE',
    virginPercentage: 100,
    pcrPercentage: 0,
    density: 950,
    carbonFactor: 1.80,
    recyclabilityScore: 90,
  },
];

export const PACKAGING_COMPONENTS: PackagingComponent[] = [
  {
    id: 'comp-1',
    name: '16oz Shampoo Bottle',
    thumbnail: 'https://picsum.photos/seed/bottle/200/200',
    dimensions: '200 x 60 x 60 mm',
    weight: 35,
    materialId: 'mat-3',
    supplierName: 'PlastiCorp Inc.',
    state: 'Approved',
    type: 'Bottle',
  },
  {
    id: 'comp-2',
    name: 'PP Dispenser Pump',
    dimensions: '30 mm',
    weight: 12,
    materialId: 'mat-4',
    supplierName: 'Global Closures Ltd.',
    state: 'Approved',
    type: 'Pump',
  },
  {
    id: 'comp-3',
    name: 'Corrugated Case (12-pack)',
    dimensions: '400 x 300 x 250 mm',
    weight: 450,
    materialId: 'mat-1',
    supplierName: 'BoxMasters',
    state: 'Approved',
    type: 'Box',
  },
  {
    id: 'comp-4',
    name: 'Standard Wood Pallet',
    dimensions: '1200 x 1000 mm',
    weight: 25000,
    materialId: 'mat-1', // Simplified for mock
    supplierName: 'PalletPro',
    state: 'Approved',
    type: 'Pallet',
  },
];

export const PLANTS: PlantLocation[] = [
  { id: 'plant-1', name: 'Ohio Manufacturing Center', city: 'Columbus', state: 'OH', type: 'Manufacturing' },
  { id: 'plant-2', name: 'California Distribution Hub', city: 'San Bernardino', state: 'CA', type: 'Distribution' },
  { id: 'plant-3', name: 'Oregon Co-Packer', city: 'Portland', state: 'OR', type: 'Contract Packer' },
];

export const SKUS: SKU[] = [
  {
    id: 'sku-1',
    skuNumber: 'ORG-SHAM-001',
    name: 'Organic Shampoo 16oz',
    productWeight: 475,
    plantId: 'plant-1',
    components: [
      { componentId: 'comp-1', quantity: 1, level: 'Primary' },
      { componentId: 'comp-2', quantity: 1, level: 'Primary' },
      { componentId: 'comp-3', quantity: 0.083, level: 'Secondary' }, // 1/12th of a box
    ],
  },
];
