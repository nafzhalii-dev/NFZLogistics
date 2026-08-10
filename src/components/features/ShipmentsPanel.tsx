import { useState, useEffect } from "react";
import { Plus, Download } from "lucide-react";
import { exportToCsv } from "@/lib/utils";
import { useShipments } from "@/hooks/useShipments";
import { useDrivers } from "@/hooks/useDrivers";
import { useVehicles } from "@/hooks/useVehicles";
import { Shipment, ShipmentStatus, ServiceType } from "@/lib/supabase";
import {
  Modal, FormField, inputCls, selectCls, SaveButton, ConfirmDelete,
  ShipmentStatusBadge, TableSkeleton, SearchBar, EmptyState, ActionButtons,
} from "@/components/features/AdminUI";
import { cn } from "@/lib/utils";

const STATUSES: ShipmentStatus[] = ["pending","picked_up","at_hub","in_transit","out_delivery","delivered","delayed","cancelled"];
const SERVICES: ServiceType[] = ["land","air","sea","express","last_mile"];
const SAUDI_CITIES = ["Riyadh","Jeddah","Dammam","Khobar","Makkah","Medina","Abha","Tabuk","Qassim"];

const EMPTY_FORM = {
  customer_name: "", origin: "", destination: "", current_location: "",
  service_type: "land" as ServiceType, status: "pending" as ShipmentStatus,
  weight_kg: "", packages_count: "1", estimated_delivery: "", notes: "",
  driver_id: "", vehicle_id: "",
};

