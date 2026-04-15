"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { menuItems } from "@/lib/data";
import { includesQuery } from "@/lib/utils";
import { MenuTable } from "@/components/menu/menu-table";
import { MenuForm } from "@/components/forms/menu-form";
import { ImageZoomCard } from "@/components/shared/image-zoom-card";
import { PromoManager } from "@/components/menu/promo-manager";

export default function MenuPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredMenuItems = useMemo(() => menuItems.filter((item) => includesQuery([item.id, item.name, item.category, item.price, item.stock, item.discount, item.special ? "special" : "regular"], query)), [query]);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-90" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1">
          <div className="glass mb-6 rounded-[30px] p-5 md:p-6">
            <DashboardHeader onToggleSidebar={() => setMobileOpen(true)} query={query} onQueryChange={setQuery} resultSummary={query ? `${filteredMenuItems.length} menu cocok dengan pencarian.` : "Cari menu, promo, atau kategori dengan cepat dari sini."} />
          </div>

          <div className="space-y-6">
            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
              <MenuTable data={filteredMenuItems} />
              <MenuForm />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <ImageZoomCard />
              <div id="promo">
                <PromoManager query={query} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
