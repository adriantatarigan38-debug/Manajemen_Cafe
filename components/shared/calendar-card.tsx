"use client";

import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { Indonesian } from "flatpickr/dist/l10n/id";
import "flatpickr/dist/themes/material_blue.css";
import { Card, CardHeader } from "@/components/ui/card";

export function CalendarCard() {
  const [date, setDate] = useState<Date[]>([new Date()]);

  return (
    <Card className="border-2 border-[#A8C7A8]/30 bg-gradient-to-br from-[#A8C7A8]/10 to-white/5">
      <CardHeader
        title="Filter Tanggal Laporan"
        description="Kalender Flatpickr dengan locale Bahasa Indonesia."
      />
      <Flatpickr
        value={date}
        options={{
          mode: "range",
          locale: Indonesian,
          dateFormat: "d M Y",
        }}
        onChange={(selectedDates) => setDate(selectedDates)}
        className="w-full rounded-2xl border-2 border-[#A8C7A8]/30 bg-white/40 px-4 py-3 text-sm font-medium shadow-sm transition hover:border-[#A8C7A8]/50"
      />
      <p className="mt-3 text-sm font-semibold text-soft-slate">
        Rentang terpilih: {date.map((item) => item.toLocaleDateString("id-ID")).join(" - ")}
      </p>
    </Card>
  );
}
