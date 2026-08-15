import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface VehicleStatusCounts {
  active: number;
  available: number;
  maintenance: number;
  inactive: number;
}

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  delayedShipments: number;
  pendingQuotes: number;
  totalCustomers: number;
  totalDrivers: number;
  activeVehicles: number;
  totalVehicles: number;
  vehiclesByStatus: VehicleStatusCounts;
}

const EMPTY_STATS: DashboardStats = {
  totalShipments: 0,
  activeShipments: 0,
  deliveredShipments: 0,
  delayedShipments: 0,
  pendingQuotes: 0,
  totalCustomers: 0,
  totalDrivers: 0,
  activeVehicles: 0,
  totalVehicles: 0,
  vehiclesByStatus: { active: 0, available: 0, maintenance: 0, inactive: 0 },
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [
          totalRes,
          activeRes,
          deliveredRes,
          delayedRes,
          pendingQRes,
          customersRes,
          driversRes,
          activeVehiclesRes,
          vehicleStatusRes,
        ] = await Promise.all([
          supabase.from("shipments").select("*", { count: "exact", head: true }),
          supabase.from("shipments").select("*", { count: "exact", head: true }).in("status", ["in_transit", "out_delivery", "at_hub", "picked_up"]),
          supabase.from("shipments").select("*", { count: "exact", head: true }).eq("status", "delivered"),
          supabase.from("shipments").select("*", { count: "exact", head: true }).eq("status", "delayed"),
          supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("customers").select("*", { count: "exact", head: true }),
          supabase.from("drivers").select("*", { count: "exact", head: true }).neq("status", "inactive"),
          supabase.from("vehicles").select("*", { count: "exact", head: true }).in("status", ["active", "available"]),
          // Minimum data needed for the Fleet Status breakdown — status only.
          supabase.from("vehicles").select("status"),
        ]);

        const results = [
          totalRes, activeRes, deliveredRes, delayedRes, pendingQRes,
          customersRes, driversRes, activeVehiclesRes, vehicleStatusRes,
        ];
        const firstError = results.find((r) => r.error)?.error;
        if (firstError) throw firstError;

        const vehiclesByStatus: VehicleStatusCounts = { active: 0, available: 0, maintenance: 0, inactive: 0 };
        for (const row of vehicleStatusRes.data || []) {
          const status = row.status as keyof VehicleStatusCounts;
          if (status in vehiclesByStatus) vehiclesByStatus[status]++;
        }

        if (cancelled) return;
        setStats({
          totalShipments: totalRes.count || 0,
          activeShipments: activeRes.count || 0,
          deliveredShipments: deliveredRes.count || 0,
          delayedShipments: delayedRes.count || 0,
          pendingQuotes: pendingQRes.count || 0,
          totalCustomers: customersRes.count || 0,
          totalDrivers: driversRes.count || 0,
          activeVehicles: activeVehiclesRes.count || 0,
          totalVehicles: (vehicleStatusRes.data || []).length,
          vehiclesByStatus,
        });
        setError(false);
      } catch (err) {
        console.error("Dashboard stats fetch error:", err);
        if (!cancelled) {
          setError(true);
          setStats(EMPTY_STATS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStats, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { stats, loading, error };
}
