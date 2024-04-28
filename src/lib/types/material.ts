export interface Materials {
  id?: number;
  name: string;
  sku: string;
  status: string;
  detail?: string;
  picture?: string;
  categoryId: number;
  category?: {
    category: string;
  };
}
