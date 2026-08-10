import { useState, useEffect, useCallback } from "react";
import { supabase, Customer } from "@/lib/supabase";
import { toast } from "sonner";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async (search = "") => {
    setLoading(true);
    let query = supabase.from("customers").select("*").order("created_at", { ascending: false });
    if (search) {
      query = query.or(`name.ilike.%${search}%,company.ilike.%${search}%,email.ilike.%${search}%`);
    }
    const { data, error } = await query;
    if (error) { toast.error("Failed to load customers"); console.error(error); }
    else setCustomers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const createCustomer = async (payload: Partial<Customer>) => {
    const { data, error } = await supabase.from("customers").insert(payload).select().single();
    if (error) { toast.error("Failed to create customer"); return null; }
    toast.success("Customer added");
    fetchCustomers();
    return data;
  };

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    const { error } = await supabase.from("customers").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("Failed to update customer"); return false; }
    toast.success("Customer updated");
    fetchCustomers();
    return true;
  };

  const deleteCustomer = async (id: string) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) { toast.error("Failed to delete customer"); return false; }
    toast.success("Customer deleted");
    fetchCustomers();
    return true;
  };

  return { customers, loading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer };
}
