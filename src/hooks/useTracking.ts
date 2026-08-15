import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";

export type TrackingRequestState = "idle" | "loading" | "found" | "notfound" | "error";

export interface TrackingEvent {
  status: string;
  location: string;
  description: string;
  occurredAt: string;
}

export interface TrackingResult {
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string | null;
  step: number;
  events: TrackingEvent[];
}

const STATUS_STEP: Record<string, number> = {
  pending: 0,
  picked_up: 1,
  at_hub: 2,
  in_transit: 3,
  out_delivery: 4,
  delivered: 5,
};

/**
 * Single source of truth for shipment tracking, shared by the homepage
 * tracking widget and the /tracking page. Reads directly from the live
 * `shipments`/`shipment_events` tables — no mock/fallback data.
 */
export function useTracking() {
  const [state, setState] = useState<TrackingRequestState>("idle");
  const [result, setResult] = useState<TrackingResult | null>(null);

  const track = useCallback(async (rawTrackingNumber: string) => {
    const key = rawTrackingNumber.trim().toUpperCase();
    if (!key) return; // empty input — validate before querying, no request sent
    if (state === "loading") return; // duplicate-submit guard

    setState("loading");
    setResult(null);

    const { data, error } = await supabase
      .from("shipments")
      .select("*, shipment_events(*)")
      .eq("tracking_number", key)
      .maybeSingle();

    if (error) {
      console.error(error);
      setState("error");
      return;
    }

    if (!data) {
      setState("notfound");
      return;
    }

    const events: TrackingEvent[] = (data.shipment_events || [])
      .slice()
      .sort(
        (a: { occurred_at: string }, b: { occurred_at: string }) =>
          new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
      )
      .map((ev: { status: string; location?: string; description?: string; occurred_at: string }) => ({
        status: ev.status,
        location: ev.location || "",
        description: ev.description || ev.status,
        occurredAt: ev.occurred_at,
      }));

    setResult({
      trackingNumber: data.tracking_number,
      status: data.status,
      origin: data.origin,
      destination: data.destination,
      currentLocation: data.current_location || data.origin,
      estimatedDelivery: data.estimated_delivery || null,
      step: STATUS_STEP[data.status] ?? 0,
      events,
    });
    setState("found");
  }, [state]);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
  }, []);

  return { state, result, track, reset };
}
