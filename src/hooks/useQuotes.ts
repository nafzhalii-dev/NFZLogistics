import { useState, useEffect, useCallback } from "react";
import { supabase, Quote, QuoteStatus } from "@/lib/supabase";
import { toast } from "sonner";

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = useCallback(async (search = "", statusFilter = "") => {
    setLoading(true);
    let query = supabase.from("quotes").select("*").order("created_at", { ascending: false });
    if (search) query = query.or(`customer_name.ilike.%${search}%,reference_number.ilike.%${search}%,company_name.ilike.%${search}%`);
    if (statusFilter) query = query.eq("status", statusFilter);
    const { data, error } = await query;
    if (error) { toast.error("Failed to load quotes"); console.error(error); }
    else setQuotes(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchQuotes(); }, [fetchQuotes]);

  const updateQuoteStatus = async (id: string, status: QuoteStatus, adminNotes?: string, quotedPrice?: number) => {
    const updates: Partial<Quote> = { status, updated_at: new Date().toISOString() };
    if (adminNotes !== undefined) updates.admin_notes = adminNotes;
    if (quotedPrice !== undefined) updates.quoted_price = quotedPrice;

    const { error } = await supabase.from("quotes").update(updates).eq("id", id);
    if (error) { toast.error("Failed to update quote"); return false; }
    toast.success(`Quote ${status}`);
    fetchQuotes();
    return true;
  };

  const deleteQuote = async (id: string) => {
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) { toast.error("Failed to delete quote"); return false; }
    toast.success("Quote deleted");
    fetchQuotes();
    return true;
  };

  return { quotes, loading, fetchQuotes, updateQuoteStatus, deleteQuote };
}
