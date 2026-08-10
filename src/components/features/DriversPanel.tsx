import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver, DriverStatus } from "@/lib/supabase";
import {
  Modal, FormField, inputCls, selectCls, SaveButton, ConfirmDelete,
  TableSkeleton, SearchBar, EmptyState, ActionButtons, DRIVER_STATUS_COLORS,
} from "@/components/features/AdminUI";
import { cn } from "@/lib/utils";

const SAUDI_CITIES = ["Riyadh","Jeddah","Dammam","Khobar","Makkah","Medina","Abha","Tabuk","Qassim"];
const STATUSES: DriverStatus[] = ["available","on_route","off_duty","inactive"];
const EMPTY = { name: "", phone: "", email: "", license_number: "", status: "available" as DriverStatus, city: "", notes: "" };

export default function DriversPanel() {
  const { drivers, loading, fetchDrivers, createDriver, updateDriver, deleteDriver } = useDrivers();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Driver | null>(null);
  const [deleteItem, setDeleteItem] = useState<Driver | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => fetchDrivers(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchDrivers]);

  const openCreate = () => { setForm(EMPTY); setEditItem(null); setShowForm(true); };
  const openEdit = (d: Driver) => {
    setForm({ name: d.name, phone: d.phone, email: d.email || "", license_number: d.license_number || "", status: d.status, city: d.city || "", notes: d.notes || "" });
    setEditItem(d); setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editItem) await updateDriver(editItem.id, form);
    else await createDriver(form);
    setSaving(false);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Drivers</h2>
          <p className="text-gray-400 text-sm">{drivers.length} total</p>
        </div>
        <button onClick={openCreate} className="bg-sgreen-600 hover:bg-sgreen-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search drivers..." />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Name","Phone","License #","City","Status","Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            {loading ? <TableSkeleton rows={5} cols={6} /> : (
              <tbody className="divide-y divide-gray-50">
                {drivers.length === 0 ? <EmptyState message="No drivers found" /> : drivers.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-navy-900">{d.name}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs" dir="ltr">{d.phone}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs font-mono">{d.license_number || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500">{d.city || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold", DRIVER_STATUS_COLORS[d.status] || "bg-gray-100 text-gray-600")}>
                        {d.status.replace("_"," ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <ActionButtons onEdit={() => openEdit(d)} onDelete={() => setDeleteItem(d)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showForm && (
        <Modal title={editItem ? "Edit Driver" : "Add Driver"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} placeholder="Driver name" />
            </FormField>
            <FormField label="Phone" required>
              <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} placeholder="+966 50 xxx xxxx" />
            </FormField>
            <FormField label="Email">
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} placeholder="driver@nfz.sa" />
            </FormField>
            <FormField label="License Number">
              <input value={form.license_number} onChange={e => setForm({...form, license_number: e.target.value})} className={inputCls} placeholder="SA-DL-XXXX" />
            </FormField>
            <FormField label="City">
              <select value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={selectCls}>
                <option value="">Select city</option>
                {SAUDI_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as DriverStatus})} className={selectCls}>
                {STATUSES.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
            </FormField>
            <div className="col-span-2">
              <SaveButton loading={saving} label={editItem ? "Save Changes" : "Add Driver"} onClose={() => setShowForm(false)} />
            </div>
          </form>
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDelete
          itemName={deleteItem.name}
          onConfirm={async () => { await deleteDriver(deleteItem.id); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
