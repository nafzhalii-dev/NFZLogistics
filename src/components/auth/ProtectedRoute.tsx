import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="ltr">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sgreen-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
