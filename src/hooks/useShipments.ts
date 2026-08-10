import { useState, useEffect, useCallback } from "react";
import { supabase, Shipment, ShipmentStatus, ServiceType } from "@/lib/supabase";
import { toast } from "sonner";

export function useShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchShipments = useCallback(async (search = "", statusFilter = "") => {
    setLoading(true);
    let query = supabase
      .from("shipments")
      .select("*, drivers(id,name,phone), vehicles(id,plate_number)", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(
        `tracking_number.ilike.%${search}%,customer_name.ilike.%${search}%,origin.ilike.%${search}%,destination.ilike.%${search}%`
      );
    }
    if (statusFilter) query = query.eq("status", statusFilter);

    const { data, error, count } = await query;
    if (error) {
      toast.error("Failed to load shipments");
      console.error(error);
    } else {
      setShipments((data as Shipment[]) || []);
      setTotal(count || 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchShipments(); }, [fetchShipments]);

  const createShipment = async (payload: Partial<Shipment>) => {
    const tracking = `NFZ-${new Date().getFullYear()}-${String(Math.floor(100000 + Math.random() * 900000))}`;
    const { data, error } = await supabase
      .from("shipments")
      .insert({ ...payload, tracking_number: tracking })
      .select()
      .single();
    if (error) { toast.error("Failed to create shipment"); return null; }
    toast.success("Shipment created successfully");
    fetchShipments();
    return data;
  };

  const updateShipment = async (id: string, updates: Partial<Shipment>) => {
    const { error } = await supabase
      .from("shipments")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) { toast.error("Failed to update shipment"); return false; }
    toast.success("Shipment updated");
    fetchShipments();
    return true;
  };

  const updateStatus = async (id: string, status: ShipmentStatus, location?: string) => {
    const { error } = await supabase
      .from("shipments")
      .update({ status, current_location: location, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) { toast.error("Failed to update status"); return false; }

    // Log the event
    await supabase.from("shipment_events").insert({
      shipment_id: id,
      status,
      location: location || "",
      description: `Status updated to ${status}`,
      occurred_at: new Date().toISOString(),
    });

    toast.success("Status updated");
    fetchShipments();
    return true;
  };

  const deleteShipment = async (id: string) => {
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) { toast.error("Failed to delete shipment"); return false; }
    toast.success("Shipment deleted");
    fetchShipments();
    return true;
  };

  return { shipments, loading, total, fetchShipments, createShipment, updateShipment, updateStatus, deleteShipment };
}
