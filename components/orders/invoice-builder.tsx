"use client";

import { useMemo, useState } from "react";
import { orders as defaultOrders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input, TextArea } from "@/components/ui/input";

const paymentOptions = ["QRIS", "Cash", "Debit", "Transfer"];

export function InvoiceBuilder({ orders = defaultOrders }: { orders?: typeof defaultOrders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? defaultOrders[0].id);
  const [serviceEnabled, setServiceEnabled] = useState(true);
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [note, setNote] = useState("Terima kasih sudah berkunjung. Simpan invoice ini sebagai bukti pembayaran.");

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? orders[0] ?? defaultOrders[0];

  const lineItems = useMemo(() => {
    const perItem = Math.round(selectedOrder.total / selectedOrder.items.length);
    return selectedOrder.items.map((item, index) => ({
      id: `${selectedOrder.id}-${index}`,
      name: item,
      qty: 1,
      price: perItem,
      note: index === 0 ? "Best seller" : "Freshly prepared",
    }));
  }, [selectedOrder]);

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const service = serviceEnabled ? subtotal * 0.05 : 0;
    const tax = taxEnabled ? subtotal * 0.11 : 0;
    const grandTotal = subtotal + service + tax;
    return { subtotal, service, tax, grandTotal };
  }, [lineItems, serviceEnabled, taxEnabled]);

  const exportInvoice = () => {
    const content = [
      "CAFE 28",
      `Invoice : ${selectedOrder.id}`,
      `Customer: ${selectedOrder.customer}`,
      `Table   : ${selectedOrder.table}`,
      `Waiter  : ${selectedOrder.waiter}`,
      "",
      "Items",
      ...lineItems.map((item) => `- ${item.name} x${item.qty} | ${formatCurrency(item.price)}`),
      "",
      `Subtotal   : ${formatCurrency(totals.subtotal)}`,
      `Service 5% : ${formatCurrency(totals.service)}`,
      `PPN 11%    : ${formatCurrency(totals.tax)}`,
      `Total      : ${formatCurrency(totals.grandTotal)}`,
      `Payment    : ${paymentMethod}`,
      `Note       : ${note}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedOrder.id.toLowerCase()}-cafe-28-invoice.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="overflow-hidden border-2 border-[#7AA8C7]/30 bg-gradient-to-br from-[#7AA8C7]/10 to-white/5">
      <CardHeader
        title="Invoice Builder"
        description={`Menampilkan ${orders.length} pesanan yang bisa dipilih untuk invoice modern.`}
        action={<Button onClick={exportInvoice} className="font-bold">Unduh Invoice</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          <div className="rounded-[26px] bg-gradient-to-br from-[#7AA8C7]/20 to-white/20 p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-soft-slate">Daftar Pesanan</p>
            <p className="mt-2 text-sm font-medium text-soft-slate">Pilih order untuk melihat invoice yang lebih rapi dan modern.</p>
          </div>

          {orders.length > 0 ? (
            orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedOrderId(order.id)}
                className={`glass-muted w-full rounded-[26px] p-4 text-left transition ${selectedOrderId === order.id ? "ring-2 ring-[#7AA8C7]/40 shadow-md bg-[#7AA8C7]/10" : "hover:bg-white/20 hover:shadow-sm"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="mt-1 text-sm font-medium text-soft-slate">{order.customer} - {order.table}</p>
                  </div>
                  <Badge className={selectedOrderId === order.id ? "bg-[#7AA8C7]/80 font-bold" : "bg-white/30 font-bold"}>{order.stage}</Badge>
                </div>
                <p className="mt-3 text-sm text-soft-slate line-clamp-2">{order.items.join(", ")}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-soft-slate">
                  <span>{order.waiter}</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada invoice yang cocok.</div>
          )}
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.75),rgba(219,234,244,0.5),rgba(191,216,203,0.35))] p-6 shadow-glass backdrop-blur-xl">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-soft-blue/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-soft-mint/20 blur-3xl" />

            <div className="relative flex flex-col gap-5">
              <div className="flex flex-col gap-4 border-b border-white/35 pb-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-soft-slate">Cafe 28</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">Modern Invoice</h3>
                  <p className="mt-2 max-w-xl text-sm text-soft-slate">
                    Dokumen pembayaran dengan tampilan premium untuk kasir, operasional, dan pelanggan.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/30 bg-white/40 px-4 py-3 text-right shadow-soft">
                  <p className="text-xs uppercase tracking-[0.18em] text-soft-slate">Invoice ID</p>
                  <p className="mt-2 text-lg font-semibold">{selectedOrder.id}</p>
                  <p className="mt-1 text-sm text-soft-slate">{paymentMethod}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] bg-white/35 p-4 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.18em] text-soft-slate">Bill To</p>
                  <p className="mt-3 text-lg font-semibold">{selectedOrder.customer}</p>
                  <p className="mt-1 text-sm text-soft-slate">Table {selectedOrder.table}</p>
                  <p className="mt-1 text-sm text-soft-slate">Order Stage: {selectedOrder.stage}</p>
                </div>
                <div className="rounded-[24px] bg-white/35 p-4 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.18em] text-soft-slate">Served By</p>
                  <p className="mt-3 text-lg font-semibold">{selectedOrder.waiter}</p>
                  <p className="mt-1 text-sm text-soft-slate">Cafe 28 Front Service</p>
                  <p className="mt-1 text-sm text-soft-slate">Generated from Cafe 28 admin dashboard</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/35 bg-white/35 shadow-soft">
                <div className="grid grid-cols-[1.6fr_0.5fr_0.9fr] gap-3 border-b border-white/25 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-soft-slate">
                  <span>Item</span>
                  <span>Qty</span>
                  <span className="text-right">Amount</span>
                </div>
                <div className="divide-y divide-white/20">
                  {lineItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-[1.6fr_0.5fr_0.9fr] gap-3 px-5 py-4 text-sm">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="mt-1 text-xs text-soft-slate">{item.note}</p>
                      </div>
                      <span className="text-soft-slate">{item.qty}</span>
                      <span className="text-right font-medium">{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] bg-white/30 p-4 shadow-soft">
                  <p className="text-xs uppercase tracking-[0.18em] text-soft-slate">Customer Note</p>
                  <TextArea className="mt-3 bg-white/50" value={note} onChange={(event) => setNote(event.target.value)} />
                </div>

                <div className="rounded-[24px] bg-[#f7f3eb]/75 p-5 shadow-soft">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-soft-slate">Subtotal</span>
                      <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-soft-slate">Service 5%</span>
                      <span className="font-medium">{formatCurrency(totals.service)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-soft-slate">PPN 11%</span>
                      <span className="font-medium">{formatCurrency(totals.tax)}</span>
                    </div>
                    <div className="border-t border-soft-stone/60 pt-3">
                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total Bayar</span>
                        <span>{formatCurrency(totals.grandTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-white/25 bg-white/25 p-5 shadow-soft backdrop-blur-lg">
              <p className="text-sm font-semibold">Biaya Tambahan</p>
              <div className="mt-4 space-y-3">
                <Button variant={serviceEnabled ? "secondary" : "glass"} className="w-full justify-between" onClick={() => setServiceEnabled((prev) => !prev)}>
                  <span>Service Charge</span>
                  <span>{serviceEnabled ? "On" : "Off"}</span>
                </Button>
                <Button variant={taxEnabled ? "secondary" : "glass"} className="w-full justify-between" onClick={() => setTaxEnabled((prev) => !prev)}>
                  <span>PPN</span>
                  <span>{taxEnabled ? "On" : "Off"}</span>
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/25 bg-white/25 p-5 shadow-soft backdrop-blur-lg">
              <p className="text-sm font-semibold">Metode Pembayaran</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {paymentOptions.map((method) => (
                  <Button
                    key={method}
                    variant={paymentMethod === method ? "primary" : "glass"}
                    className="h-11"
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method}
                  </Button>
                ))}
              </div>
              <div className="mt-4">
                <Input value={`Metode aktif: ${paymentMethod}`} readOnly className="bg-white/45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
