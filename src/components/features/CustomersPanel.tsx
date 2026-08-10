import { useState, useEffect } from "react";
import { Plus, Download } from "lucide-react";
import { useCustomers } from "@/hooks/useCustomers";
import { Customer } from "@/lib/supabase";
import {
  Modal, FormField, inputCls, selectCls, SaveButton, ConfirmDelete,
  TableSkeleton, SearchBar, EmptyState, ActionButtons,
} from "@/components/features/AdminUI";
import { exportToCsv } from "@/lib/utils";

const SAUDI_CITIES = ["Riyadh","Jeddah","Dammam","Khobar","Makkah","Medina","Abha","Tabuk","Qassim"];
const EMPTY = { name: "", company: "", email: "", phone: "", city: "", address: "", notes: "" };

export default function CustomersPanel() {
  const { customers, loading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Customer | null>(null);
  const [deleteItem, setDeleteItem] = useState<Customer | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => fetchCustomers(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchCustomers]);

  const openCreate = () => { setForm(EMPTY); setEditItem(null); setShowForm(true); };
  const openEdit = (c: Customer) => {
    setForm({ name: c.name, company: c.company || "", email: c.email, phone: c.phone || "", city: c.city || "", address: c.address || "", notes: c.notes || "" });
    setEditItem(c); setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editItem) await updateCustomer(editItem.id, form);
    else await createCustomer(form);
    setSaving(false);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Customers</h2>
          <p className="text-gray-400 text-sm">{customers.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCsv(
              customers.map(c => ({
                "Name": c.name,
                "Company": c.company || "",
                "Email": c.email,
                "Phone": c.phone || "",
                "City": c.city || "",
                "Address": c.address || "",
                "Notes": c.notes || "",
                "Joined": new Date(c.created_at).toLocaleDateString(),
              })),
              `customers-${new Date().toISOString().slice(0,10)}`
            )}
            disabled={loading || customers.length === 0}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900 border border-gray-200 hover:border-gray-300 bg-white px-3 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={openCreate} className="bg-sgreen-600 hover:bg-sgreen-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search customers..." />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Name","Company","Email","Phone","City","Joined","Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading ? <TableSkeleton rows={5} cols={7} /> : (
              <tbody className="divide-y divide-gray-50">
                {customers.length === 0 ? <EmptyState message="No customers found" /> : customers.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-navy-900">{c.name}</td>
                    <td className="px-5 py-3.5 text-gray-600">{c.company || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{c.email}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs" dir="ltr">{c.phone || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500">{c.city || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <ActionButtons onEdit={() => openEdit(c)} onDelete={() => setDeleteItem(c)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showForm && (
        <Modal title={editItem ? "Edit Customer" : "Add Customer"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} placeholder="Customer name" />
            </FormField>
            <FormField label="Company">
              <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} className={inputCls} placeholder="Company name" />
            </FormField>
            <FormField label="Email" required>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} placeholder="email@company.sa" />
            </FormField>
            <FormField label="Phone">
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} placeholder="+966 50 xxx xxxx" />
            </FormField>
            <FormField label="City">
              <select value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={selectCls}>
                <option value="">Select city</option>
                {SAUDI_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Address">
              <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className={inputCls} placeholder="Street address" />
            </FormField>
            <div className="col-span-2">
              <FormField label="Notes">
                <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className={inputCls} rows={2} placeholder="Internal notes" />
              </FormField>
            </div>
            <div className="col-span-2">
              <SaveButton loading={saving} label={editItem ? "Save Changes" : "Add Customer"} onClose={() => setShowForm(false)} />
            </div>
          </form>
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDelete
          itemName={deleteItem.name}
          onConfirm={async () => { await deleteCustomer(deleteItem.id); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
