export type NavItem = {
  title: string;
  href?: string;
  icon: string;
  badge?: string;
  children?: { title: string; href: string }[];
};

export type StatCard = {
  title: string;
  value: string;
  detail: string;
  trend: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  special: boolean;
  discount: number;
};

export type OrderStage = "Pramusaji" | "Dapur" | "Siap Antar" | "Selesai";

export type OrderItem = {
  id: string;
  table: string;
  customer: string;
  items: string[];
  stage: OrderStage;
  total: number;
  waiter: string;
};
