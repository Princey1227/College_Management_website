import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Results from "@/pages/Results";
import Academics from "@/pages/Academics";
import Library from "@/pages/Library";
import Innovation from "@/pages/Innovation";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Admissions from "@/pages/Admissions";
import StudentDashboard from "@/pages/StudentDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
