import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  User, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { backendApi, UserSession, AnnouncementItem } from "@/services/mockBackend";
import { useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [notices, setNotices] = useState<AnnouncementItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(backendApi.auth.getCurrentUser());
    backendApi.announcements.getAll().then(setNotices);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Academics", path: "/academics" },
    { name: "Results", path: "/results" },
    { name: "Admissions", path: "/admissions" },
    { name: "Library", path: "/library" },
    { name: "Innovation", path: "/innovation" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    setSearchOpen(false);
    if (q.includes("result") || q.includes("grade") || q.includes("mark")) {
      navigate("/results");
    } else if (q.includes("lib") || q.includes("book") || q.includes("journal")) {
      navigate("/library");
    } else if (q.includes("course") || q.includes("syllabus") || q.includes("program")) {
      navigate("/academics");
    } else if (q.includes("innov") || q.includes("startup") || q.includes("hack")) {
      navigate("/innovation");
    } else if (q.includes("admis") || q.includes("apply") || q.includes("fee")) {
      navigate("/admissions");
    } else {
      navigate(`/results?search=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg md:text-xl font-extrabold text-gtu-blue tracking-tight">ATHARVA</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gtu-orange/15 text-gtu-orange font-bold">TECH</span>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">Technological University</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gtu-blue bg-accent font-semibold"
                      : "text-foreground/80 hover:text-gtu-blue hover:bg-muted/70"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search Dialog Trigger */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
              title="Search portal"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
                  title="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gtu-orange rounded-full animate-pulse"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <DropdownMenuLabel className="p-0 font-semibold text-sm">Notifications & Circulars</DropdownMenuLabel>
                  <span className="text-[10px] bg-gtu-orange text-white px-1.5 py-0.5 rounded-full font-bold">2 New</span>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {notices.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-2.5 rounded-lg text-xs cursor-pointer hover:bg-muted transition-colors bg-primary/5 font-medium"
                      onClick={() => navigate(item.link || "/results")}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-gtu-orange shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground leading-snug">{item.title}</p>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="w-full text-center text-xs text-gtu-blue font-semibold justify-center cursor-pointer py-1.5"
                  onClick={() => navigate("/results")}
                >
                  View All Notices
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Portal Login / Dashboard Button */}
            {currentUser ? (
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate(currentUser.role === "admin" ? "/admin" : "/dashboard")}
                className="hidden sm:inline-flex shadow-sm"
              >
                <User className="h-4 w-4 mr-1.5" />
                {currentUser.name.split(" ")[0]} ({currentUser.role.toUpperCase()})
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate("/login")}
                className="hidden sm:inline-flex shadow-sm"
              >
                <User className="h-4 w-4 mr-1.5" />
                Portal Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-gtu-blue bg-accent font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Button 
              variant="hero" 
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Student / Faculty Portal Login
            </Button>
          </div>
        </div>
      )}

      {/* Global Quick Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Search University Portal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearchSubmit} className="space-y-4 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, exam results, syllabi, e-library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                autoFocus
              />
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-muted-foreground py-1">Quick jumps:</span>
              <button 
                type="button" 
                onClick={() => { setSearchOpen(false); navigate("/results"); }} 
                className="px-2 py-1 rounded bg-muted hover:bg-accent text-foreground transition-colors"
              >
                Exam Results
              </button>
              <button 
                type="button" 
                onClick={() => { setSearchOpen(false); navigate("/academics"); }} 
                className="px-2 py-1 rounded bg-muted hover:bg-accent text-foreground transition-colors"
              >
                Syllabus
              </button>
              <button 
                type="button" 
                onClick={() => { setSearchOpen(false); navigate("/library"); }} 
                className="px-2 py-1 rounded bg-muted hover:bg-accent text-foreground transition-colors"
              >
                IEEE Journals
              </button>
              <button 
                type="button" 
                onClick={() => { setSearchOpen(false); navigate("/admissions"); }} 
                className="px-2 py-1 rounded bg-muted hover:bg-accent text-foreground transition-colors"
              >
                Admissions
              </button>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setSearchOpen(false)}>Cancel</Button>
              <Button type="submit" variant="cta">Search</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;