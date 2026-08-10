import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ title, onClose, children, size = "md" }: ModalProps) {
  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={cn("bg-white rounded-2xl shadow-2xl w-full overflow-hidden", widths[size])}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-navy-900 text-lg">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sgreen-600/30 focus:border-sgreen-600 transition-all bg-white";
export const selectCls = inputCls;

interface SaveButtonProps {
  loading?: boolean;
  label?: string;
  onClose: () => void;
}

export function SaveButton({ loading, label = "Save", onClose }: SaveButtonProps) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        Cancel
      </button>
      <button type="submit" disabled={loading} className="flex-1 bg-sgreen-600 hover:bg-sgreen-700 disabled:opacity-60 text-white rounded-lg text-sm font-semibold px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {label}
      </button>
    </div>
  );
}

interface ConfirmDeleteProps {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

export function ConfirmDelete({ itemName, onConfirm, onClose, loading }: ConfirmDeleteProps) {
  return (
    <Modal title="Confirm Delete" onClose={onClose} size="sm">
      <p className="text-gray-600 mb-6 text-sm">
        Are you sure you want to delete <strong className="text-navy-900">{itemName}</strong>? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={onConfirm} disabled={loading} className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white rounded-lg text-sm font-semibold px-4 py-2.5 flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Delete
        </button>
      </div>
    </Modal>
  );
}

interface StatusBadgeProps {
  status: string;
  labels?: Record<string, string>;
  colors?: Record<string, string>;
}

const DEFAULT_SHIPMENT_COLORS: Record<string, string> = {
  in_transit: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  out_delivery: "bg-orange-100 text-orange-700",
  at_hub: "bg-purple-100 text-purple-700",
  pending: "bg-gray-100 text-gray-600",
  delayed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-200 text-gray-500",
  picked_up: "bg-sky-100 text-sky-700",
};

const DEFAULT_SHIPMENT_LABELS: Record<string, string> = {
  in_transit: "In Transit", delivered: "Delivered", out_delivery: "Out for Delivery",
  at_hub: "At Hub", pending: "Pending", delayed: "Delayed", cancelled: "Cancelled", picked_up: "Picked Up",
};

export function ShipmentStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold", DEFAULT_SHIPMENT_COLORS[status] || "bg-gray-100 text-gray-600")}>
      {DEFAULT_SHIPMENT_LABELS[status] || status}
    </span>
  );
}

export const DRIVER_STATUS_COLORS: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  on_route: "bg-blue-100 text-blue-700",
  off_duty: "bg-gray-100 text-gray-600",
  inactive: "bg-red-100 text-red-700",
};

export const VEHICLE_STATUS_COLORS: Record<string, string> = {
  active: "bg-blue-100 text-blue-700",
  available: "bg-green-100 text-green-700",
  maintenance: "bg-amber-100 text-amber-700",
  inactive: "bg-red-100 text-red-700",
};

export const QUOTE_STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  converted: "bg-purple-100 text-purple-700",
};

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-gray-50">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-5 py-4">
              <div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sgreen-600/30 focus:border-sgreen-600 w-64"
    />
  );
}

export function EmptyState({ message = "No data found" }: { message?: string }) {
  return (
    <tr>
      <td colSpan={20} className="px-6 py-16 text-center text-gray-400 text-sm">{message}</td>
    </tr>
  );
}

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onEdit} className="px-3 py-1.5 text-xs text-sgreen-700 bg-sgreen-50 hover:bg-sgreen-100 rounded-lg transition-colors font-medium">
        Edit
      </button>
      <button onClick={onDelete} className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium">
        Delete
      </button>
    </div>
  );
}
