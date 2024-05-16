import { Control } from "react-hook-form";

export interface Materials {
  id?: number;
  name: string;
  sku: string;
  status: string;
  detail?: string;
  picture?: File | string | null;
  categoryId: number | string;
  category?: {
    category: string;
  };
}

export interface MaterialInventories {
  materialId: number;
  id: number;
  material: {
    name: string;
    sku: string;
  };
  category: string;
  quantity: number;
}

export interface MaterialCategories {
  id?: number | string;
  category: string;
}

export type MaterialControl = Control<{
  name: string;
  sku: string;
  status: string;
  categoryId: string;
  detail?: string | undefined;
}>;
