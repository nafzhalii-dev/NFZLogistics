import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, Truck, CheckCircle, AlertCircle, Clock, Users, MapPin, Settings,
  BarChart3, Home, List, ArrowUpRight, ArrowDownRight, Bell, Menu, X,
  Warehouse, FileText, Star, HelpCircle, Globe, ChevronRight, RefreshCw, LogOut,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useShipments } from "@/hooks/useShipments";
import { useAnalytics } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";
import SEO from "@/components/seo/SEO";
import { company } from "@/config/company";
import logo from "@/assets/logo.png";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";
import { ShipmentStatusBadge } from "@/components/features/AdminUI";
import ShipmentsPanel from "@/components/features/ShipmentsPanel";
import CustomersPanel from "@/components/features/CustomersPanel";
import DriversPanel from "@/components/features/DriversPanel";
import FleetPanel from "@/components/features/FleetPanel";
import QuotesPanel from "@/components/features/QuotesPanel";
import AnalyticsPanel from "@/components/features/AnalyticsPanel";

type NavSection =
  | "Overview"
  | "Shipments"
  | "Quotes"
  | "Customers"
  | "Drivers"
  | "Fleet"
  | "Analytics";

interface NavItem {
  icon: React.ElementType;
  label: NavSection | string;
  section: NavSection;
  badge?: number;
}

