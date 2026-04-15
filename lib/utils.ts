import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

export function includesQuery(values: Array<string | number | boolean>, query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;
  return values.some((value) => normalizeText(String(value)).includes(normalizedQuery));
}
