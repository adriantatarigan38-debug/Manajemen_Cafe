"use client";

import { useState } from "react";
import { staffHighlights as defaultStaffHighlights, supplyItems as defaultSupplyItems } from "@/lib/data";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SupplyPanel({ items = defaultSupplyItems }: { items?: typeof defaultSupplyItems }) {
  const [localItems, setLocalItems] = useState(items);

  const cycleStatus = (name: string) => {
    setLocalItems((current) =>
      current.map((item) => {
        if (item.name !== name) return item;
        if (item.status === "Menipis") return { ...item, status: "Segera Restock" };
        if (item.status === "Segera Restock") return { ...item, status: "Aman" };
        return { ...item, status: "Menipis" };
      }),
    );
  };

  return (
    <Card className="border-2 border-[#89B9B0]/30 bg-gradient-to-br from-[#89B9B0]/10 to-white/5">
      <CardHeader title="Supply Bahan" description={`Menampilkan ${localItems.length} bahan yang sesuai filter.`} />
      <div className="space-y-3">
        {localItems.length > 0 ? localItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => cycleStatus(item.name)}
            className="glass-muted flex w-full items-center justify-between rounded-3xl p-4 text-left transition hover:bg-[#89B9B0]/15 hover:shadow-md"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-soft-slate">
                {item.stock} - Supplier {item.supplier}
              </p>
            </div>
            <Badge className="font-bold">{item.status}</Badge>
          </button>
        )) : <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada bahan yang cocok.</div>}
      </div>
    </Card>
  );
}

export function StaffPanel({ staffItems = defaultStaffHighlights }: { staffItems?: typeof defaultStaffHighlights }) {
  const [selectedName, setSelectedName] = useState(staffItems[0]?.name ?? "");

  return (
    <Card className="border-2 border-[#B8A8D8]/30 bg-gradient-to-br from-[#B8A8D8]/10 to-white/5">
      <CardHeader
        title="Staff Performance"
        description={`Menampilkan ${staffItems.length} staff yang sesuai filter.`}
        action={<Button variant="glass" onClick={() => (window.location.href = "/staff")}>Buka HR Center</Button>}
      />
      <div className="space-y-3">
        {staffItems.length > 0 ? staffItems.map((staff) => (
          <button
            key={staff.name}
            type="button"
            onClick={() => setSelectedName(staff.name)}
            className={`glass-muted flex w-full items-center justify-between rounded-3xl p-4 text-left transition ${selectedName === staff.name ? "ring-2 ring-[#B8A8D8]/40 bg-[#B8A8D8]/10 shadow-md" : "hover:bg-[#B8A8D8]/10 hover:shadow-md"}`}
          >
            <div>
              <p className="font-semibold">{staff.name}</p>
              <p className="text-sm text-soft-slate">
                {staff.role} - Skor {staff.score}
              </p>
            </div>
            <Badge className="font-bold">{staff.bonus}</Badge>
          </button>
        )) : <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada staff yang cocok.</div>}
      </div>
    </Card>
  );
}
