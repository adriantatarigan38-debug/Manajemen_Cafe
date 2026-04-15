"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { CafeIdentityManager } from "@/components/cafe/cafe-identity-manager";

export default function CafeIdentityPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-90" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1">
          <div className="glass mb-6 rounded-[30px] p-5 md:p-6">
            <DashboardHeader
              onToggleSidebar={() => setMobileOpen(true)}
              query={query}
              onQueryChange={setQuery}
              resultSummary={query ? `Filter identitas cafe aktif untuk: ${query}` : "Cari dokumen, profil cafe, atau legalitas usaha."}
            />
          </div>

          <div id="identitas">
            <CafeIdentityManager query={query} />
          </div>
        </main>
      </div>
    </div>
  );
}
