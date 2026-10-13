import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Computer, 
  Wrench, 
  Briefcase, 
  FlaskConical,
  ArrowRight,
  GraduationCap
} from "lucide-react";

const programs = [
  {
    category: "Undergraduate Programs",
    icon: Computer,
    description: "4-Year AICTE approved Engineering and Technology degrees",
    programs: [
      { name: "B.Tech Computer Science & AI", duration: "4 Years", seats: "2000+", code: "02" },
      { name: "B.Tech Information Technology", duration: "4 Years", seats: "1500+", code: "16" },
      { name: "B.Tech Mechanical Engineering", duration: "4 Years", seats: "1800+", code: "19" },
      { name: "B.Tech Civil Engineering", duration: "4 Years", seats: "1200+", code: "06" },
      { name: "B.Tech Electronics & Comm.", duration: "4 Years", seats: "1000+", code: "11" }
    ],
    color: "bg-blue-600"
  },
  {
    category: "Postgraduate & Research",
    icon: FlaskConical,
    description: "Specialized Masters and Ph.D research programmes",
    programs: [
      { name: "M.Tech Data Science & AI", duration: "2 Years", seats: "500+", code: "51" },
      { name: "M.Tech Cybersecurity", duration: "2 Years", seats: "400+", code: "54" },
      { name: "M.Tech Thermal Engineering", duration: "2 Years", seats: "300+", code: "21" },
      { name: "M.Tech Structural Engineering", duration: "2 Years", seats: "250+", code: "20" }
    ],
    color: "bg-emerald-600"
  },
  {
    category: "Management & Applications",
    icon: Briefcase,
    description: "Executive and regular postgraduate professional programmes",
    programs: [
      { name: "MBA (FinTech & Business Analytics)", duration: "2 Years", seats: "350+", code: "81" },
      { name: "MBA (Supply Chain & Logistics)", duration: "2 Years", seats: "250+", code: "82" },
      { name: "MCA (Cloud & Enterprise Software)", duration: "2 Years", seats: "400+", code: "85" },
      { name: "MBA (Marketing & Brand Management)", duration: "2 Years", seats: "200+", code: "83" }
    ],
    color: "bg-purple-600"
  },
  {
    category: "Polytechnic & Diploma",
    icon: Wrench,
    description: "Technical diploma courses for foundational engineering",
    programs: [
      { name: "Diploma Computer Engineering", duration: "3 Years", seats: "1000+", code: "07" },
      { name: "Diploma Mechanical Engineering", duration: "3 Years", seats: "800+", code: "09" },
      { name: "Diploma Electrical Engineering", duration: "3 Years", seats: "600+", code: "10" },
      { name: "Diploma Chemical Engineering", duration: "3 Years", seats: "500+", code: "05" }
    ],
    color: "bg-amber-600"
  }
];

const ProgramsOverview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-accent/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-gtu-blue/10 text-gtu-blue text-xs font-semibold mb-3">
            ACADEMIC EXCELLENCE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Academic Degrees & Programs
          </h2>
          <p className="text-base text-muted-foreground mt-3">
            Explore industry-aligned curricula designed by leading technologists and academic researchers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {programs.map((category, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow border-border/80 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3.5">
                  <div className={`p-3 rounded-xl ${category.color} text-white shadow-sm`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{category.category}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2.5">
                  {category.programs.map((program, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => navigate("/academics")}
                      className="flex items-center justify-between p-3 bg-muted/40 hover:bg-muted rounded-xl transition-colors cursor-pointer group"
                    >
                      <div>
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-gtu-blue transition-colors">
                          {program.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-[11px] font-medium bg-background">
                            {program.duration}
                          </Badge>
                          <Badge variant="outline" className="text-[11px] text-muted-foreground">
                            {program.seats} intake
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-gtu-blue group-hover:translate-x-1 transition-all">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/academics")}
                  className="w-full mt-2 font-medium"
                >
                  View All Curriculum & Syllabi
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate("/admissions")}
            className="shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Apply for Admission 2024-25
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/academics")}
            className="w-full sm:w-auto"
          >
            Download Academic Prospectus
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverview;