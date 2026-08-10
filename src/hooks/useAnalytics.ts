import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface DailyVolume {
  day: string;
  date: string;
  total: number;
  delivered: number;
  delayed: number;
  in_transit: number;
}

export interface CityPerformance {
  city: string;
  shipments: number;
  delivered: number;
  delayed: number;
  onTimeRate: number;
}

export interface TopCustomer {
  customer_name: string;
  total_shipments: number;
  delivered: number;
  delayed: number;
}

export interface ServiceBreakdown {
  service_type: string;
  total: number;
  pct: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  pct: number;
}

export interface AnalyticsData {
  dailyVolume: DailyVolume[];
  cityPerformance: CityPerformance[];
  topCustomers: TopCustomer[];
  serviceBreakdown: ServiceBreakdown[];
  statusDistribution: StatusDistribution[];
  summary: {
    totalShipments: number;
    deliveredThisMonth: number;
    delayedThisMonth: number;
    onTimeRate: number;
    avgShipmentsPerDay: number;
    topCity: string;
  };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fmtDate(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function fmtDay(d: Date) {
  return DAYS[d.getDay()];
}
function subtractDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() - n);
  return r;
}
function startOfDayISO(d: Date): string {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r.toISOString();
}

export function useAnalytics(range: 7 | 14 | 30 = 7) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const since = subtractDays(new Date(), range - 1);

      // Run all DB queries in parallel
      const [
        { data: rawShipments, error: shipErr },
        { data: cityRaw, error: cityErr },
        { data: custRaw, error: custErr },
        { data: svcRaw, error: svcErr },
        { data: stRaw, error: stErr },
      ] = await Promise.all([
        supabase
          .from("shipments")
          .select("id, status, origin, service_type, customer_name, created_at")
          .gte("created_at", startOfDayISO(since)),
        supabase.from("shipments").select("origin, status"),
        supabase.from("shipments").select("customer_name, status"),
        supabase.from("shipments").select("service_type"),
        supabase.from("shipments").select("status"),
      ]);

      if (shipErr) throw shipErr;
      if (cityErr) throw cityErr;
      if (custErr) throw custErr;
      if (svcErr) throw svcErr;
      if (stErr) throw stErr;

      // ── 1. Daily Volume ────────────────────────────────────────────
      const dailyMap: Record<string, DailyVolume> = {};
      for (let i = range - 1; i >= 0; i--) {
        const d = subtractDays(new Date(), i);
        const key = toDateKey(d);
        dailyMap[key] = { day: fmtDay(d), date: fmtDate(d), total: 0, delivered: 0, delayed: 0, in_transit: 0 };
      }
      for (const s of rawShipments || []) {
        const key = toDateKey(new Date(s.created_at));
        if (dailyMap[key]) {
          dailyMap[key].total++;
          if (s.status === "delivered") dailyMap[key].delivered++;
          if (s.status === "delayed") dailyMap[key].delayed++;
          if (["in_transit", "at_hub", "out_delivery"].includes(s.status)) dailyMap[key].in_transit++;
        }
      }
      const dailyVolume = Object.values(dailyMap);

      // ── 2. City Performance ────────────────────────────────────────
      const cityMap: Record<string, { shipments: number; delivered: number; delayed: number }> = {};
      for (const s of cityRaw || []) {
        if (!cityMap[s.origin]) cityMap[s.origin] = { shipments: 0, delivered: 0, delayed: 0 };
        cityMap[s.origin].shipments++;
        if (s.status === "delivered") cityMap[s.origin].delivered++;
        if (s.status === "delayed") cityMap[s.origin].delayed++;
      }
      const cityPerformance: CityPerformance[] = Object.entries(cityMap)
        .map(([city, v]) => ({
          city,
          ...v,
          onTimeRate: v.shipments > 0 ? Math.round(((v.shipments - v.delayed) / v.shipments) * 100) : 100,
        }))
        .sort((a, b) => b.shipments - a.shipments)
        .slice(0, 8);

      // ── 3. Top Customers ───────────────────────────────────────────
      const custMap: Record<string, TopCustomer> = {};
      for (const s of custRaw || []) {
        if (!custMap[s.customer_name]) custMap[s.customer_name] = { customer_name: s.customer_name, total_shipments: 0, delivered: 0, delayed: 0 };
        custMap[s.customer_name].total_shipments++;
        if (s.status === "delivered") custMap[s.customer_name].delivered++;
        if (s.status === "delayed") custMap[s.customer_name].delayed++;
      }
      const topCustomers = Object.values(custMap)
        .sort((a, b) => b.total_shipments - a.total_shipments)
        .slice(0, 8);

      // ── 4. Service Breakdown ───────────────────────────────────────
      const svcMap: Record<string, number> = {};
      for (const s of svcRaw || []) svcMap[s.service_type] = (svcMap[s.service_type] || 0) + 1;
      const svcTotal = Object.values(svcMap).reduce((a, b) => a + b, 0);
      const serviceBreakdown: ServiceBreakdown[] = Object.entries(svcMap)
        .map(([service_type, total]) => ({ service_type, total, pct: svcTotal > 0 ? Math.round((total / svcTotal) * 100) : 0 }))
        .sort((a, b) => b.total - a.total);

      // ── 5. Status Distribution ─────────────────────────────────────
      const stMap: Record<string, number> = {};
      for (const s of stRaw || []) stMap[s.status] = (stMap[s.status] || 0) + 1;
      const stTotal = Object.values(stMap).reduce((a, b) => a + b, 0);
      const statusDistribution: StatusDistribution[] = Object.entries(stMap)
        .map(([status, count]) => ({ status, count, pct: stTotal > 0 ? Math.round((count / stTotal) * 100) : 0 }))
        .sort((a, b) => b.count - a.count);

      // ── 6. Summary ─────────────────────────────────────────────────
      const deliveredThisMonth = stMap["delivered"] || 0;
      const delayedThisMonth = stMap["delayed"] || 0;
      const onTimeRate = stTotal > 0 ? Math.round(((stTotal - delayedThisMonth) / stTotal) * 100) : 100;
      const totalInRange = dailyVolume.reduce((sum, d) => sum + d.total, 0);
      const avgShipmentsPerDay = dailyVolume.length > 0 ? Math.round(totalInRange / dailyVolume.length) : 0;
      const topCity = cityPerformance.length > 0 ? cityPerformance[0].city : "Riyadh";

      setData({
        dailyVolume,
        cityPerformance,
        topCustomers,
        serviceBreakdown,
        statusDistribution,
        summary: { totalShipments: stTotal, deliveredThisMonth, delayedThisMonth, onTimeRate, avgShipmentsPerDay, topCity },
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
      toast.error("Failed to load analytics data");
    }
    setLoading(false);
  }, [range]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { data, loading, refetch: fetchAnalytics };
}
