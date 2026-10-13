import { GraduationCap } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center text-white shadow-xl animate-pulse">
          <GraduationCap className="h-8 w-8" />
        </div>
        <div className="absolute -inset-1 rounded-2xl border-2 border-gtu-orange/40 animate-ping opacity-30"></div>
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-foreground tracking-wide">ATHARVA TECH UNIVERSITY</h3>
        <p className="text-xs text-muted-foreground animate-pulse">Loading academic resources...</p>
      </div>
    </div>
  );
};

export default PageLoader;
