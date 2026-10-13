import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative">
            <div className="text-8xl md:text-9xl font-black text-gtu-blue/15 select-none tracking-widest">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gtu-orange text-white rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <GraduationCap className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              The university page or document at <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{location.pathname}</code> does not exist or has been relocated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="hero" asChild className="w-full sm:w-auto">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" /> Return to Homepage
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/results">
                <Search className="h-4 w-4 mr-2" /> Check Exam Results
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
