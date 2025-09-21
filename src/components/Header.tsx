import { Button } from "@/components/ui/button";
import { Bell, User, Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">GTU</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gtu-blue">Gujarat Technological University</h1>
                <p className="text-xs text-muted-foreground">Excellence in Technology Education</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Home</a>
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Academics</a>
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Results</a>
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Library</a>
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Innovation</a>
            <a href="#" className="text-foreground hover:text-gtu-blue transition-colors">Contact</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="hero" size="sm">
              <User className="h-4 w-4" />
              Login
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;