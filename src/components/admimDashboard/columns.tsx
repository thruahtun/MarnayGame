import type { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "header",
    header: "Listing",
  },
  {
    accessorKey: "type",
    header: "Game",
  },
  {
    accessorKey: "limit",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