export default function ShipmentsPanel() {
  const { shipments, loading, fetchShipments, createShipment, updateShipment, updateStatus, deleteShipment } = useShipments();
  const { drivers } = useDrivers();
  const { vehicles } = useVehicles();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Shipment | null>(null);
  const [deleteItem, setDeleteItem] = useState<Shipment | null>(null);
  const [statusModal, setStatusModal] = useState<Shipment | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>("in_transit");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const t = setTimeout(() => fetchShipments(search, statusFilter), 350);
    return () => clearTimeout(t);
  }, [search, statusFilter, fetchShipments]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditItem(null); setShowForm(true); };
  const openEdit = (s: Shipment) => {
    setForm({
      customer_name: s.customer_name, origin: s.origin, destination: s.destination,
      current_location: s.current_location || "", service_type: s.service_type,
      status: s.status, weight_kg: String(s.weight_kg || ""), packages_count: String(s.packages_count || 1),
      estimated_delivery: s.estimated_delivery || "", notes: s.notes || "",
      driver_id: s.driver_id || "", vehicle_id: s.vehicle_id || "",
    });
    setEditItem(s);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : undefined,
      packages_count: form.packages_count ? Number(form.packages_count) : 1,
      driver_id: form.driver_id || undefined,
      vehicle_id: form.vehicle_id || undefined,
    };
    if (editItem) await updateShipment(editItem.id, payload);
    else await createShipment(payload);
    setSaving(false);
    setShowForm(false);
  };

  const handleUpdateStatus = async () => {
    if (!statusModal) return;
    setSaving(true);
    await updateStatus(statusModal.id, newStatus, newLocation);
    setSaving(false);
    setStatusModal(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Shipments</h2>
          <p className="text-gray-400 text-sm">{shipments.length} records</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCsv(
              shipments.map(s => ({
                "Tracking #": s.tracking_number,
                "Customer": s.customer_name,
                "Origin": s.origin,
                "Destination": s.destination,
                "Service": s.service_type,
                "Status": s.status,
                "Driver": s.drivers?.name || "",
                "Weight (kg)": s.weight_kg || "",
                "Packages": s.packages_count || "",
                "Current Location": s.current_location || "",
                "Est. Delivery": s.estimated_delivery || "",
                "Created": new Date(s.created_at).toLocaleDateString(),
                "Notes": s.notes || "",
              })),
              `shipments-${new Date().toISOString().slice(0,10)}`
            )}
            disabled={loading || shipments.length === 0}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900 border border-gray-200 hover:border-gray-300 bg-white px-3 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={openCreate} className="bg-sgreen-600 hover:bg-sgreen-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> New Shipment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search shipments..." />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={cn(selectCls, "w-44")}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Tracking #","Customer","Origin → Dest","Service","Driver","Status","Est. Delivery","Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            {loading ? <TableSkeleton rows={6} cols={8} /> : (
              <tbody className="divide-y divide-gray-50">
                {shipments.length === 0 ? <EmptyState message="No shipments found" /> : shipments.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-navy-900 text-xs font-semibold">{s.tracking_number}</td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium max-w-[130px] truncate">{s.customer_name}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">{s.origin} → {s.destination}</td>
                    <td className="px-5 py-3.5 text-gray-500 capitalize">{s.service_type.replace("_"," ")}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{s.drivers?.name || <span className="text-gray-300">—</span>}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => { setStatusModal(s); setNewStatus(s.status); setNewLocation(s.current_location || ""); }}>
                        <ShipmentStatusBadge status={s.status} />
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{s.estimated_delivery || "—"}</td>
                    <td className="px-5 py-3.5">
                      <ActionButtons onEdit={() => openEdit(s)} onDelete={() => setDeleteItem(s)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <Modal title={editItem ? `Edit ${editItem.tracking_number}` : "New Shipment"} onClose={() => setShowForm(false)} size="lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <FormField label="Customer Name" required>
              <input required value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} className={inputCls} placeholder="Company / Person" />
            </FormField>
            <FormField label="Service Type" required>
              <select value={form.service_type} onChange={e => setForm({...form, service_type: e.target.value as ServiceType})} className={selectCls}>
                {SERVICES.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
            </FormField>
            <FormField label="Origin" required>
              <select value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className={selectCls}>
                <option value="">Select city</option>
                {SAUDI_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Destination" required>
              <select value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className={selectCls}>
                <option value="">Select city</option>
                {SAUDI_CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Current Location">
              <input value={form.current_location} onChange={e => setForm({...form, current_location: e.target.value})} className={inputCls} placeholder="e.g. Riyadh Hub" />
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as ShipmentStatus})} className={selectCls}>
                {STATUSES.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
            </FormField>
            <FormField label="Weight (kg)">
              <input type="number" value={form.weight_kg} onChange={e => setForm({...form, weight_kg: e.target.value})} className={inputCls} placeholder="0" min="0" />
            </FormField>
            <FormField label="Packages">
              <input type="number" value={form.packages_count} onChange={e => setForm({...form, packages_count: e.target.value})} className={inputCls} min="1" />
            </FormField>
            <FormField label="Assign Driver">
              <select value={form.driver_id} onChange={e => setForm({...form, driver_id: e.target.value})} className={selectCls}>
                <option value="">Unassigned</option>
                {drivers.map(d => <option key={d.id} value={d.id}>{d.name} ({d.status})</option>)}
              </select>
            </FormField>
            <FormField label="Assign Vehicle">
              <select value={form.vehicle_id} onChange={e => setForm({...form, vehicle_id: e.target.value})} className={selectCls}>
                <option value="">Unassigned</option>
                {vehicles.map(v => <option key={v.id} value={v.id}>{v.plate_number} - {v.brand} {v.model}</option>)}
              </select>
            </FormField>
            <FormField label="Estimated Delivery">
              <input type="date" value={form.estimated_delivery} onChange={e => setForm({...form, estimated_delivery: e.target.value})} className={inputCls} />
            </FormField>
            <FormField label="Notes">
              <input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className={inputCls} placeholder="Optional notes" />
            </FormField>
            <div className="col-span-2">
              <SaveButton loading={saving} label={editItem ? "Save Changes" : "Create Shipment"} onClose={() => setShowForm(false)} />
            </div>
          </form>
        </Modal>
      )}

      {/* Status Update Modal */}
      {statusModal && (
        <Modal title={`Update Status — ${statusModal.tracking_number}`} onClose={() => setStatusModal(null)} size="sm">
          <div className="space-y-4">
            <FormField label="New Status">
              <select value={newStatus} onChange={e => setNewStatus(e.target.value as ShipmentStatus)} className={selectCls}>
                {STATUSES.map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
              </select>
            </FormField>
            <FormField label="Current Location">
              <input value={newLocation} onChange={e => setNewLocation(e.target.value)} className={inputCls} placeholder="e.g. Jeddah Distribution Center" />
            </FormField>
            <SaveButton loading={saving} label="Update Status" onClose={() => setStatusModal(null)} />
          </div>
        </Modal>
      )}

      {/* Confirm Delete */}
      {deleteItem && (
        <ConfirmDelete
          itemName={deleteItem.tracking_number}
          onConfirm={async () => { await deleteShipment(deleteItem.id); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)}
          loading={saving}
        />
      )}
    </div>
  );
}
