"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { StaffHRHub } from "@/components/hr/staff-hr-hub";

export default function StaffPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-90" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1">
          <div className="glass mb-6 rounded-[30px] p-5 md:p-6">
            <DashboardHeader onToggleSidebar={() => setMobileOpen(true)} query={query} onQueryChange={setQuery} resultSummary={query ? `Filter staff aktif untuk kata kunci: ${query}` : "Cari nama staff, role, shift, atau status."} />
          </div>

          <div className="space-y-6" id="absensi">
            <StaffHRHub query={query} />
          </div>
        </main>
      </div>
    </div>
  );
}
