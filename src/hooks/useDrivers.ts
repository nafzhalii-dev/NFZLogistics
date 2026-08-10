import { useState, useEffect, useCallback } from "react";
import { supabase, Driver } from "@/lib/supabase";
import { toast } from "sonner";

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = useCallback(async (search = "") => {
    setLoading(true);
    let query = supabase.from("drivers").select("*").order("created_at", { ascending: false });
    if (search) query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    const { data, error } = await query;
    if (error) { toast.error("Failed to load drivers"); console.error(error); }
    else setDrivers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchDrivers(); }, [fetchDrivers]);

  const createDriver = async (payload: Partial<Driver>) => {
    const { data, error } = await supabase.from("drivers").insert(payload).select().single();
    if (error) { toast.error("Failed to add driver"); return null; }
    toast.success("Driver added");
    fetchDrivers();
    return data;
  };

  const updateDriver = async (id: string, updates: Partial<Driver>) => {
    const { error } = await supabase.from("drivers").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("Failed to update driver"); return false; }
    toast.success("Driver updated");
    fetchDrivers();
    return true;
  };

  const deleteDriver = async (id: string) => {
    const { error } = await supabase.from("drivers").delete().eq("id", id);
    if (error) { toast.error("Failed to delete driver"); return false; }
    toast.success("Driver deleted");
    fetchDrivers();
    return true;
  };

  return { drivers, loading, fetchDrivers, createDriver, updateDriver, deleteDriver };
}