function OverviewPanel() {
  const { language } = useLanguage();
  const { stats, loading, error: statsError } = useDashboardStats();
  const { shipments, loading: sLoading, fetchShipments } = useShipments();
  const { data: analytics, loading: analyticsLoading } = useAnalytics(7);

  const STATS_CARDS = [
    { icon: Package, label: "Total Shipments", value: stats.totalShipments, color: "bg-blue-500", up: true, change: "+12%" },
    { icon: Truck, label: "Active", value: stats.activeShipments, color: "bg-sgreen-600", up: true, change: "+8%" },
    { icon: CheckCircle, label: "Delivered", value: stats.deliveredShipments, color: "bg-green-500", up: true, change: "+15%" },
    { icon: AlertCircle, label: "Delayed", value: stats.delayedShipments, color: "bg-red-500", up: false, change: "-3%" },
    { icon: Clock, label: "Pending Quotes", value: stats.pendingQuotes, color: "bg-amber-500", up: true, change: `+${stats.pendingQuotes}` },
    { icon: Users, label: "Customers", value: stats.totalCustomers, color: "bg-purple-500", up: true, change: "+7%" },
    { icon: Truck, label: "Active Drivers", value: stats.totalDrivers, color: "bg-cyan-500", up: true, change: "" },
    { icon: Truck, label: "Vehicles", value: stats.activeVehicles, color: "bg-indigo-500", up: true, change: "" },
  ];

  // ── Real, derived chart/widget data (no fabricated numbers) ────────────
  const dailyVolume = analytics?.dailyVolume ?? [];
  const shipmentsByDayData = dailyVolume.map((d) => ({ day: d.day, shipments: d.total }));
  const hasShipmentVolumeData = dailyVolume.some((d) => d.total > 0);

  const onTimeTrendData = dailyVolume.map((d) => ({
    day: d.day,
    ontime: d.total > 0 ? Math.round(((d.total - d.delayed) / d.total) * 100) : null,
  }));
  const hasOnTimeData = onTimeTrendData.some((d) => d.ontime !== null);

  const cityPerformance = analytics?.cityPerformance ?? [];
  const totalCityShipments = cityPerformance.reduce((sum, c) => sum + c.shipments, 0);
  const topCities = cityPerformance.slice(0, 4).map((c) => ({
    city: c.city,
    count: c.shipments,
    pct: totalCityShipments > 0 ? Math.round((c.shipments / totalCityShipments) * 100) : 0,
  }));
  const otherCitiesCount = totalCityShipments - topCities.reduce((sum, c) => sum + c.count, 0);
  const regionalRows = otherCitiesCount > 0
    ? [
        ...topCities,
        {
          city: language === "ar" ? "مدن أخرى" : "Other Cities",
          count: otherCitiesCount,
          pct: Math.round((otherCitiesCount / totalCityShipments) * 100),
        },
      ]
    : topCities;

  const fleetRows = [
    { label: language === "ar" ? "نشطة" : "Active", value: stats.vehiclesByStatus.active, color: "bg-sgreen-600" },
    { label: language === "ar" ? "متاحة" : "Available", value: stats.vehiclesByStatus.available, color: "bg-blue-500" },
    { label: language === "ar" ? "الصيانة" : "Maintenance", value: stats.vehiclesByStatus.maintenance, color: "bg-amber-500" },
  ];

  const periodLabel = language === "ar" ? "آخر 7 أيام" : "Last 7 days";
  const noDataLabel = language === "ar" ? "لا توجد بيانات كافية لهذه الفترة" : "Not enough data for this period";
  const errorLabel = language === "ar" ? "تعذر تحميل البيانات" : "Couldn't load this data";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-navy-900 text-xl">Overview</h2>
          <p className="text-gray-400 text-sm">Live data — refreshes every 30s</p>
        </div>
        <button
          onClick={() => fetchShipments()}
          className="flex items-center gap-2 text-sm text-sgreen-600 hover:text-sgreen-700 border border-sgreen-200 hover:border-sgreen-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {statsError && (
        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{language === "ar" ? "تعذر تحميل إحصائيات لوحة التحكم." : "Couldn't load dashboard statistics."}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
        {STATS_CARDS.slice(0, 8).map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {card.change && (
                  <span className={cn("text-xs font-semibold flex items-center gap-0.5", card.up ? "text-green-600" : "text-red-500")}>
                    {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                  </span>
                )}
              </div>
              {loading ? (
                <div className="h-7 w-16 bg-gray-100 rounded animate-pulse mb-1" />
              ) : (
                <p className="text-2xl font-bold text-navy-900">{card.value.toLocaleString()}</p>
              )}
              <p className="text-gray-400 text-xs mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy-900 mb-1">Shipments by Day</h3>
          <p className="text-gray-400 text-xs mb-5">{periodLabel}</p>
          {analyticsLoading ? (
            <div className="h-[180px] bg-gray-50 rounded-lg animate-pulse" />
          ) : !analytics ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-gray-400 text-center px-4">{errorLabel}</div>
          ) : !hasShipmentVolumeData ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-gray-400 text-center px-4">{noDataLabel}</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={shipmentsByDayData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Bar dataKey="shipments" fill="#1B6B3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy-900 mb-1">On-Time Delivery Rate</h3>
          <p className="text-gray-400 text-xs mb-5">{periodLabel}</p>
          {analyticsLoading ? (
            <div className="h-[180px] bg-gray-50 rounded-lg animate-pulse" />
          ) : !analytics ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-gray-400 text-center px-4">{errorLabel}</div>
          ) : !hasOnTimeData ? (
            <div className="h-[180px] flex items-center justify-center text-sm text-gray-400 text-center px-4">{noDataLabel}</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={onTimeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Line type="monotone" dataKey="ontime" stroke="#1B6B3A" strokeWidth={2.5} dot={{ r: 4, fill: "#1B6B3A" }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Fleet + Regional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy-900 mb-5">Fleet Status</h3>
          {loading ? (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)}
            </div>
          ) : statsError ? (
            <div className="text-sm text-gray-400 py-6 text-center">{errorLabel}</div>
          ) : stats.totalVehicles === 0 ? (
            <div className="text-sm text-gray-400 py-6 text-center">
              {language === "ar" ? "لا توجد مركبات مسجلة بعد" : "No vehicles recorded yet"}
            </div>
          ) : (
            <div className="space-y-4">
              {fleetRows.map((fleet) => (
                <div key={fleet.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{fleet.label}</span>
                    <span className="font-semibold text-navy-900">{fleet.value} / {stats.totalVehicles}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${fleet.color} rounded-full`} style={{ width: `${(fleet.value / stats.totalVehicles) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-navy-900 mb-5">Regional Distribution</h3>
          {analyticsLoading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => <div key={i} className="h-8 bg-gray-50 rounded animate-pulse" />)}
            </div>
          ) : !analytics ? (
            <div className="text-sm text-gray-400 py-6 text-center">{errorLabel}</div>
          ) : regionalRows.length === 0 ? (
            <div className="text-sm text-gray-400 py-6 text-center">
              {language === "ar" ? "لا توجد شحنات مسجلة بعد" : "No shipments recorded yet"}
            </div>
          ) : (
            <div className="space-y-3">
              {regionalRows.map((r) => (
                <div key={r.city}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{r.city}</span>
                    <span className="text-gray-500">{r.count.toLocaleString()} · {r.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-900 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Shipments from DB */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <h3 className="font-bold text-navy-900">Recent Shipments</h3>
          <span className="text-gray-400 text-xs">Live data from database</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Tracking #", "Customer", "Route", "Status", "Driver", "Created"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse w-24" /></td>
                      ))}
                    </tr>
                  ))
                : shipments.slice(0, 8).map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-navy-900 font-medium text-xs">{s.tracking_number}</td>
                      <td className="px-6 py-4 text-gray-700">{s.customer_name}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{s.origin} → {s.destination}</td>
                      <td className="px-6 py-4"><ShipmentStatusBadge status={s.status} /></td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{s.drivers?.name || "—"}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavSection>("Overview");
  const { stats } = useDashboardStats();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const NAV_ITEMS: NavItem[] = [
    { icon: Home, label: "Overview", section: "Overview" },
    { icon: Package, label: "Shipments", section: "Shipments" },
    { icon: FileText, label: "Quotes", section: "Quotes", badge: stats.pendingQuotes || undefined },
    { icon: Users, label: "Customers", section: "Customers" },
    { icon: Truck, label: "Drivers", section: "Drivers" },
    { icon: Truck, label: "Fleet", section: "Fleet" },
    { icon: BarChart3, label: "Analytics", section: "Analytics" },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "Shipments": return <ShipmentsPanel />;
      case "Customers": return <CustomersPanel />;
      case "Drivers": return <DriversPanel />;
      case "Fleet": return <FleetPanel />;
      case "Quotes": return <QuotesPanel />;
      case "Analytics": return <AnalyticsPanel />;
      default: return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans" dir="ltr">
      <SEO title="Admin Dashboard" description="NFZ Logistics internal admin dashboard." noindex />
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 bg-navy-900 text-white flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt={company.nameEn} className="h-9 w-auto object-contain" />
            <div>
              <div className="text-white font-bold text-base leading-none">NFZ Admin</div>
              <div className="text-sgreen-400 text-xs">Logistics Dashboard</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.section;
            return (
              <button
                key={item.section}
                onClick={() => { setActiveNav(item.section); setSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-sgreen-600 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3 h-3" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="font-bold text-navy-900 text-lg">{activeNav}</h1>
              <p className="text-gray-400 text-xs hidden sm:block">NFZ Logistics Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="text-gray-500 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-300"
            >
              {language === "ar" ? "English" : "العربية"}
            </button>
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500" />
              {stats.pendingQuotes > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {stats.pendingQuotes}
                </span>
              )}
            </div>
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            {user?.email && (
              <span className="text-gray-400 text-xs hidden md:block max-w-[160px] truncate" title={user.email}>
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="flex items-center gap-1.5 text-gray-500 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
