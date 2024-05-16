import { Control } from "react-hook-form";

export interface Vehicles {
  id?: number | string;
  police_number: string;
  variantId: number | string;
  variant?: VehicleVariants;
  brand: string;
  detail?: string;
  manufacture_year: string;
  contract_start: Date;
  contract_end: Date;
  areaId: string | number;
  locationId: string | number;
  picture?: File | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VehicleVariants {
  id?: number;
  category: string;
}

export type VehicleControl = Control<{
  police_number: string;
  variantId: string;
  brand: string;
  manufacture_year: string;
  contract_start: Date;
  contract_end: Date;
  areaId: string;
  locationId: string;
  detail?: string | undefined;
}>;
