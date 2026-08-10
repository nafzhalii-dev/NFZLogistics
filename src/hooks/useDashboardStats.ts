import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  delayedShipments: number;
  pendingQuotes: number;
  totalCustomers: number;
  totalDrivers: number;
  activeVehicles: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalShipments: 0,
    activeShipments: 0,
    deliveredShipments: 0,
    delayedShipments: 0,
    pendingQuotes: 0,
    totalCustomers: 0,
    totalDrivers: 0,
    activeVehicles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [
        { count: total },
        { count: active },
        { count: delivered },
        { count: delayed },
        { count: pendingQ },
        { count: customers },
        { count: drivers },
        { count: vehicles },
      ] = await Promise.all([
        supabase.from("shipments").select("*", { count: "exact", head: true }),
        supabase.from("shipments").select("*", { count: "exact", head: true }).in("status", ["in_transit", "out_delivery", "at_hub", "picked_up"]),
        supabase.from("shipments").select("*", { count: "exact", head: true }).eq("status", "delivered"),
        supabase.from("shipments").select("*", { count: "exact", head: true }).eq("status", "delayed"),
        supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("customers").select("*", { count: "exact", head: true }),
        supabase.from("drivers").select("*", { count: "exact", head: true }).neq("status", "inactive"),
        supabase.from("vehicles").select("*", { count: "exact", head: true }).in("status", ["active", "available"]),
      ]);

      setStats({
        totalShipments: total || 0,
        activeShipments: active || 0,
        deliveredShipments: delivered || 0,
        delayedShipments: delayed || 0,
        pendingQuotes: pendingQ || 0,
        totalCustomers: customers || 0,
        totalDrivers: drivers || 0,
        activeVehicles: vehicles || 0,
      });
      setLoading(false);
    };

    fetchStats();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
}
