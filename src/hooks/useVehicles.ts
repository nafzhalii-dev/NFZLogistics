import { useState, useEffect, useCallback } from "react";
import { supabase, Vehicle } from "@/lib/supabase";
import { toast } from "sonner";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async (search = "") => {
    setLoading(true);
    let query = supabase.from("vehicles").select("*").order("created_at", { ascending: false });
    if (search) query = query.or(`plate_number.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`);
    const { data, error } = await query;
    if (error) { toast.error("Failed to load vehicles"); console.error(error); }
    else setVehicles(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  const createVehicle = async (payload: Partial<Vehicle>) => {
    const { data, error } = await supabase.from("vehicles").insert(payload).select().single();
    if (error) { toast.error("Failed to add vehicle"); return null; }
    toast.success("Vehicle added");
    fetchVehicles();
    return data;
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
    const { error } = await supabase.from("vehicles").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("Failed to update vehicle"); return false; }
    toast.success("Vehicle updated");
    fetchVehicles();
    return true;
  };

  const deleteVehicle = async (id: string) => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) { toast.error("Failed to delete vehicle"); return false; }
    toast.success("Vehicle deleted");
    fetchVehicles();
    return true;
  };

  return { vehicles, loading, fetchVehicles, createVehicle, updateVehicle, deleteVehicle };
}
