import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, BookOpen, Trophy, Users, Search, Award } from "lucide-react";
import heroImage from "@/assets/gtu-hero-image.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [rollNumber, setRollNumber] = useState("");
  const navigate = useNavigate();

  const handleResultSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber.trim()) {
      navigate(`/results?roll=${encodeURIComponent(rollNumber.trim())}`);
    } else {
      navigate("/results");
    }
  };

  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/25"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gtu-blue/95 via-gtu-blue/85 to-gtu-blue-light/80"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium">
              <Award className="h-4 w-4 text-gtu-orange" />
              <span>NAAC A++ Accredited State University</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Empowering Innovation Through
              <span className="block text-gtu-orange drop-shadow-sm"> Technology Education</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
              Atharva Technological University leads technical education, cutting-edge research, and startup incubation across 480+ affiliated institutes.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                variant="cta" 
                size="lg"
                onClick={() => navigate("/results")}
                className="shadow-lg hover:shadow-xl transition-all"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Check Results
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate("/library")}
                className="bg-white text-primary hover:bg-white/90 hover:text-primary font-bold shadow-md border-0"
              >
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Access Library
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => navigate("/admissions")}
                className="border-2 border-white/60 text-white hover:bg-white/20 hover:text-white font-semibold backdrop-blur-sm"
              >
                Admissions 2024-25
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-lg">
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-gtu-orange">480+</div>
                <div className="text-xs md:text-sm text-white/80">Affiliated Institutes</div>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-gtu-orange">50+</div>
                <div className="text-xs md:text-sm text-white/80">Degree Programs</div>
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-gtu-orange">500k+</div>
                <div className="text-xs md:text-sm text-white/80">Active Students</div>
              </div>
            </div>
          </div>

          {/* Quick Access Card */}
          <div className="space-y-6">
            <Card className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-2xl text-white">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">Instant Student Access</h3>
                  <p className="text-sm text-white/80 mt-1">Look up current semester grades, exam schedules, and circulars.</p>
                </div>
                
                {/* Result Lookup Form */}
                <form onSubmit={handleResultSearch} className="space-y-3">
                  <label className="block text-sm font-medium text-white/95">
                    Fast Result Verification
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 210010116001"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white focus-visible:ring-offset-0"
                    />
                    <Button type="submit" variant="cta" className="shrink-0">
                      <Search className="h-4 w-4 mr-1.5" /> Search
                    </Button>
                  </div>
                  <p className="text-xs text-white/70">
                    Try demo roll: <span className="font-mono underline cursor-pointer" onClick={() => setRollNumber("210010116001")}>210010116001</span> or <span className="font-mono underline cursor-pointer" onClick={() => setRollNumber("220020119042")}>220020119042</span>
                  </p>
                </form>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/innovation")}
                    className="text-white border border-white/20 hover:bg-white/20 justify-start"
                  >
                    <Trophy className="h-4 w-4 mr-2 text-gtu-orange" />
                    Innovation Council
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/academics")}
                    className="text-white border border-white/20 hover:bg-white/20 justify-start"
                  >
                    <Users className="h-4 w-4 mr-2 text-gtu-orange" />
                    Faculty & Syllabus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;