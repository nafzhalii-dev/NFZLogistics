import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, Sector,
} from "recharts";
import {
  TrendingUp, TrendingDown, RefreshCw, Package, CheckCircle, AlertCircle,
  Clock, MapPin, Users, BarChart3, Loader2, Calendar, Target, Zap, Download, ChevronDown,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { cn, exportToCsv } from "@/lib/utils";

// ── Color constants ──────────────────────────────────────────────────────────
const NAVY = "#0A1628";
const GREEN = "#1B6B3A";
const GREEN_LIGHT = "#22c55e";
const AMBER = "#f59e0b";
const RED = "#ef4444";
const BLUE = "#3b82f6";
const PURPLE = "#8b5cf6";
const CYAN = "#06b6d4";

const SERVICE_COLORS: Record<string, string> = {
  land: NAVY,
  air: BLUE,
  sea: CYAN,
  express: GREEN,
  last_mile: PURPLE,
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#94a3b8",
  picked_up: CYAN,
  at_hub: PURPLE,
  in_transit: BLUE,
  out_delivery: AMBER,
  delivered: GREEN,
  delayed: RED,
  cancelled: "#cbd5e1",
};

const PIE_COLORS = [NAVY, GREEN, BLUE, AMBER, PURPLE, CYAN, RED, "#10b981"];

// ── Custom tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-3 text-xs">
      <p className="font-semibold text-navy-900 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-0.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-gray-500 capitalize">{p.name}:</span>
          <span className="font-semibold text-navy-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, trend }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ background: `${color}18` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && trend !== "neutral" && (
          <span className={cn("flex items-center gap-0.5 text-xs font-semibold",
            trend === "up" ? "text-green-600" : "text-red-500"
          )}>
            {trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-navy-900 mb-0.5">{value}</p>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-navy-900 text-base">{title}</h3>
      {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Range selector ────────────────────────────────────────────────────────────
function RangeSelector({ value, onChange }: { value: 7 | 14 | 30; onChange: (v: 7 | 14 | 30) => void }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200">
      {([7, 14, 30] as const).map((r) => (
        <button key={r} onClick={() => onChange(r)}
          className={cn("px-3 py-1.5 text-xs font-medium transition-colors",
            value === r ? "bg-navy-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
          )}>
          {r}d
        </button>
      ))}
    </div>
  );
}

// ── Main Analytics Panel ──────────────────────────────────────────────────────
export default function AnalyticsPanel() {
  const [range, setRange] = useState<7 | 14 | 30>(7);
  const { data, loading, refetch } = useAnalytics(range);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 text-sgreen-600 animate-spin" />
        <p className="text-gray-400 text-sm">Loading analytics data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-200" />
        <p className="font-medium text-gray-400">Could not load analytics</p>
        <button onClick={refetch} className="mt-4 text-sgreen-600 text-sm hover:underline">Retry</button>
      </div>
    );
  }

  const { summary, dailyVolume, cityPerformance, topCustomers, serviceBreakdown, statusDistribution } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Analytics</h2>
          <p className="text-gray-400 text-sm">Real-time insights from your logistics data</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <RangeSelector value={range} onChange={setRange} />
          <div className="relative group">
            <button
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-navy-900 border border-gray-200 hover:border-gray-300 bg-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" /> Export <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 hidden group-hover:block">
              {([
                { label: "Daily Volume", key: "dailyVolume", fn: () => exportToCsv((data?.dailyVolume || []).map(d => ({ Day: d.day, Date: d.date, Total: d.total, Delivered: d.delivered, Delayed: d.delayed, "In Transit": d.in_transit })), `analytics-volume-${new Date().toISOString().slice(0,10)}`) },
                { label: "City Performance", key: "city", fn: () => exportToCsv((data?.cityPerformance || []).map(c => ({ City: c.city, Shipments: c.shipments, Delivered: c.delivered, Delayed: c.delayed, "On-Time Rate (%)": c.onTimeRate })), `analytics-cities-${new Date().toISOString().slice(0,10)}`) },
                { label: "Top Customers", key: "customers", fn: () => exportToCsv((data?.topCustomers || []).map(c => ({ Customer: c.customer_name, "Total Shipments": c.total_shipments, Delivered: c.delivered, Delayed: c.delayed })), `analytics-customers-${new Date().toISOString().slice(0,10)}`) },
                { label: "Service Breakdown", key: "service", fn: () => exportToCsv((data?.serviceBreakdown || []).map(s => ({ "Service Type": s.service_type, Total: s.total, "Share (%)": s.pct })), `analytics-services-${new Date().toISOString().slice(0,10)}`) },
                { label: "Status Distribution", key: "status", fn: () => exportToCsv((data?.statusDistribution || []).map(s => ({ Status: s.status, Count: s.count, "Share (%)": s.pct })), `analytics-status-${new Date().toISOString().slice(0,10)}`) },
              ] as const).map(item => (
                <button
                  key={item.key}
                  onClick={item.fn}
                  disabled={!data}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 text-left"
                >
                  <Download className="w-3.5 h-3.5 text-gray-400" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={refetch}
            className="flex items-center gap-2 text-sm text-sgreen-600 hover:text-sgreen-700 border border-sgreen-200 hover:border-sgreen-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Package} label="Total Shipments" value={summary.totalShipments} color={NAVY} trend="neutral" />
        <StatCard icon={CheckCircle} label="Delivered" value={summary.deliveredThisMonth} sub="All time" color={GREEN} trend="up" />
        <StatCard icon={AlertCircle} label="Delayed" value={summary.delayedThisMonth} sub="All time" color={RED} trend={summary.delayedThisMonth > 2 ? "down" : "neutral"} />
        <StatCard icon={Target} label="On-Time Rate" value={`${summary.onTimeRate}%`} sub="Performance target: 95%" color={summary.onTimeRate >= 95 ? GREEN : AMBER} trend={summary.onTimeRate >= 95 ? "up" : "down"} />
        <StatCard icon={Zap} label="Avg / Day" value={summary.avgShipmentsPerDay} sub={`Last ${range} days`} color={BLUE} trend="neutral" />
        <StatCard icon={MapPin} label="Top City" value={summary.topCity} sub="By shipment volume" color={PURPLE} trend="neutral" />
      </div>

      {/* Row 1: Daily Volume + On-Time Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Daily Volume Bar Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <SectionTitle
            title="Daily Shipment Volume"
            subtitle={`Total shipments created in the last ${range} days`}
          />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dailyVolume} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GREEN} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BLUE} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey={range <= 7 ? "day" : "date"} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" name="Total" stroke={GREEN} strokeWidth={2.5} fill="url(#gradTotal)" dot={{ r: 3, fill: GREEN, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Area type="monotone" dataKey="delivered" name="Delivered" stroke={BLUE} strokeWidth={2} fill="url(#gradDelivered)" dot={false} />
              <Area type="monotone" dataKey="delayed" name="Delayed" stroke={RED} strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 justify-center">
            {[{ color: GREEN, label: "Total" }, { color: BLUE, label: "Delivered" }, { color: RED, label: "Delayed", dashed: true }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-6 h-0.5 rounded" style={{ background: l.color, borderStyle: l.dashed ? "dashed" : "solid" }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution Donut */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <SectionTitle title="Status Distribution" subtitle="All shipments by current status" />
          {statusDistribution.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-300 text-sm">No data</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {statusDistribution.map((entry, i) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number, name: string) => [val, name.replace("_", " ")]} contentStyle={{ borderRadius: 10, fontSize: 12, border: "1px solid #e5e7eb" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {statusDistribution.map((s) => (
                  <div key={s.status} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: STATUS_COLORS[s.status] || "#94a3b8" }} />
                      <span className="text-gray-600 capitalize">{s.status.replace("_", " ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy-900">{s.count}</span>
                      <span className="text-gray-400 w-8 text-right">{s.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Row 2: City Performance + Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* City Performance */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <SectionTitle title="Delivery Performance by City" subtitle="Shipment volume and on-time rate per origin city" />
          {cityPerformance.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-300 text-sm">No city data</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={cityPerformance} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={22} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="city" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="shipments" name="Total" fill={NAVY} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delivered" name="Delivered" fill={GREEN} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="delayed" name="Delayed" fill={RED} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              {/* On-time rate table */}
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">On-Time Rate by City</p>
                <div className="space-y-2.5">
                  {cityPerformance.map((c) => (
                    <div key={c.city} className="flex items-center gap-3">
                      <span className="text-xs text-gray-700 font-medium w-20 flex-shrink-0">{c.city}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${c.onTimeRate}%`, background: c.onTimeRate >= 95 ? GREEN : c.onTimeRate >= 80 ? AMBER : RED }}
                        />
                      </div>
                      <span className={cn("text-xs font-semibold w-10 text-right",
                        c.onTimeRate >= 95 ? "text-green-600" : c.onTimeRate >= 80 ? "text-amber-600" : "text-red-500"
                      )}>
                        {c.onTimeRate}%
                      </span>
                      <span className="text-gray-300 text-xs w-14 text-right">{c.shipments} ship.</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Service Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <SectionTitle title="Service Type Breakdown" subtitle="Shipments split by service category" />
          {serviceBreakdown.length === 0 ? (
            <div className="flex items-center justify-center flex-1 text-gray-300 text-sm">No data</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    dataKey="total"
                    nameKey="service_type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {serviceBreakdown.map((entry, i) => (
                      <Cell key={entry.service_type} fill={SERVICE_COLORS[entry.service_type] || PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number, name: string) => [val, name.replace("_", " ")]} contentStyle={{ borderRadius: 10, fontSize: 12, border: "1px solid #e5e7eb" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 mt-2 flex-1">
                {serviceBreakdown.map((s) => (
                  <div key={s.service_type} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: SERVICE_COLORS[s.service_type] || NAVY }} />
                    <span className="text-sm text-gray-700 capitalize flex-1">{s.service_type.replace("_", " ")}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: SERVICE_COLORS[s.service_type] || NAVY }} />
                      </div>
                      <span className="text-xs font-semibold text-navy-900 w-8 text-right">{s.pct}%</span>
                    </div>
                    <span className="text-xs text-gray-400 w-6 text-right">{s.total}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Row 3: Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-navy-900">Top Customers by Shipment Volume</h3>
            <p className="text-gray-400 text-xs mt-0.5">All-time customer ranking</p>
          </div>
          <Users className="w-5 h-5 text-gray-300" />
        </div>
        {topCustomers.length === 0 ? (
          <div className="py-16 text-center text-gray-300 text-sm">No customer data</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Rank", "Customer", "Total Shipments", "Delivered", "Delayed", "Performance"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topCustomers.map((c, i) => {
                  const onTime = c.total_shipments > 0
                    ? Math.round(((c.total_shipments - c.delayed) / c.total_shipments) * 100)
                    : 100;
                  const maxShipments = topCustomers[0]?.total_shipments || 1;
                  return (
                    <tr key={c.customer_name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                          i === 0 ? "bg-amber-100 text-amber-700" :
                          i === 1 ? "bg-gray-100 text-gray-600" :
                          i === 2 ? "bg-orange-100 text-orange-700" :
                          "bg-gray-50 text-gray-400"
                        )}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-navy-900/5 flex items-center justify-center">
                            <Users className="w-4 h-4 text-navy-900/40" />
                          </div>
                          <span className="font-medium text-navy-900">{c.customer_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-navy-900 rounded-full" style={{ width: `${(c.total_shipments / maxShipments) * 100}%` }} />
                          </div>
                          <span className="font-semibold text-navy-900">{c.total_shipments}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> {c.delivered}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center gap-1.5 font-medium", c.delayed > 0 ? "text-red-600" : "text-gray-300")}>
                          <AlertCircle className="w-3.5 h-3.5" /> {c.delayed}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{
                              width: `${onTime}%`,
                              background: onTime >= 95 ? GREEN : onTime >= 80 ? AMBER : RED
                            }} />
                          </div>
                          <span className={cn("text-xs font-semibold",
                            onTime >= 95 ? "text-green-600" : onTime >= 80 ? "text-amber-600" : "text-red-500"
                          )}>
                            {onTime}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Row 4: Volume Comparison Bar (per day side by side) */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <SectionTitle
          title="Shipment Volume Breakdown"
          subtitle={`Daily comparison of In-Transit vs Delivered vs Delayed over last ${range} days`}
        />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyVolume} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={range <= 7 ? 24 : range <= 14 ? 16 : 10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey={range <= 7 ? "day" : "date"} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Bar dataKey="in_transit" name="In Transit" fill={BLUE} radius={[3, 3, 0, 0]} stackId="a" />
            <Bar dataKey="delivered" name="Delivered" fill={GREEN} radius={[0, 0, 0, 0]} stackId="a" />
            <Bar dataKey="delayed" name="Delayed" fill={RED} radius={[3, 3, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer note */}
      <p className="text-center text-gray-300 text-xs pb-2">
        Data reflects live records from OnSpace Cloud database · Refreshed on demand
      </p>
    </div>
  );
}
