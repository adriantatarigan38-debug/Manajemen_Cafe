"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { menuItems as defaultMenuItems } from "@/lib/data";
import { MenuItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

const columnHelper = createColumnHelper<MenuItem>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nama Menu",
    cell: (info) => (
      <div>
        <p className="font-semibold">{info.getValue()}</p>
        <p className="text-xs text-soft-slate">{info.row.original.id}</p>
      </div>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Kategori",
  }),
  columnHelper.accessor("price", {
    header: "Harga",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  columnHelper.accessor("stock", {
    header: "Stok",
  }),
  columnHelper.display({
    id: "promo",
    header: "Promo",
    cell: (info) => {
      const item = info.row.original;

      if (item.special) return <Badge className="bg-soft-mint/70">Menu Spesial</Badge>;
      if (item.discount > 0) return <Badge className="bg-soft-peach/65">{item.discount}% Diskon</Badge>;
      return <Badge className="bg-white/30">Reguler</Badge>;
    },
  }),
];

export function MenuTable({ data = defaultMenuItems }: { data?: MenuItem[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader
        title="Tabel Menu"
        description={`Menampilkan ${data.length} menu yang sesuai pencarian.`}
      />
      <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/20">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/30 text-soft-slate">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-4 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-white/20">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-soft-slate">Tidak ada menu yang cocok.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
