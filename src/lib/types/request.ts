export interface Request {
  requester: number | string;
  requested: number | string;
  items?: RequestedItem[];
  note?: string;
  status?: string | undefined;
}

export interface RequestedItem {
  materialId?: number;
  toolId?: number;
  quantity: number;
}
