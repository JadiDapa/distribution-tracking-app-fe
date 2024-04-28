import { Control } from "react-hook-form";

export interface Tools {
  id?: number;
  name: string;
  sku: string;
  status: string;
  expired_at: Date;
  detail?: string;
  picture?: string;
  categoryId: number | string;
  category?: {
    category: string;
  };
}

export type ToolControl = Control<{
  name: string;
  categoryId: string;
  status: string;
  expired_at: Date;
  sku: string;
  detail: string;
}>;
