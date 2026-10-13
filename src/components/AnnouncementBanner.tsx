import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { backendApi, AnnouncementItem } from "@/services/mockBackend";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState<AnnouncementItem | null>(null);

  useEffect(() => {
    backendApi.announcements.getAll().then((list) => {
      const active = list.find((a) => a.active);
      if (active) setAnnouncement(active);
    });
  }, []);

  if (!isVisible || !announcement) return null;

  return (
    <div className="bg-gtu-orange text-white shadow-sm border-b border-orange-600/30">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs md:text-sm">
            <Bell className="h-4 w-4 shrink-0 animate-pulse text-yellow-200" />
            <div className="flex flex-wrap items-center gap-x-2">
              <span className="font-bold tracking-wide uppercase text-[11px] bg-black/20 px-2 py-0.5 rounded">
                Important
              </span>
              <span>{announcement.title}: {announcement.description}</span>
              <Link 
                to={announcement.link || "/results"} 
                className="underline underline-offset-2 font-semibold hover:text-yellow-200 transition-colors inline-block"
              >
                View Details →
              </Link>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 h-7 w-7 rounded-full shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;