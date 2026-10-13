import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users, 
  Trophy, 
  Phone,
  Download,
  Calendar,
  Search,
  ArrowRight
} from "lucide-react";

const services = [
  {
    title: "Exam Results & Grades",
    description: "Check semester grade sheets, rechecking results, and hall tickets.",
    icon: GraduationCap,
    color: "bg-gtu-blue",
    action: "Check Results",
    path: "/results"
  },
  {
    title: "E-Library & Journals",
    description: "Access ProQuest, IEEE, Springer, Turnitin plagiarism check, and digital repo.",
    icon: BookOpen,
    color: "bg-gtu-orange",
    action: "Access Library",
    path: "/library"
  },
  {
    title: "Syllabus & Curriculum",
    description: "Download CBCS course outlines, teaching schemes, and branch-wise syllabi.",
    icon: FileText,
    color: "bg-purple-600",
    action: "Explore Syllabi",
    path: "/academics"
  },
  {
    title: "Academic Programs",
    description: "Browse 50+ degree programs across Engineering, Pharmacy, MBA, and MCA.",
    icon: Users,
    color: "bg-emerald-600",
    action: "Browse Programs",
    path: "/academics"
  },
  {
    title: "Innovation & Startups",
    description: "Student Startup Policy (SSIP), IP clinic, patent filing support, and incubators.",
    icon: Trophy,
    color: "bg-amber-600",
    action: "Learn More",
    path: "/innovation"
  },
  {
    title: "Support & Grievance",
    description: "Online student helpdesk, RTI cell, anti-ragging portal, and direct contact.",
    icon: Phone,
    color: "bg-indigo-600",
    action: "Get Help",
    path: "/contact"
  }
];

const QuickServices = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            STUDENT & FACULTY SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Essential University Services
          </h2>
          <p className="text-base text-muted-foreground mt-3">
            One-stop digital gateway for examinations, research archives, academic curricula, and university support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/70 flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3.5">
                  <div className={`p-3 rounded-xl ${service.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-1 flex-1 flex flex-col justify-between">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(service.path)}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  <span>{service.action}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Quick Actions */}
        <div className="mt-14 p-6 rounded-2xl bg-muted/40 border border-border grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate("/academics")}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-background hover:shadow-sm transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-gtu-blue/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6 text-gtu-blue" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Academic Calendar</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">2024-25 Semesters</span>
          </button>

          <button 
            onClick={() => navigate("/results")}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-background hover:shadow-sm transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-gtu-orange/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Download className="h-6 w-6 text-gtu-orange" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Forms & Circulars</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Download Portal</span>
          </button>

          <button 
            onClick={() => navigate("/academics")}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-background hover:shadow-sm transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Search className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Course Finder</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Eligibility & Codes</span>
          </button>

          <button 
            onClick={() => navigate("/contact")}
            className="flex flex-col items-center p-4 rounded-xl hover:bg-background hover:shadow-sm transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-foreground">Faculty Directory</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Deans & Mentors</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;