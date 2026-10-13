import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageLoader from "@/components/PageLoader";

// CODE-SPLIT LAZY LOADED ROUTE COMPONENTS
const Index = lazy(() => import("@/pages/Index"));
const Results = lazy(() => import("@/pages/Results"));
const Academics = lazy(() => import("@/pages/Academics"));
const Library = lazy(() => import("@/pages/Library"));
const Innovation = lazy(() => import("@/pages/Innovation"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Admissions = lazy(() => import("@/pages/Admissions"));
const StudentDashboard = lazy(() => import("@/pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/results" element={<Results />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/library" element={<Library />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admissions" element={<Admissions />} />
            
            {/* PROTECTED AUTHENTICATED ROUTES */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin", "faculty"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* CATCH-ALL 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
