import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Update the import path below if Input is located elsewhere, for example:
import { Input } from "@/components/ui/input";
// Or, if you do not have an Input component, you can use a native input element in your JSX instead of <Input>.
import { GraduationCap, BookOpen, Trophy, Users } from "lucide-react";
import heroImage from "@/assets/gtu-hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gtu-blue/90 to-gtu-blue-light/80"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Empowering Innovation Through
              <span className="block text-gtu-orange"> Technology Education</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Gujarat Technological University - Leading the way in technical education, 
              research, and innovation across 480+ affiliated institutes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="cta" size="lg">
                <GraduationCap className="h-5 w-5" />
                Check Results
              </Button>
              <Button variant="secondary" size="lg">
                <BookOpen className="h-5 w-5" />
                Access Library
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gtu-orange">480+</div>
                <div className="text-sm text-white/80">Affiliated Colleges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gtu-orange">50+</div>
                <div className="text-sm text-white/80">Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gtu-orange">5L+</div>
                <div className="text-sm text-white/80">Students</div>
              </div>
            </div>
          </div>

          {/* Quick Access Card */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Quick Access</h3>
                
                {/* Result Lookup */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Check Exam Results
                    </label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter your roll number"
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                      <Button variant="cta">Search</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="ghost" className="text-white border-white/30 hover:bg-white/20">
                      <Trophy className="h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="text-white border-white/30 hover:bg-white/20">
                      <Users className="h-4 w-4" />
                      Innovation
                    </Button>
                  </div>
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