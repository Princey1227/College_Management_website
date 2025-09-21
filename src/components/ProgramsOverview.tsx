import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Computer, 
  Wrench, 
  Briefcase, 
  FlaskConical,
  ArrowRight
} from "lucide-react";

const programs = [
  {
    category: "Undergraduate Programs",
    icon: Computer,
    programs: [
      { name: "B.E. Computer Engineering", duration: "4 Years", seats: "2000+" },
      { name: "B.E. Information Technology", duration: "4 Years", seats: "1500+" },
      { name: "B.E. Mechanical Engineering", duration: "4 Years", seats: "1800+" },
      { name: "B.E. Civil Engineering", duration: "4 Years", seats: "1200+" },
      { name: "B.E. Electrical Engineering", duration: "4 Years", seats: "1000+" }
    ],
    color: "bg-blue-500"
  },
  {
    category: "Postgraduate Programs",
    icon: FlaskConical,
    programs: [
      { name: "M.E. Computer Engineering", duration: "2 Years", seats: "500+" },
      { name: "M.Tech. Information Technology", duration: "2 Years", seats: "400+" },
      { name: "M.E. Mechanical Engineering", duration: "2 Years", seats: "300+" },
      { name: "M.E. Civil Engineering", duration: "2 Years", seats: "250+" }
    ],
    color: "bg-green-500"
  },
  {
    category: "Management Programs",
    icon: Briefcase,
    programs: [
      { name: "MBA (Marketing)", duration: "2 Years", seats: "200+" },
      { name: "MBA (Finance)", duration: "2 Years", seats: "200+" },
      { name: "MBA (HR)", duration: "2 Years", seats: "150+" },
      { name: "MBA (Operations)", duration: "2 Years", seats: "150+" }
    ],
    color: "bg-purple-500"
  },
  {
    category: "Diploma Programs",
    icon: Wrench,
    programs: [
      { name: "Diploma in Computer Engineering", duration: "3 Years", seats: "1000+" },
      { name: "Diploma in Mechanical Engineering", duration: "3 Years", seats: "800+" },
      { name: "Diploma in Civil Engineering", duration: "3 Years", seats: "600+" },
      { name: "Diploma in Electrical Engineering", duration: "3 Years", seats: "500+" }
    ],
    color: "bg-orange-500"
  }
];

const ProgramsOverview = () => {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Academic Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of undergraduate, postgraduate, and diploma programs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {programs.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.programs.map((program, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{program.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {program.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {program.seats} seats
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Programs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Apply for Admission
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsOverview;