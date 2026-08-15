import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/features/WhatsAppButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Tracking from "@/pages/Tracking";
import Quote from "@/pages/Quote";
import Industries from "@/pages/Industries";
import Locations from "@/pages/Locations";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Dashboard from "@/pages/Dashboard";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {/* Admin auth */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Dashboard has its own layout and requires an authenticated session */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Main site layout */}
              <Route
                path="*"
                element={
                  <>
                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-lg focus:bg-sgreen-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
                    >
                      Skip to content
                    </a>
                    <Navbar />
                    <main id="main-content" className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:slug" element={<ServiceDetails />} />
                        <Route path="/tracking" element={<Tracking />} />
                        <Route path="/quote" element={<Quote />} />
                        <Route path="/industries" element={<Industries />} />
                        <Route path="/locations" element={<Locations />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                }
              />
            </Routes>
          </div>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: { fontFamily: "IBM Plex Sans Arabic, Inter, sans-serif" },
            }}
          />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
