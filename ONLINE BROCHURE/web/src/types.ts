export interface Product {
  code: string;
  name: string;
  unit: string;
  group: string;
  subgroup: string;
  material: string;
  qtyPerCarton: string;
  qtyPerBox: string;
  otherInfo: string;
  imageUrl: string;
}

export interface CatalogueResponse {
  generatedAt: string;
  products: Product[];
  meta?: { imagesProcessedThisRun?: number; error?: string };
}
