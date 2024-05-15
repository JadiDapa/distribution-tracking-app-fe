import { Control } from "react-hook-form";
import { RequestedItems } from "./requestItem";

export interface Requests {
  id?: number;
  type?: string;
  reason: string;
  requesterId?: number | string;
  requestedId: number | string;
  requested?: {
    name: string;
  };
  requester?: {
    name: string;
  };
  items?: RequestedItems[];
  note?: string;
  status?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RequestControl = Control<{
  reason: string;
  requestedId: string;
  note?: string | undefined;
}>;
