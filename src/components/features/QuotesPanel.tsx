import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, Download } from "lucide-react";
import { useQuotes } from "@/hooks/useQuotes";
import { Quote, QuoteStatus } from "@/lib/supabase";
import {
  Modal, FormField, inputCls, selectCls, SaveButton, ConfirmDelete,
  TableSkeleton, SearchBar, EmptyState, QUOTE_STATUS_COLORS,
} from "@/components/features/AdminUI";
import { cn, exportToCsv } from "@/lib/utils";

const STATUSES: QuoteStatus[] = ["pending","reviewed","approved","rejected","converted"];

export default function QuotesPanel() {
  const { quotes, loading, fetchQuotes, updateQuoteStatus, deleteQuote } = useQuotes();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewItem, setViewItem] = useState<Quote | null>(null);
  const [reviewItem, setReviewItem] = useState<Quote | null>(null);
  const [deleteItem, setDeleteItem] = useState<Quote | null>(null);
  const [reviewForm, setReviewForm] = useState({ status: "reviewed" as QuoteStatus, admin_notes: "", quoted_price: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => fetchQuotes(search, statusFilter), 350);
    return () => clearTimeout(t);
  }, [search, statusFilter, fetchQuotes]);

  const openReview = (q: Quote) => {
    setReviewForm({ status: q.status === "pending" ? "reviewed" : q.status, admin_notes: q.admin_notes || "", quoted_price: String(q.quoted_price || "") });
    setReviewItem(q);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewItem) return;
    setSaving(true);
    await updateQuoteStatus(reviewItem.id, reviewForm.status, reviewForm.admin_notes, reviewForm.quoted_price ? Number(reviewForm.quoted_price) : undefined);
    setSaving(false);
    setReviewItem(null);
  };

  const pendingCount = quotes.filter(q => q.status === "pending").length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Quote Requests</h2>
          <p className="text-gray-400 text-sm">
            {quotes.length} total
            {pendingCount > 0 && <span className="ms-2 inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">{pendingCount} pending</span>}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={() => exportToCsv(
            quotes.map(q => ({
              "Reference": q.reference_number,
              "Customer": q.customer_name,
              "Company": q.company_name || "",
              "Email": q.email,
              "Phone": q.phone,
              "Service": q.service_type || "",
              "Shipment Type": q.shipment_type || "",
              "Pickup": q.pickup_location || "",
              "Delivery": q.delivery_location || "",
              "Weight (kg)": q.weight_kg || "",
              "Packages": q.packages_count || "",
              "Preferred Date": q.preferred_date || "",
              "Status": q.status,
              "Quoted Price (SAR)": q.quoted_price || "",
              "Admin Notes": q.admin_notes || "",
              "Submitted": new Date(q.created_at).toLocaleDateString(),
            })),
            `quotes-${new Date().toISOString().slice(0,10)}`
          )}
          disabled={loading || quotes.length === 0}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900 border border-gray-200 hover:border-gray-300 bg-white px-3 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search quotes..." />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cn(selectCls, "w-44")}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Reference","Customer","Service","Route","Weight","Status","Price (SAR)","Date","Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading ? <TableSkeleton rows={5} cols={9} /> : (
              <tbody className="divide-y divide-gray-50">
                {quotes.length === 0 ? <EmptyState message="No quotes found" /> : quotes.map(q => (
                  <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-navy-900 text-xs font-semibold">{q.reference_number}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-navy-900 text-xs">{q.customer_name}</p>
                      <p className="text-gray-400 text-xs">{q.company_name}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{q.service_type || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{q.pickup_location} → {q.delivery_location}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{q.weight_kg ? `${q.weight_kg} kg` : "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold", QUOTE_STATUS_COLORS[q.status])}>
                        {q.status.charAt(0).toUpperCase()+q.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sgreen-700 font-semibold text-xs">
                      {q.quoted_price ? `${q.quoted_price.toLocaleString()} SAR` : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(q.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewItem(q)} className="p-1.5 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => openReview(q)} className="px-3 py-1.5 text-xs text-sgreen-700 bg-sgreen-50 hover:bg-sgreen-100 rounded-lg font-medium">
                          Review
                        </button>
                        <button onClick={() => setDeleteItem(q)} className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewItem && (
        <Modal title={`Quote — ${viewItem.reference_number}`} onClose={() => setViewItem(null)} size="lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["Customer", viewItem.customer_name],
              ["Company", viewItem.company_name || "—"],
              ["Email", viewItem.email],
              ["Phone", viewItem.phone],
              ["Service", viewItem.service_type || "—"],
              ["Shipment Type", viewItem.shipment_type || "—"],
              ["Pickup", viewItem.pickup_location || "—"],
              ["Delivery", viewItem.delivery_location || "—"],
              ["Weight (kg)", String(viewItem.weight_kg || "—")],
              ["Packages", String(viewItem.packages_count || "—")],
              ["Preferred Date", viewItem.preferred_date || "—"],
              ["Submitted", new Date(viewItem.created_at).toLocaleDateString()],
            ].map(([label, val]) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                <p className="font-semibold text-navy-900">{val}</p>
              </div>
            ))}
            {viewItem.notes && (
              <div className="col-span-2 bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-0.5">Customer Notes</p>
                <p className="text-navy-900">{viewItem.notes}</p>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setViewItem(null); openReview(viewItem!); }} className="flex-1 bg-sgreen-600 hover:bg-sgreen-700 text-white rounded-lg text-sm font-semibold px-4 py-2.5 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Review & Price
            </button>
            <button onClick={() => setViewItem(null)} className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Close</button>
          </div>
        </Modal>
      )}

      {/* Review Modal */}
      {reviewItem && (
        <Modal title={`Review Quote — ${reviewItem.reference_number}`} onClose={() => setReviewItem(null)}>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
              <strong>{reviewItem.customer_name}</strong> — {reviewItem.service_type}: {reviewItem.pickup_location} → {reviewItem.delivery_location}
            </div>
            <FormField label="Update Status">
              <select value={reviewForm.status} onChange={e => setReviewForm({...reviewForm, status: e.target.value as QuoteStatus})} className={selectCls}>
                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </FormField>
            <FormField label="Quoted Price (SAR)">
              <input type="number" value={reviewForm.quoted_price} onChange={e => setReviewForm({...reviewForm, quoted_price: e.target.value})} className={inputCls} placeholder="Enter price in SAR" min="0" />
            </FormField>
            <FormField label="Admin Notes">
              <textarea value={reviewForm.admin_notes} onChange={e => setReviewForm({...reviewForm, admin_notes: e.target.value})} className={inputCls} rows={3} placeholder="Internal notes or response to customer..." />
            </FormField>
            <SaveButton loading={saving} label="Save Review" onClose={() => setReviewItem(null)} />
          </form>
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDelete
          itemName={deleteItem.reference_number}
          onConfirm={async () => { await deleteQuote(deleteItem.id); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
