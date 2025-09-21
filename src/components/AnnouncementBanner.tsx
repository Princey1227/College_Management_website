import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gtu-orange text-white shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 animate-pulse" />
            <div>
              <span className="font-semibold">Important: </span>
              <span>Summer 2024 Exam Results are now available! Winter 2024 exam schedule released.</span>
              <Button variant="link" className="text-white hover:text-white/80 p-0 ml-2 underline">
                View Details
              </Button>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;