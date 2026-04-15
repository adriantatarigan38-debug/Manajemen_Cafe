import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard as StatCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

// Warna untuk setiap kategori stat card
const statCardColors: Record<string, { bg: string; border: string; accent: string }> = {
  "Pendapatan Hari Ini": {
    bg: "bg-gradient-to-br from-[#7AA8C7]/15 to-[#7AA8C7]/5",
    border: "border-[#7AA8C7]/30",
    accent: "text-[#7AA8C7]"
  },
  "Pesanan Aktif": {
    bg: "bg-gradient-to-br from-[#EDC6B8]/15 to-[#EDC6B8]/5",
    border: "border-[#EDC6B8]/30",
    accent: "text-[#D4A89A]"
  },
  "Bahan Hampir Habis": {
    bg: "bg-gradient-to-br from-[#D4B483]/15 to-[#D4B483]/5",
    border: "border-[#D4B483]/30",
    accent: "text-[#D4B483]"
  },
  "Kepuasan Pelanggan": {
    bg: "bg-gradient-to-br from-[#89B9B0]/15 to-[#89B9B0]/5",
    border: "border-[#89B9B0]/30",
    accent: "text-[#89B9B0]"
  },
};

export function StatCard({ item }: { item: StatCardType }) {
  const colors = statCardColors[item.title] || {
    bg: "bg-gradient-to-br from-white/15 to-white/5",
    border: "border-white/30",
    accent: "text-soft-foreground"
  };

  return (
    <Card className={cn("glass-hover border-2 shadow-md", colors.bg, colors.border)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-soft-slate">{item.title}</p>
          <p className={cn("mt-3 text-3xl font-black tracking-tight", colors.accent)}>{item.value}</p>
          <p className="mt-2 text-sm font-medium text-soft-slate">{item.detail}</p>
        </div>
        <Badge className="font-bold">{item.trend}</Badge>
      </div>
    </Card>
  );
}
