import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { backendApi } from "@/services/mockBackend";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: ("student" | "faculty" | "admin")[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const location = useLocation();
  const currentUser = backendApi.auth.getCurrentUser();

  // 1. Not authenticated -> Redirect to Login with callback
  if (!currentUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // 2. Authenticated but insufficient role permissions (e.g., student trying to access /admin)
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full text-center space-y-6 p-8 bg-card border border-border rounded-2xl shadow-elevated">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Access Restricted</h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your account ({currentUser.name}) has the role <strong className="uppercase font-mono text-primary">{currentUser.role}</strong>, which does not have authorization to view this management console.
              </p>
            </div>

            <div className="p-3 bg-muted/50 rounded-xl text-xs text-muted-foreground border border-border">
              Required Clearance: <strong className="uppercase font-mono text-foreground">{allowedRoles.join(" or ")}</strong>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to={currentUser.role === "student" ? "/dashboard" : "/"}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Return to My Portal
                </Link>
              </Button>
              <Button variant="hero" asChild className="w-full sm:w-auto">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" /> Switch Account
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 3. Authorized -> Render page
  return <>{children}</>;
};

export default ProtectedRoute;
