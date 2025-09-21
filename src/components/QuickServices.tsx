import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users, 
  Trophy, 
  Phone,
  Download,
  Calendar,
  Search
} from "lucide-react";

const services = [
  {
    title: "Exam Results",
    description: "Check semester results for winter/summer cycles",
    icon: GraduationCap,
    color: "bg-gtu-blue",
    action: "Check Results"
  },
  {
    title: "E-Library Access",
    description: "Access ProQuest, Sage, Springer, Turnitin",
    icon: BookOpen,
    color: "bg-gtu-orange",
    action: "Access Library"
  },
  {
    title: "Syllabus & Curriculum",
    description: "Download course outlines and syllabi",
    icon: FileText,
    color: "bg-purple-500",
    action: "Download"
  },
  {
    title: "Affiliated Colleges",
    description: "Directory of 480+ affiliated institutes",
    icon: Users,
    color: "bg-green-500",
    action: "Browse Colleges"
  },
  {
    title: "Innovation Council",
    description: "Startup bootcamps, IP clinics, open-source",
    icon: Trophy,
    color: "bg-red-500",
    action: "Learn More"
  },
  {
    title: "Support Center",
    description: "FAQ, help desk, grievance portal",
    icon: Phone,
    color: "bg-indigo-500",
    action: "Get Help"
  }
];

const QuickServices = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Quick Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all essential GTU services and resources in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${service.color} text-white`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          <Button variant="ghost" className="flex flex-col items-center p-6 h-auto">
            <Calendar className="h-8 w-8 mb-2 text-gtu-blue" />
            <span className="text-sm">Academic Calendar</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-6 h-auto">
            <Download className="h-8 w-8 mb-2 text-gtu-orange" />
            <span className="text-sm">Forms & Downloads</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-6 h-auto">
            <Search className="h-8 w-8 mb-2 text-green-500" />
            <span className="text-sm">Course Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-6 h-auto">
            <Users className="h-8 w-8 mb-2 text-purple-500" />
            <span className="text-sm">Faculty Directory</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;