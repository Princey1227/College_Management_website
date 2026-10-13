import Header from "@/components/Header";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Hero from "@/components/Hero";
import QuickServices from "@/components/QuickServices";
import ProgramsOverview from "@/components/ProgramsOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <AnnouncementBanner />
      <main className="flex-1">
        <Hero />
        <QuickServices />
        <ProgramsOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
