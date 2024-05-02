export interface RequestedItems {
  id?: number | string;
  code?: string;
  name: string;
  sku: string;
  stock: number;
  quantity: number;
  materialId?: number;
  material?: {
    name: string;
    sku: string;
  };
  toolId?: number;
  requestId?: number;
}
