"use client";

import { useMemo, useState } from "react";
import { menuItems } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { includesQuery } from "@/lib/utils";

type PromoType = "discount" | "special";

type Promo = {
  id: string;
  name: string;
  type: PromoType;
  active: boolean;
  value: number;
  schedule: string;
  targetCategory: string;
};

const initialPromos: Promo[] = [
  { id: "promo-1", name: "Lunch Time Treat", type: "discount", active: true, value: 15, schedule: "11.00 - 14.00", targetCategory: "Coffee" },
  { id: "promo-2", name: "Acoustic Night Menu", type: "special", active: false, value: 1, schedule: "Jumat 19.00", targetCategory: "Dessert" },
];

export function PromoManager({ query = "" }: { query?: string }) {
  const [promos, setPromos] = useState(initialPromos);
  const [selectedId, setSelectedId] = useState(initialPromos[0].id);
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const filteredPromos = useMemo(() => {
    return promos.filter((promo) => (showOnlyActive ? promo.active : true)).filter((promo) =>
      includesQuery([promo.name, promo.type, promo.schedule, promo.targetCategory, promo.value, promo.active ? "aktif" : "draft"], query),
    );
  }, [promos, showOnlyActive, query]);

  const selectedPromo = filteredPromos.find((promo) => promo.id === selectedId) ?? filteredPromos[0] ?? promos[0];

  const relatedMenus = useMemo(() => {
    return menuItems.filter((item) => item.category === selectedPromo.targetCategory).filter((item) =>
      includesQuery([item.name, item.category, item.id, item.discount, item.special], query),
    );
  }, [selectedPromo, query]);

  const updatePromo = (id: string, updater: (promo: Promo) => Promo) => {
    setPromos((current) => current.map((promo) => (promo.id === id ? updater(promo) : promo)));
  };

  const activateOnly = (id: string) => {
    setPromos((current) => current.map((promo) => ({ ...promo, active: promo.id === id })));
    setSelectedId(id);
  };

  return (
    <Card>
      <CardHeader
        title="Diskon & Menu Spesial"
        description={`Menampilkan ${filteredPromos.length} promo yang sesuai pencarian.`}
        action={<Button variant="glass" onClick={() => setShowOnlyActive((prev) => !prev)}>{showOnlyActive ? "Tampilkan Semua" : "Hanya Aktif"}</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          {filteredPromos.length > 0 ? filteredPromos.map((promo) => (
            <button key={promo.id} type="button" onClick={() => setSelectedId(promo.id)} className={`glass-muted w-full rounded-[24px] p-4 text-left transition ${selectedId === promo.id ? "ring-2 ring-soft-blue/30" : "hover:bg-white/20"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{promo.name}</p>
                  <p className="mt-1 text-sm text-soft-slate">{promo.type === "discount" ? `Diskon ${promo.value}%` : `Highlight ${promo.targetCategory}`}</p>
                </div>
                <Badge className={promo.active ? "bg-soft-mint/80" : "bg-white/30"}>{promo.active ? "Aktif" : "Draft"}</Badge>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-soft-slate">{promo.schedule}</p>
            </button>
          )) : <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada promo yang cocok.</div>}
        </div>
        <div className="glass-muted rounded-[28px] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-soft-slate">Promo Terpilih</p>
              <h3 className="mt-2 text-xl font-semibold">{selectedPromo.name}</h3>
              <p className="mt-1 text-sm text-soft-slate">Target kategori {selectedPromo.targetCategory}</p>
            </div>
            <Button variant="secondary" onClick={() => activateOnly(selectedPromo.id)}>Jadikan Aktif</Button>
          </div>
          <div className="mt-5 grid items-start gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[22px] bg-white/30 p-4">
              <p className="text-sm text-soft-slate">Nilai Promo</p>
              <p className="mt-2 text-3xl font-semibold">{selectedPromo.type === "discount" ? `${selectedPromo.value}%` : `${selectedPromo.value} Paket`}</p>
              <div className="mt-4 flex max-w-[260px] gap-2 justify-start">
                <Button variant="glass" className="flex-1" onClick={() => updatePromo(selectedPromo.id, (promo) => ({ ...promo, value: Math.max(1, promo.value - 5) }))}>Kurangi</Button>
                <Button className="flex-1" onClick={() => updatePromo(selectedPromo.id, (promo) => ({ ...promo, value: promo.value + 5 }))}>Tambah</Button>
              </div>
            </div>
            <div className="rounded-[22px] bg-white/30 p-4">
              <p className="text-sm text-soft-slate">Status Campaign</p>
              <p className="mt-2 text-lg font-semibold">{selectedPromo.active ? "Sedang Tayang" : "Belum Tayang"}</p>
              <div className="mt-4">
                <Checkbox label="Aktifkan promo ini" checked={selectedPromo.active} onChange={() => updatePromo(selectedPromo.id, (promo) => ({ ...promo, active: !promo.active }))} />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold">Menu yang terdampak</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {relatedMenus.length > 0 ? relatedMenus.map((menu) => (
                <div key={menu.id} className="rounded-[22px] border border-white/20 bg-white/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{menu.name}</p>
                      <p className="text-sm text-soft-slate">{menu.category}</p>
                    </div>
                    <Badge>{selectedPromo.type === "discount" ? `${selectedPromo.value}%` : "Special"}</Badge>
                  </div>
                </div>
              )) : <div className="rounded-[22px] bg-white/20 p-4 text-sm text-soft-slate">Tidak ada menu yang cocok.</div>}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
