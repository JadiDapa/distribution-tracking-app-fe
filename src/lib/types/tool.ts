import { Control } from "react-hook-form";

export interface Tools {
  id?: number;
  name: string;
  sku: string;
  status: string;
  expired_at: Date;
  detail?: string;
  picture?: File | null | string;
  categoryId: number | string;
  category?: {
    category: string;
  };
}

export interface ToolInventories {
  toolId?: number;
  id: number;
  tool: {
    name: string;
    sku: string;
  };
  category: string;
  quantity: number;
}

export type ToolCategory = {
  id?: number | string;
  category: string;
};

export type ToolControl = Control<{
  name: string;
  categoryId: string;
  status: string;
  expired_at: Date;
  sku: string;
  detail?: string | undefined;
}>;
