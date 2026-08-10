import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ───────────────────────────────────────────────────────────────────

export type ShipmentStatus =
  | "pending"
  | "picked_up"
  | "at_hub"
  | "in_transit"
  | "out_delivery"
  | "delivered"
  | "delayed"
  | "cancelled";

export type DriverStatus = "available" | "on_route" | "off_duty" | "inactive";
export type VehicleStatus = "active" | "available" | "maintenance" | "inactive";
export type QuoteStatus = "pending" | "reviewed" | "approved" | "rejected" | "converted";
export type ServiceType = "land" | "air" | "sea" | "express" | "last_mile";
export type VehicleType = "truck" | "van" | "pickup" | "trailer" | "refrigerated";

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  license_number?: string;
  status: DriverStatus;
  city?: string;
  vehicle_id?: string;
  joined_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  plate_number: string;
  type: VehicleType;
  brand?: string;
  model?: string;
  year?: number;
  capacity_kg?: number;
  status: VehicleStatus;
  city?: string;
  driver_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  customer_id?: string;
  customer_name: string;
  origin: string;
  destination: string;
  current_location?: string;
  service_type: ServiceType;
  status: ShipmentStatus;
  weight_kg?: number;
  packages_count?: number;
  driver_id?: string;
  vehicle_id?: string;
  estimated_delivery?: string;
  actual_delivery?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  // joined
  drivers?: Pick<Driver, "id" | "name" | "phone"> | null;
  vehicles?: Pick<Vehicle, "id" | "plate_number"> | null;
}

export interface ShipmentEvent {
  id: string;
  shipment_id: string;
  status: string;
  location?: string;
  description?: string;
  occurred_at: string;
}

export interface Quote {
  id: string;
  reference_number: string;
  customer_name: string;
  company_name?: string;
  email: string;
  phone: string;
  service_type?: string;
  pickup_location?: string;
  delivery_location?: string;
  shipment_type?: string;
  weight_kg?: number;
  packages_count?: number;
  preferred_date?: string;
  notes?: string;
  status: QuoteStatus;
  admin_notes?: string;
  quoted_price?: number;
  created_at: string;
  updated_at: string;
}
