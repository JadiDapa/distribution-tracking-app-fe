import MaterialDetail from "@/components/Material/MaterialDetail";
import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";

export type Material = {
  id: number;
  material: {
    name: string;
    sku: string;
    category: {
      category: string;
    };
  };
  category: string;
  quantity: number;
  action: string;
};

export const materialInventory: ColumnDef<Material>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="pl-4">
        <TableSorter column={column} header="#" />
      </div>
    ),
    cell: ({ row }) => <div className="ml-4 text-primary">{row.index + 1}</div>,
  },
  {
    accessorKey: "materialId",
    header: () => <></>,
    cell: () => <></>,
  },
  {
    accessorKey: "material",
    header: ({ column }) => <TableSorter column={column} header="MATERIAL" />,
    accessorFn: (row) => row.material?.name,
    cell: ({ row }) => (
      <MaterialDetail
        id={row.getValue("materialId")}
        quantity={row.getValue("quantity")}
      />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
    accessorFn: (row) => row.material?.sku,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="UNIT" />,
    accessorFn: (row) => row.material?.category.category,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TableSorter column={column} header="QUANTITY" />,
  },
];
