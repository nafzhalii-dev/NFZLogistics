import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/seo/SEO";
import { company } from "@/config/company";
import logo from "@/assets/logo.png";

interface LocationState {
  from?: { pathname: string };
}

export default function AdminLogin() {
  const { session, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as LocationState | null)?.from?.pathname || "/dashboard";

  // Already signed in — skip the login form entirely.
  if (!authLoading && session) {
    return <Navigate to={from} replace />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="ltr">
        <div className="w-8 h-8 border-2 border-sgreen-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const validate = (): string | null => {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
    if (!password) return "Password is required.";
    return null;
  };

  const friendlyError = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes("invalid")) return "Incorrect email or password.";
    if (lower.includes("confirmed")) return "This account's email hasn't been confirmed yet.";
    if (lower.includes("network") || lower.includes("fetch")) return "Network error — please try again.";
    return message;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn(email.trim(), password);

    setSubmitting(false);

    if (signInError) {
      setError(friendlyError(signInError));
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="ltr">
      <SEO title="Admin Login" description="Sign in to the NFZ Logistics admin dashboard." noindex />
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="mb-3">
            <img src={logo} alt={company.nameEn} className="h-12 w-auto object-contain" />
          </Link>
          <h1 className="font-bold text-navy-900 text-xl">NFZ Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to the logistics dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
        >
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-navy-900 mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sgreen-500 focus:border-transparent"
              placeholder="you@nfzlogistics.sa"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-navy-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={error ? true : undefined}
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 pr-10 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sgreen-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-sgreen-600 hover:bg-sgreen-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Admin access only. Contact your system administrator for an account.
        </p>
      </div>
    </div>
  );
}
