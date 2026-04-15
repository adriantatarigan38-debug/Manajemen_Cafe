"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { dashboardStats, orders, staffHighlights, supplyItems } from "@/lib/data";
import { includesQuery } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/stat-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { OrderTimeline } from "@/components/dashboard/order-timeline";
import { SupplyPanel, StaffPanel } from "@/components/dashboard/quick-panels";
import { CalendarCard } from "@/components/shared/calendar-card";
import { CarouselCard } from "@/components/shared/carousel-card";
import { FileUploadCard } from "@/components/shared/file-upload";

export default function Home() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/login');
    }
  }, [router]);

  const filteredStats = useMemo(() => dashboardStats.filter((item) => includesQuery([item.title, item.value, item.detail, item.trend], query)), [query]);
  const filteredOrders = useMemo(() => orders.filter((order) => includesQuery([order.id, order.customer, order.table, order.stage, order.waiter, ...order.items], query)), [query]);
  const filteredSupply = useMemo(() => supplyItems.filter((item) => includesQuery([item.name, item.stock, item.status, item.supplier], query)), [query]);
  const filteredStaff = useMemo(() => staffHighlights.filter((staff) => includesQuery([staff.name, staff.role, staff.score, staff.bonus], query)), [query]);
  const totalResults = filteredStats.length + filteredOrders.length + filteredSupply.length + filteredStaff.length;

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-90" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1 xl:pl-0">
          <div className="glass mb-6 rounded-[30px] p-5 md:p-6">
            <DashboardHeader onToggleSidebar={() => setMobileOpen(true)} query={query} onQueryChange={setQuery} resultSummary={query ? `${totalResults} hasil ditemukan di dashboard.` : "Cari menu, staff, atau pesanan dengan cepat dari sini."} />
          </div>

          <div className="space-y-6">
            <section className="grid gap-4 xl:grid-cols-4">
              {(filteredStats.length > 0 ? filteredStats : dashboardStats).map((item) => (
                <StatCard key={item.title} item={item} />
              ))}
            </section>

            <section id="laporan" className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <SalesChart />
              <OrderTimeline orders={filteredOrders.length > 0 || query ? filteredOrders : orders} />
            </section>

            <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <SupplyPanel items={filteredSupply.length > 0 || query ? filteredSupply : supplyItems} />
              <StaffPanel staffItems={filteredStaff.length > 0 || query ? filteredStaff : staffHighlights} />
              <CalendarCard />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
              <CarouselCard />
              <FileUploadCard />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
