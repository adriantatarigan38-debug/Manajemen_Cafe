"use client";

import { useMemo, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardHeader } from "@/components/ui/card";
import { salesSeries } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

type RangeKey = "7d" | "30d" | "custom";

const rangeMap: Record<RangeKey, number> = {
  "7d": 7,
  "30d": 30,
  custom: 5,
};

export function SalesChart() {
  const [range, setRange] = useState<RangeKey>("7d");
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const chartState = useMemo(() => {
    const take = rangeMap[range];
    const baseLabels = salesSeries.labels;
    const baseIncome = salesSeries.income;
    const baseExpense = salesSeries.expense;

    if (take <= baseLabels.length) {
      return {
        labels: baseLabels.slice(-take),
        income: baseIncome.slice(-take),
        expense: baseExpense.slice(-take),
      };
    }

    const labels = Array.from({ length: take }, (_, index) => `Hari ${index + 1}`);
    const income = Array.from({ length: take }, (_, index) => Number((4.2 + index * 0.11).toFixed(1)));
    const expense = Array.from({ length: take }, (_, index) => Number((2.6 + index * 0.05).toFixed(1)));

    return { labels, income, expense };
  }, [range]);

  const clampedIndex = Math.min(selectedIndex, chartState.labels.length - 1);
  const selectedLabel = chartState.labels[clampedIndex];
  const selectedIncome = chartState.income[clampedIndex] ?? 0;
  const selectedExpense = chartState.expense[clampedIndex] ?? 0;
  const profit = selectedIncome - selectedExpense;

  const datasets = [
    showIncome
      ? {
          label: "Untung",
          data: chartState.income,
          fill: true,
          borderColor: "#8bb8d9",
          backgroundColor: "rgba(139, 184, 217, 0.18)",
          tension: 0.4,
        }
      : null,
    showExpense
      ? {
          label: "Biaya",
          data: chartState.expense,
          fill: true,
          borderColor: "#bfd8cb",
          backgroundColor: "rgba(191, 216, 203, 0.15)",
          tension: 0.4,
        }
      : null,
  ].filter(Boolean);

  return (
    <Card className="border-2 border-[#7AA8C7]/30 bg-gradient-to-br from-[#7AA8C7]/10 to-white/5">
      <CardHeader
        title="Laporan Penjualan"
        description="Filter rentang, tampilkan dataset, dan lihat detail profit harian."
        action={<Badge className="font-bold">{range === "7d" ? "7 Hari" : range === "30d" ? "30 Hari" : "Custom"}</Badge>}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { key: "7d", label: "7 Hari" },
          { key: "30d", label: "30 Hari" },
          { key: "custom", label: "Custom" },
        ].map((item) => (
          <Button
            key={item.key}
            variant={range === item.key ? "primary" : "glass"}
            onClick={() => {
              setRange(item.key as RangeKey);
              setSelectedIndex(0);
            }}
          >
            {item.label}
          </Button>
        ))}

        <Button variant={showIncome ? "secondary" : "glass"} onClick={() => setShowIncome((prev) => !prev)}>
          Untung {showIncome ? "On" : "Off"}
        </Button>
        <Button variant={showExpense ? "secondary" : "glass"} onClick={() => setShowExpense((prev) => !prev)}>
          Biaya {showExpense ? "On" : "Off"}
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[320px] rounded-[26px] bg-white/15 p-3">
          <Line
            data={{
              labels: chartState.labels,
              datasets: datasets as never,
            }}
            options={{
              maintainAspectRatio: false,
              onClick: (_, elements) => {
                if (elements.length > 0) {
                  setSelectedIndex(elements[0].index);
                }
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => `Rp ${value} jt`,
                  },
                  grid: {
                    color: "rgba(126,146,166,0.1)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] bg-gradient-to-br from-[#7AA8C7]/20 to-white/20 p-5 shadow-sm">
            <p className="text-sm font-semibold text-soft-slate">Tanggal Terpilih</p>
            <p className="mt-2 text-3xl font-black text-[#7AA8C7]">{selectedLabel}</p>
            <p className="mt-2 text-sm font-medium text-soft-slate">Klik titik chart untuk pindah detail harian.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[24px] bg-gradient-to-br from-[#89B9B0]/15 to-white/20 p-4 shadow-sm">
              <p className="text-sm font-semibold text-soft-slate">Pendapatan</p>
              <p className="mt-2 text-xl font-black text-[#89B9B0]">{formatCurrency(selectedIncome * 1000000)}</p>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-[#EDC6B8]/15 to-white/20 p-4 shadow-sm">
              <p className="text-sm font-semibold text-soft-slate">Biaya</p>
              <p className="mt-2 text-xl font-black text-[#D4A89A]">{formatCurrency(selectedExpense * 1000000)}</p>
            </div>
            <div className="rounded-[24px] bg-gradient-to-br from-[#D4B483]/15 to-white/20 p-4 shadow-sm">
              <p className="text-sm font-semibold text-soft-slate">Profit</p>
              <p className="mt-2 text-xl font-black text-[#D4B483]">{formatCurrency(profit * 1000000)}</p>
            </div>
          </div>

          <div className="rounded-[24px] bg-white/25 p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold">Pilih Hari Cepat</p>
            <div className="flex flex-wrap gap-2">
              {chartState.labels.map((label, index) => (
                <Button
                  key={label}
                  variant={clampedIndex === index ? "primary" : "glass"}
                  className="px-3 py-2 text-xs font-bold"
                  onClick={() => setSelectedIndex(index)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
