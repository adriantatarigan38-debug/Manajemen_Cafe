import { MenuItem, NavItem, OrderItem, StatCard } from "@/lib/types";

export const sidebarNav: NavItem[] = [
  { title: "Dashboard", href: "/", icon: "gauge-high" },
  {
    title: "Manajemen Menu",
    icon: "mug-hot",
    badge: "12",
    children: [
      { title: "Daftar Menu", href: "/menu" },
      { title: "Diskon", href: "/menu#promo" },
      { title: "Menu Spesial", href: "/menu#promo" },
    ],
  },
  {
    title: "Pesanan",
    icon: "clipboard-list",
    badge: "24",
    children: [
      { title: "Tracking Pesanan", href: "/pesanan" },
      { title: "Invoice", href: "/pesanan#invoice" },
    ],
  },
  {
    title: "Supply Bahan",
    icon: "boxes-stacked",
    children: [{ title: "Stok Bahan", href: "/#supply" }],
  },
  {
    title: "Staff & HR",
    icon: "users",
    children: [
      { title: "HR Center", href: "/staff" },
      { title: "Absensi", href: "/staff#absensi" },
      { title: "Penggajian", href: "/staff#payroll" },
    ],
  },
  { title: "Laporan Penjualan", href: "/#laporan", icon: "chart-line" },
  { title: "Identitas Cafe", href: "/identitas", icon: "file-shield" },
];

export const dashboardStats: StatCard[] = [
  { title: "Pendapatan Hari Ini", value: "Rp 8.450.000", detail: "Naik 12% dari kemarin", trend: "+12%" },
  { title: "Pesanan Aktif", value: "24 order", detail: "7 pesanan sedang di dapur", trend: "+5" },
  { title: "Bahan Hampir Habis", value: "9 item", detail: "Fokus susu oat, kopi arabika, gula palm", trend: "Restock" },
  { title: "Kepuasan Pelanggan", value: "4.8 / 5", detail: "Berdasarkan 126 ulasan minggu ini", trend: "Excellent" },
];

export const salesSeries = {
  labels: ["01 Apr", "02 Apr", "03 Apr", "04 Apr", "05 Apr", "06 Apr", "07 Apr"],
  income: [4.2, 5.4, 4.9, 6.2, 5.8, 6.5, 7.1],
  expense: [2.8, 3.0, 2.6, 3.2, 3.4, 3.6, 3.5],
};

export const menuItems: MenuItem[] = [
  { id: "M-001", name: "Sea Salt Latte", category: "Coffee", price: 32000, stock: 44, special: true, discount: 10 },
  { id: "M-002", name: "Matcha Cloud", category: "Non Coffee", price: 34000, stock: 18, special: true, discount: 15 },
  { id: "M-003", name: "Croissant Smoked Beef", category: "Pastry", price: 38000, stock: 12, special: false, discount: 0 },
  { id: "M-004", name: "Affogato Cream", category: "Dessert", price: 36000, stock: 9, special: false, discount: 5 },
];

export const orders: OrderItem[] = [
  { id: "ORD-1201", table: "A-03", customer: "Nadia", items: ["Sea Salt Latte", "French Toast"], stage: "Dapur", total: 78000, waiter: "Raka" },
  { id: "ORD-1202", table: "B-01", customer: "Arif", items: ["Matcha Cloud", "Chicken Katsu Sando"], stage: "Pramusaji", total: 86000, waiter: "Lina" },
  { id: "ORD-1203", table: "Take Away", customer: "Dina", items: ["Americano", "Butter Croissant"], stage: "Siap Antar", total: 57000, waiter: "Bima" },
  { id: "ORD-1204", table: "C-02", customer: "Reza", items: ["Iced Latte", "Pandan Cake"], stage: "Selesai", total: 69000, waiter: "Raka" },
];

export const supplyItems = [
  { name: "Biji Kopi Arabika", stock: "4 kg", status: "Menipis", supplier: "Kopi Lereng" },
  { name: "Susu Oat", stock: "6 liter", status: "Segera Restock", supplier: "Green Dairy" },
  { name: "Sirup Hazelnut", stock: "12 botol", status: "Aman", supplier: "Flavor Co." },
];

export const staffHighlights = [
  { name: "Raka", role: "Head Barista", score: "4.9", bonus: "Rp 750.000" },
  { name: "Lina", role: "Pramusaji Senior", score: "4.8", bonus: "Rp 600.000" },
  { name: "Bima", role: "Kitchen Crew", score: "4.7", bonus: "Rp 550.000" },
];
