import { orders as defaultOrders } from "@/lib/data";
import { OrderItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stageColor: Record<string, string> = {
  Pramusaji: "bg-gradient-to-r from-[#7AA8C7]/80 to-[#7AA8C7]/60 text-white font-bold shadow-sm",
  Dapur: "bg-gradient-to-r from-[#EDC6B8]/80 to-[#EDC6B8]/60 text-soft-foreground font-bold shadow-sm",
  "Siap Antar": "bg-gradient-to-r from-[#89B9B0]/80 to-[#89B9B0]/60 text-white font-bold shadow-sm",
  Selesai: "bg-gradient-to-r from-white/60 to-white/40 text-soft-foreground font-bold shadow-sm",
};

export function OrderTimeline({ orders = defaultOrders }: { orders?: OrderItem[] }) {
  return (
    <Card className="border-2 border-[#EDC6B8]/30 bg-gradient-to-br from-[#EDC6B8]/10 to-white/5">
      <CardHeader
        title="Alur Pesanan"
        description={`Menampilkan ${orders.length} pesanan yang sesuai filter.`}
      />
      <div className="space-y-4">
        {orders.length > 0 ? orders.map((order) => (
          <div
            key={order.id}
            className="glass-muted flex flex-col gap-3 rounded-[26px] p-4 transition hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold">{order.id}</h3>
                <Badge className={stageColor[order.stage]}>{order.stage}</Badge>
              </div>
              <p className="mt-2 text-sm font-medium text-soft-slate">
                {order.customer} - {order.table} - {order.waiter}
              </p>
              <p className="mt-1 text-sm text-soft-slate">{order.items.join(", ")}</p>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-sm font-semibold text-soft-slate">Total</p>
              <p className="text-xl font-black text-[#EDC6B8]">{formatCurrency(order.total)}</p>
            </div>
          </div>
        )) : <div className="rounded-[26px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada pesanan yang cocok.</div>}
      </div>
    </Card>
  );
}
