import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useVehicles } from "@/hooks/useVehicles";
import { Vehicle, VehicleStatus, VehicleType } from "@/lib/supabase";
import {
  Modal, FormField, inputCls, selectCls, SaveButton, ConfirmDelete,
  TableSkeleton, SearchBar, EmptyState, ActionButtons, VEHICLE_STATUS_COLORS,
} from "@/components/features/AdminUI";
import { cn } from "@/lib/utils";

const SAUDI_CITIES = ["Riyadh","Jeddah","Dammam","Khobar","Makkah","Medina","Abha","Tabuk","Qassim"];
const STATUSES: VehicleStatus[] = ["active","available","maintenance","inactive"];
const TYPES: VehicleType[] = ["truck","van","pickup","trailer","refrigerated"];
const EMPTY = { plate_number:"",type:"truck" as VehicleType,brand:"",model:"",year:"",capacity_kg:"",status:"available" as VehicleStatus,city:"",notes:"" };

export default function FleetPanel() {
  const { vehicles, loading, fetchVehicles, createVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Vehicle | null>(null);
  const [deleteItem, setDeleteItem] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => fetchVehicles(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchVehicles]);

  const openCreate = () => { setForm(EMPTY); setEditItem(null); setShowForm(true); };
  const openEdit = (v: Vehicle) => {
    setForm({ plate_number: v.plate_number, type: v.type, brand: v.brand||"", model: v.model||"", year: String(v.year||""), capacity_kg: String(v.capacity_kg||""), status: v.status, city: v.city||"", notes: v.notes||"" });
    setEditItem(v); setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, year: form.year ? Number(form.year) : undefined, capacity_kg: form.capacity_kg ? Number(form.capacity_kg) : undefined };
    if (editItem) await updateVehicle(editItem.id, payload);
    else await createVehicle(payload);
    setSaving(false);
    setShowForm(false);
  };

  // Group by status
  const statusCounts = vehicles.reduce((acc, v) => { acc[v.status] = (acc[v.status]||0)+1; return acc; }, {} as Record<string,number>);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Fleet Management</h2>
          <p className="text-gray-400 text-sm">{vehicles.length} vehicles</p>
        </div>
        <button onClick={openCreate} className="bg-sgreen-600 hover:bg-sgreen-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Fleet Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STATUSES.map(s => (
          <div key={s} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-navy-900">{statusCounts[s] || 0}</p>
            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-1", VEHICLE_STATUS_COLORS[s])}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search vehicles..." />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Plate #","Type","Brand / Model","Year","Capacity (kg)","City","Status","Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading ? <TableSkeleton rows={5} cols={8} /> : (
              <tbody className="divide-y divide-gray-50">
                {vehicles.length === 0 ? <EmptyState message="No vehicles found" /> : vehicles.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-navy-900 font-semibold text-xs">{v.plate_number}</td>
                    <td className="px-5 py-3.5 text-gray-600 capitalize">{v.type}</td>
                    <td className="px-5 py-3.5 text-gray-600">{v.brand} {v.model}</td>
                    <td className="px-5 py-3.5 text-gray-500">{v.year || "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500">{v.capacity_kg ? v.capacity_kg.toLocaleString() : "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500">{v.city || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold", VEHICLE_STATUS_COLORS[v.status])}>
                        {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <ActionButtons onEdit={() => openEdit(v)} onDelete={() => setDeleteItem(v)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showForm && (
        <Modal title={editItem ? "Edit Vehicle" : "Add Vehicle"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <FormField label="Plate Number" required>
              <input required value={form.plate_number} onChange={e => setForm({...form, plate_number: e.target.value})} className={inputCls} placeholder="ر ح ن XXXX" />
            </FormField>
            <FormField label="Type" required>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value as VehicleType})} className={selectCls}>
                {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </FormField>
            <FormField label="Brand">
              <input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className={inputCls} placeholder="Mercedes, Volvo..." />
            </FormField>
            <FormField label="Model">
              <input value={form.model} onChange={e => setForm({...form, model: e.target.value})} className={inputCls} placeholder="Actros, FH16..." />
            </FormField>
            <FormField label="Year">
              <input type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className={inputCls} placeholder="2023" min="2000" max="2030" />
            </FormField>
            <FormField label="Capacity (kg)">
              <input type="number" value={form.capacity_kg} onChange={e => setForm({...form, capacity_kg: e.target.value})} className={inputCls} placeholder="20000" min="0" />
            </FormField>
            <FormField label="City">
              <select value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={selectCls}>
                <option value="">Select city</option>
                {SAUDI_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as VehicleStatus})} className={selectCls}>
                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </FormField>
            <div className="col-span-2">
              <SaveButton loading={saving} label={editItem ? "Save Changes" : "Add Vehicle"} onClose={() => setShowForm(false)} />
            </div>
          </form>
        </Modal>
      )}

      {deleteItem && (
        <ConfirmDelete
          itemName={deleteItem.plate_number}
          onConfirm={async () => { await deleteVehicle(deleteItem.id); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
