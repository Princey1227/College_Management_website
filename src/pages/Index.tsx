import Header from "@/components/Header";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Hero from "@/Hero";
import QuickServices from "@/components/QuickServices";
import ProgramsOverview from "@/components/ProgramsOverview";
import Footer from "@/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnnouncementBanner />
      <Hero />
      <QuickServices />
      <ProgramsOverview />
      <Footer />
    </div>
  );
};

export default Index;
