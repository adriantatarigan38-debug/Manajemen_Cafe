"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { sidebarNav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const shiftTeam = [
  { name: "Raka", role: "Head Barista", status: "On Bar" },
  { name: "Lina", role: "Pramusaji Senior", status: "Floor" },
  { name: "Bima", role: "Kitchen Crew", status: "Kitchen" },
  { name: "Dewi", role: "Cashier", status: "Front Desk" },
];

// Warna aksen untuk setiap modul
const moduleColors: Record<string, string> = {
  "Dashboard": "from-[#7AA8C7]/20 to-[#7AA8C7]/5 border-[#7AA8C7]/30",
  "Manajemen Menu": "from-[#D4B483]/20 to-[#D4B483]/5 border-[#D4B483]/30",
  "Pesanan": "from-[#EDC6B8]/20 to-[#EDC6B8]/5 border-[#EDC6B8]/30",
  "Supply Bahan": "from-[#89B9B0]/20 to-[#89B9B0]/5 border-[#89B9B0]/30",
  "Staff & HR": "from-[#B8A8D8]/20 to-[#B8A8D8]/5 border-[#B8A8D8]/30",
  "Laporan Penjualan": "from-[#7AA8C7]/20 to-[#7AA8C7]/5 border-[#7AA8C7]/30",
  "Identitas Cafe": "from-[#A8C7A8]/20 to-[#A8C7A8]/5 border-[#A8C7A8]/30",
};

const activeModuleColors: Record<string, string> = {
  "Dashboard": "bg-gradient-to-br from-[#7AA8C7]/25 to-[#7AA8C7]/10 border-[#7AA8C7]/40",
  "Manajemen Menu": "bg-gradient-to-br from-[#D4B483]/25 to-[#D4B483]/10 border-[#D4B483]/40",
  "Pesanan": "bg-gradient-to-br from-[#EDC6B8]/25 to-[#EDC6B8]/10 border-[#EDC6B8]/40",
  "Supply Bahan": "bg-gradient-to-br from-[#89B9B0]/25 to-[#89B9B0]/10 border-[#89B9B0]/40",
  "Staff & HR": "bg-gradient-to-br from-[#B8A8D8]/25 to-[#B8A8D8]/10 border-[#B8A8D8]/40",
  "Laporan Penjualan": "bg-gradient-to-br from-[#7AA8C7]/25 to-[#7AA8C7]/10 border-[#7AA8C7]/40",
  "Identitas Cafe": "bg-gradient-to-br from-[#A8C7A8]/25 to-[#A8C7A8]/10 border-[#A8C7A8]/40",
};

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [shiftModalOpen, setShiftModalOpen] = useState(false);

  const shiftMetrics = useMemo(
    () => [
      { label: "Pesanan Selesai", value: "46" },
      { label: "Rata-rata Sajian", value: "11 Menit" },
      { label: "Customer Rating", value: "4.8 / 5" },
      { label: "Upsell Success", value: "68%" },
    ],
    [],
  );

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition xl:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "glass fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] w-[290px] flex-col rounded-[30px] p-5 transition xl:sticky xl:top-6 xl:z-auto xl:h-[calc(100vh-3rem)] xl:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-[120%] xl:translate-x-0",
        )}
      >
        <div className="mb-8 flex items-center justify-between gap-3 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7AA8C7] to-[#89B9B0] text-xl font-black text-white shadow-lg">
              CF
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Cafe 28</p>
              <p className="text-xs font-semibold text-soft-slate/80">Sistem Manajemen</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/20 bg-white/30 px-3 py-2 xl:hidden"
            aria-label="Tutup sidebar"
          >
            <Icon name="xmark" className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-2 overflow-y-auto pr-1">
          {sidebarNav.map((item) => {
            const active = item.href ? pathname === item.href : item.children?.some((child) => pathname === child.href);
            const isOpen = openGroups[item.title] ?? Boolean(active);
            const moduleColor = moduleColors[item.title] || "from-white/10 to-white/5 border-white/20";
            const activeColor = activeModuleColors[item.title] || "bg-white/45 border-white/30";

            return (
              <div key={item.title} className={cn("rounded-[24px] border bg-gradient-to-br p-2 shadow-sm", moduleColor)}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all",
                      active ? `${activeColor} border text-soft-foreground shadow-md` : "hover:bg-white/30",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={item.icon as never} className="h-5 w-5" />
                      {item.title}
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-soft-sky px-2.5 py-1 text-xs font-bold">{item.badge}</span>
                    ) : null}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleGroup(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all",
                        active ? `${activeColor} border shadow-md` : "bg-white/15 hover:bg-white/25",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={item.icon as never} className="h-5 w-5" />
                        {item.title}
                      </span>
                      <span className="flex items-center gap-2">
                        {item.badge ? (
                          <span className="rounded-full bg-soft-sky px-2.5 py-1 text-xs font-bold">{item.badge}</span>
                        ) : null}
                        <Icon name={isOpen ? "chevron-up" : "chevron-down"} className="h-3.5 w-3.5" />
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="space-y-1 px-2 pb-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "block rounded-2xl px-4 py-2.5 text-sm font-medium text-soft-slate transition-all hover:bg-white/25 hover:text-soft-foreground",
                              pathname === child.href && "bg-white/45 text-soft-foreground shadow-sm font-semibold",
                            )}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="glass-muted mt-auto rounded-[28px] border-2 border-white/40 p-5 shadow-lg">
          <p className="text-sm font-bold tracking-wide">Kinerja Shift Pagi</p>
          <p className="mt-2 text-4xl font-black text-soft-foreground">92%</p>
          <p className="mt-2 text-sm font-medium text-soft-slate">
            Waktu saji rata-rata 11 menit dengan rating layanan 4.8.
          </p>
          <Button variant="secondary" className="mt-4 w-full font-bold" onClick={() => setShiftModalOpen(true)}>
            Lihat Detail Shift
          </Button>
        </div>
      </aside>

      <Modal open={shiftModalOpen} onClose={() => setShiftModalOpen(false)} title="Detail Shift Pagi">
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {shiftMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[22px] bg-white/25 p-4">
                <p className="text-sm text-soft-slate">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Tim Aktif Saat Ini</p>
            <div className="space-y-3">
              {shiftTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between rounded-[22px] bg-white/25 p-4">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-soft-slate">{member.role}</p>
                  </div>
                  <Badge>{member.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
