import { Control } from "react-hook-form";

export interface Accounts {
  id?: number;
  name: string;
  user: string;
  password?: string;
  picture?: string;
  status: string;
  unitId: string | number;
  unit?: AccountUnit;
  higherAccountId?: string | number;
  higherAccount?: HigherAccounts;
}

export type AccountUnit = {
  id: number;
  unit: string;
};

export type HigherAccounts = {
  id: number;
  account: string;
};

export type AccountControl = Control<{
  id: string;
  name: string;
  user: string;
  password: string;
  confirmPassword: string;
  status: string;
  unitId: string;
  higherAccountId?: string | undefined;
}>;

export const defaultValues = {
  id: 0,
  name: "",
  user: "",
  password: "",
  confirmPassword: "",
  status: "active",
  unitId: "3",
  relation: "",
  unit: { id: 0, unit: "" },
};
