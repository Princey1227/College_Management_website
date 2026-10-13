import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { backendApi } from "@/services/mockBackend";

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "student";
  const [activeRole, setActiveRole] = useState(initialRole);
  const [username, setUsername] = useState("210010116001");
  const [password, setPassword] = useState("atharva@2024");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    if (role === "student") {
      setUsername("210010116001");
      setPassword("atharva@2024");
    } else if (role === "faculty") {
      setUsername("FAC-CS-104");
      setPassword("faculty@2024");
    } else {
      setUsername("ADMIN-DIR-01");
      setPassword("admin@atharva");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter credentials");
      return;
    }

    setLoading(true);
    const result = await backendApi.auth.login(activeRole as "student" | "faculty" | "admin", username, password);
    setLoading(false);

    if (result.success && result.user) {
      toast.success(`Welcome back, ${result.user.name}!`);
      const redirectTarget = searchParams.get("redirect");
      if (redirectTarget) {
        navigate(decodeURIComponent(redirectTarget));
      } else if (result.user.role === "admin" || result.user.role === "faculty") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error(result.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gtu-blue text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Single Sign-On Portal
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Atharva University ERP & Academic Management
            </p>
          </div>

          <Card className="border-border shadow-elevated bg-card">
            <CardHeader className="pb-4">
              <Tabs value={activeRole} onValueChange={handleRoleChange} className="w-full">
                <TabsList className="grid grid-cols-3 h-10 w-full">
                  <TabsTrigger value="student" className="text-xs">
                    <User className="h-3.5 w-3.5 mr-1" /> Student
                  </TabsTrigger>
                  <TabsTrigger value="faculty" className="text-xs">
                    <Briefcase className="h-3.5 w-3.5 mr-1" /> Faculty
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="text-xs">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {activeRole === "student" ? "Enrollment / Roll Number" : activeRole === "faculty" ? "Faculty Employee ID" : "Administrator Username"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter ID..."
                      className="pl-9 h-11 text-sm font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-foreground">Security Password</label>
                    <button 
                      type="button" 
                      onClick={() => toast.info("Password reset instructions sent to registered college email.")}
                      className="text-xs text-gtu-blue hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9 h-11 text-sm font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Auto-Fill Hint */}
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 text-xs text-muted-foreground flex items-center justify-between">
                  <span>Demo credentials pre-filled</span>
                  <Badge variant="outline" className="text-[10px] bg-background">One-Click Ready</Badge>
                </div>

                <Button type="submit" variant="cta" className="w-full h-11 font-bold text-sm" disabled={loading}>
                  {loading ? "Authenticating Session..." : `Sign In to ${activeRole.toUpperCase()} ERP`}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground space-y-2">
                <p>New Student Admission? <Link to="/admissions" className="text-gtu-blue font-semibold hover:underline">Register Online Here</Link></p>
                <p>Need Technical Assistance? <Link to="/contact" className="hover:underline">University IT Helpdesk</Link></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
