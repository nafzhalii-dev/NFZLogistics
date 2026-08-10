import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, lang: "ar" | "en"): string {
  if (lang === "ar") {
    return num.toLocaleString("ar-SA");
  }
  return num.toLocaleString("en-US");
}

/**
 * Converts an array of objects into a downloadable CSV file.
 * @param rows   Array of plain objects (each becomes a row)
 * @param filename  Desired file name (without .csv extension)
 */
export function exportToCsv(rows: Record<string, unknown>[], filename: string): void {
  if (!rows.length) return;

  const escape = (v: unknown): string => {
    const str = v === null || v === undefined ? "" : String(v);
    // Wrap in quotes if it contains comma, newline, or double-quote
    if (str.includes(",") || str.includes("\n") || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.map(escape).join(","),
    ...rows.map(row => headers.map(h => escape(row[h])).join(",")),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    delivered: "bg-green-100 text-green-800",
    in_transit: "bg-blue-100 text-blue-800",
    out_delivery: "bg-orange-100 text-orange-800",
    at_hub: "bg-purple-100 text-purple-800",
    picked_up: "bg-sky-100 text-sky-800",
    pending: "bg-gray-100 text-gray-600",
    delayed: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-500",
  };
  return map[status] || "bg-gray-100 text-gray-600";
}
