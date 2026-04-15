"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { orders } from "@/lib/data";
import { includesQuery } from "@/lib/utils";
import { OrderTimeline } from "@/components/dashboard/order-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

import { InvoiceBuilder } from "@/components/orders/invoice-builder";

export default function OrdersPage() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOrders = useMemo(() => orders.filter((order) => includesQuery([order.id, order.customer, order.table, order.stage, order.waiter, ...order.items], query)), [query]);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-90" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1">
          <div className="glass mb-6 rounded-[30px] p-5 md:p-6">
            <DashboardHeader onToggleSidebar={() => setMobileOpen(true)} query={query} onQueryChange={setQuery} resultSummary={query ? `${filteredOrders.length} pesanan cocok dengan pencarian.` : "Cari order, customer, waiter, atau item pesanan."} />
          </div>

          <div className="space-y-6">
            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
              <OrderTimeline orders={filteredOrders} />
              <Card className="border-2 border-[#A8C7A8]/30 bg-gradient-to-br from-[#A8C7A8]/10 to-white/5">
                <CardHeader title="Ringkasan Operasional" description="Area untuk approval pesanan, cuti staff, payroll, dan penilaian layanan." action={<Button variant="glass" onClick={() => setOpen(true)}>Lihat Modal</Button>} />
                <div className="space-y-3">
                  <div className="glass-muted rounded-[24px] p-4 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-soft-slate">Pesanan Pending</p>
                        <p className="mt-2 text-2xl font-black text-[#EDC6B8]">{orders.filter(o => o.stage !== "Selesai").length}</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDC6B8]/30 to-[#EDC6B8]/10">
                        <span className="text-xl">📋</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-muted rounded-[24px] p-4 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-soft-slate">Staff On Duty</p>
                        <p className="mt-2 text-2xl font-black text-[#B8A8D8]">14 Staff</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B8A8D8]/30 to-[#B8A8D8]/10">
                        <span className="text-xl">👥</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-muted rounded-[24px] p-4 transition hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-soft-slate">Approval Pending</p>
                        <p className="mt-2 text-2xl font-black text-[#D4B483]">3 Items</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4B483]/30 to-[#D4B483]/10">
                        <span className="text-xl">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section id="invoice">
              <InvoiceBuilder orders={filteredOrders} />
            </section>
          </div>
        </main>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Glass Modal Preview">
        <p className="text-sm leading-7 text-soft-slate">Modal ini bisa dipakai untuk detail order, approval cuti, preview invoice, atau konfirmasi aksi penting.</p>
      </Modal>
    </div>
  );
}
