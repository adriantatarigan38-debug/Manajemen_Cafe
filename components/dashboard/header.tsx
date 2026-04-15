"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardStats, menuItems, orders, staffHighlights, supplyItems } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

type DashboardHeaderProps = {
  onToggleSidebar?: () => void;
  query: string;
  onQueryChange: (value: string) => void;
  resultSummary?: string;
};

export function DashboardHeader({ onToggleSidebar, query, onQueryChange, resultSummary }: DashboardHeaderProps) {
  const [notifOn, setNotifOn] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const helperText = useMemo(() => {
    if (!query) return resultSummary ?? "Cari menu, staff, atau pesanan dengan cepat dari sini.";
    return resultSummary ?? `Pencarian aktif untuk: ${query}`;
  }, [query, resultSummary]);

  const exportSummary = () => {
    const now = new Date();
    const reportId = `C28-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    const topMenus = [...menuItems].sort((a, b) => b.price - a.price).slice(0, 3);
    const urgentSupplies = supplyItems.filter((item) => item.status !== "Aman");
    const activeOrders = orders.filter((order) => order.stage !== "Selesai");

    const divider = "=".repeat(72);
    const section = (title: string) => `\n${title}\n${"-".repeat(title.length)}`;

    const content = [
      divider,
      "CAFE 28 - RINGKASAN OPERASIONAL CAFE",
      divider,
      `ID Laporan     : ${reportId}`,
      `Tanggal Cetak  : ${now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}`,
      `Jam Cetak      : ${now.toLocaleTimeString("id-ID")}`,
      `Lokasi         : Cafe 28 Main Branch`,
      `Disusun Oleh   : Sistem Admin Cafe 28`,
      section("RINGKASAN EKSEKUTIF"),
      ...dashboardStats.map((item, index) => `${index + 1}. ${item.title}: ${item.value} (${item.detail})`),
      section("PERFORMA PENJUALAN HARI INI"),
      `Pendapatan Hari Ini : ${dashboardStats[0]?.value ?? "-"}`,
      `Pesanan Aktif       : ${activeOrders.length} order`,
      `Pesanan Selesai     : ${orders.filter((order) => order.stage === "Selesai").length} order`,
      `Kepuasan Pelanggan  : ${dashboardStats[3]?.value ?? "-"}`,
      section("MENU UNGGULAN"),
      ...topMenus.map(
        (menu, index) =>
          `${index + 1}. ${menu.name} | Kategori: ${menu.category} | Harga: ${formatCurrency(menu.price)} | Stok: ${menu.stock} | Promo: ${menu.special ? "Menu Spesial" : menu.discount > 0 ? `${menu.discount}% Diskon` : "Reguler"}`,
      ),
      section("PESANAN AKTIF"),
      ...activeOrders.map(
        (order, index) =>
          `${index + 1}. ${order.id} | ${order.customer} | ${order.table} | ${order.stage} | ${formatCurrency(order.total)} | Waiter: ${order.waiter}`,
      ),
      section("SUPPLY BAHAN PRIORITAS"),
      ...(urgentSupplies.length > 0
        ? urgentSupplies.map(
            (item, index) => `${index + 1}. ${item.name} | Stok: ${item.stock} | Status: ${item.status} | Supplier: ${item.supplier}`,
          )
        : ["Semua supply dalam status aman."]),
      section("STAFF HIGHLIGHT"),
      ...staffHighlights.map(
        (staff, index) => `${index + 1}. ${staff.name} | ${staff.role} | Skor: ${staff.score} | Bonus: ${staff.bonus}`,
      ),
      section("CATATAN MANAJERIAL"),
      "- Prioritaskan restock bahan dengan status menipis sebelum shift sore dimulai.",
      "- Dorong upselling menu spesial pada jam makan siang dan event malam.",
      "- Pantau order yang masih berada di dapur agar SLA layanan tetap terjaga.",
      divider,
      "Dokumen ini dihasilkan otomatis dari template frontend Cafe 28.",
      divider,
      "",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportId.toLowerCase()}-cafe-28-ringkasan-operasional.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="glass-hover rounded-2xl border border-white/30 bg-white/30 px-3 py-2"
            aria-label="Buka sidebar"
          >
            <Icon name="bars" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setNotifOn((prev) => !prev)}
            className="glass-hover rounded-2xl border border-white/30 bg-white/30 px-3 py-2"
            aria-label="Toggle notifikasi"
          >
            <Icon name="bell" className={notifOn ? "h-4 w-4 text-soft-blue" : "h-4 w-4 text-soft-slate"} />
          </button>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.24em] text-soft-slate">Cafe Operations</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
          Dashboard Manajemen Cafe
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium text-soft-slate md:text-base">
          Template frontend modern untuk mengelola menu, pesanan, stok, staff, dan laporan
          penjualan dalam satu workspace yang nyaman dipakai seharian.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <div className="min-w-[260px]">
          <Input
            placeholder="Cari menu, staff, atau pesanan..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <p className="mt-2 text-xs font-semibold text-soft-slate">{helperText}</p>
        </div>
        <Badge className="justify-center px-4 py-3 font-bold">Shift Aktif: 14 staff</Badge>
        <button
          type="button"
          onClick={() => setNotifOn((prev) => !prev)}
          className="glass-hover hidden rounded-2xl border-2 border-white/30 bg-white/30 px-4 py-3 shadow-sm xl:inline-flex"
          aria-label="Toggle notifikasi"
        >
          <Icon name="bell" className={notifOn ? "h-4 w-4 text-soft-blue" : "h-4 w-4 text-soft-slate"} />
        </button>
        <Button variant="glass" onClick={exportSummary} className="font-bold">Ekspor Ringkasan</Button>
        <Button variant="glass" onClick={handleLogout} className="font-bold">Logout</Button>
      </div>
    </div>
  );
}
