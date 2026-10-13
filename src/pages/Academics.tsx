import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Download, 
  Clock, 
  GraduationCap, 
  Award, 
  FileCheck, 
  Calendar,
  Building2,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const academicPrograms = [
  {
    id: "cse",
    name: "B.Tech Computer Science & Artificial Intelligence",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    intake: "240 Seats",
    eligibility: "10+2 with Physics, Mathematics & GUJCET / JEE Main score",
    description: "Covers Neural Networks, Machine Learning, Cloud Architecture, Full Stack Engineering, and Algorithms.",
    syllabus: "CBCS-2024 Scheme"
  },
  {
    id: "it",
    name: "B.Tech Information Technology",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    intake: "180 Seats",
    eligibility: "10+2 with PCM, Minimum 50% Marks",
    description: "Focus on Enterprise Software Architecture, DevOps, Database Management, and Network Security.",
    syllabus: "CBCS-2024 Scheme"
  },
  {
    id: "mech",
    name: "B.Tech Mechanical Engineering",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    eligibility: "10+2 with PCM, GUJCET Qualified",
    description: "Thermodynamics, Robotics, CAD/CAM Manufacturing, Mechatronics, and Renewable Energy Systems.",
    syllabus: "CBCS-2023 Scheme"
  },
  {
    id: "civil",
    name: "B.Tech Civil & Infrastructure Engineering",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    intake: "120 Seats",
    eligibility: "10+2 with PCM",
    description: "Structural Engineering, Smart Cities, Transportation Systems, Geo-technical, and Environmental engineering.",
    syllabus: "CBCS-2023 Scheme"
  },
  {
    id: "mtech-ds",
    name: "M.Tech Data Science & Analytics",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    intake: "60 Seats",
    eligibility: "B.E./B.Tech in CSE/IT/ECE with valid GATE / PGCET score",
    description: "Advanced Deep Learning, Big Data Hadoop/Spark ecosystem, NLP, and Predictive Business Analytics.",
    syllabus: "CBCS-2024 Scheme"
  },
  {
    id: "mtech-cyber",
    name: "M.Tech Cyber Security & Digital Forensics",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    intake: "45 Seats",
    eligibility: "B.Tech with minimum 55% & GATE qualification",
    description: "Penetration Testing, Cryptography, Blockchain Protocols, Malware Analysis, and SOC Operations.",
    syllabus: "CBCS-2024 Scheme"
  },
  {
    id: "mba",
    name: "MBA (FinTech, Business Analytics & Marketing)",
    level: "Management",
    duration: "2 Years (4 Semesters)",
    intake: "180 Seats",
    eligibility: "Graduation in any discipline + CMAT / CAT score",
    description: "Corporate Strategy, Financial Modelling, Supply Chain Optimisation, and Digital Marketing.",
    syllabus: "AICTE-2024 Scheme"
  },
  {
    id: "mca",
    name: "Master of Computer Applications (MCA)",
    level: "Management",
    duration: "2 Years (4 Semesters)",
    intake: "120 Seats",
    eligibility: "BCA / B.Sc (IT / CS) / B.Com with Mathematics",
    description: "Distributed Systems, Web Platforms, Mobile App Engineering, and Software Project Management.",
    syllabus: "CBCS-2024 Scheme"
  },
  {
    id: "dip-cs",
    name: "Diploma in Computer Engineering",
    level: "Diploma",
    duration: "3 Years (6 Semesters)",
    intake: "120 Seats",
    eligibility: "10th Standard with Mathematics & Science",
    description: "Practical programming in C/Python, Hardware Maintenance, Database basics, and Web layout.",
    syllabus: "Polytechnic Scheme"
  }
];

const calendarEvents = [
  { term: "Academic Term Commencement (Odd Sem)", date: "July 15, 2024", type: "Academics" },
  { term: "Mid-Semester Internal Assessments", date: "September 16 - 21, 2024", type: "Examination" },
  { term: "Diwali Vacation Break", date: "October 28 - November 09, 2024", type: "Holiday" },
  { term: "Winter 2024 University End-Sem Theory Exams", date: "November 25 - December 20, 2024", type: "Examination" },
  { term: "Even Semester Registration & Classes Begin", date: "January 06, 2025", type: "Academics" },
];

const Academics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const navigate = useNavigate();

  const filteredPrograms = academicPrograms.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || prog.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="bg-gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <BookOpen className="h-4 w-4 text-gtu-orange" />
            <span>CURRICULA & ACADEMIC FRAMEWORK</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Academic Programs & Syllabi
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Choice Based Credit System (CBCS) curriculum updated for industry 4.0 standards with project-based learning.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-12 flex-1 space-y-12">
        <Tabs defaultValue="programs" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto h-11">
              <TabsTrigger value="programs">Degree Programs</TabsTrigger>
              <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
              <TabsTrigger value="grading">Grading System</TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-72">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter programs or keywords..."
                  className="pl-9 h-10"
                />
              </div>
            </div>
          </div>

          {/* TAB 1: PROGRAMS */}
          <TabsContent value="programs" className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-muted-foreground mr-1">Filter Level:</span>
              {["all", "Undergraduate", "Postgraduate", "Management", "Diploma"].map((lvl) => (
                <Button
                  key={lvl}
                  variant={selectedLevel.toLowerCase() === lvl.toLowerCase() ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(lvl)}
                  className="rounded-full text-xs h-8"
                >
                  {lvl === "all" ? "All Disciplines" : lvl}
                </Button>
              ))}
            </div>

            {/* Program Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((prog) => (
                <Card key={prog.id} className="flex flex-col justify-between hover:shadow-elevated transition-all border-border bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold text-xs">
                        {prog.level}
                      </Badge>
                      <Badge variant="outline" className="text-[11px]">
                        {prog.intake}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground mt-2 leading-snug">
                      {prog.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {prog.description}
                      </p>
                      
                      <div className="text-xs space-y-1.5 pt-2 border-t border-border">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-gtu-orange" />
                          <span>Duration: <strong>{prog.duration}</strong></span>
                        </div>
                        <div className="flex items-start text-muted-foreground">
                          <GraduationCap className="h-3.5 w-3.5 mr-1.5 text-gtu-blue mt-0.5" />
                          <span>Eligibility: {prog.eligibility}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => toast.success(`Downloaded ${prog.name} Syllabus PDF`)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> Syllabus
                      </Button>
                      <Button 
                        variant="hero" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => navigate("/admissions")}
                      >
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No programs matching "{searchTerm}". Try a different search term or clear the filter.
              </div>
            )}
          </TabsContent>

          {/* TAB 2: ACADEMIC CALENDAR */}
          <TabsContent value="calendar" className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gtu-orange" />
                  Academic Calendar 2024 - 2025 (Official Notification)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="divide-y divide-border">
                  {calendarEvents.map((ev, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{ev.term}</h4>
                        <span className="text-xs text-muted-foreground font-mono">{ev.date}</span>
                      </div>
                      <Badge variant={ev.type === "Holiday" ? "secondary" : "outline"} className="text-xs">
                        {ev.type}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => toast.success("Academic Calendar 2024-25 downloaded!")}>
                    <Download className="h-4 w-4 mr-1.5" /> Download Gazetted Calendar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: GRADING SYSTEM */}
          <TabsContent value="grading" className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-gtu-blue" />
                  Choice Based Credit System (CBCS) 10-Point Grading Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs md:text-sm">
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left">
                    <thead className="bg-muted font-semibold">
                      <tr>
                        <th className="p-3">Letter Grade</th>
                        <th className="p-3">Grade Point</th>
                        <th className="p-3">Percentage Marks Equivalent</th>
                        <th className="p-3">Classification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr><td className="p-3 font-bold text-gtu-blue">AA</td><td className="p-3">10</td><td className="p-3">85% to 100%</td><td className="p-3 font-semibold text-emerald-600">Outstanding</td></tr>
                      <tr><td className="p-3 font-bold text-gtu-blue">AB</td><td className="p-3">9</td><td className="p-3">75% to 84%</td><td className="p-3">Excellent</td></tr>
                      <tr><td className="p-3 font-bold text-gtu-blue">BB</td><td className="p-3">8</td><td className="p-3">65% to 74%</td><td className="p-3">Very Good</td></tr>
                      <tr><td className="p-3 font-bold text-gtu-blue">BC</td><td className="p-3">7</td><td className="p-3">55% to 64%</td><td className="p-3">Good</td></tr>
                      <tr><td className="p-3 font-bold text-gtu-blue">CC</td><td className="p-3">6</td><td className="p-3">45% to 54%</td><td className="p-3">Fair</td></tr>
                      <tr><td className="p-3 font-bold text-gtu-blue">CD</td><td className="p-3">5</td><td className="p-3">40% to 44%</td><td className="p-3">Average / Pass</td></tr>
                      <tr><td className="p-3 font-bold text-destructive">FF</td><td className="p-3">0</td><td className="p-3">Below 40%</td><td className="p-3 font-bold text-destructive">Fail (Backlog)</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-muted/40 p-4 rounded-xl border border-border text-xs text-muted-foreground space-y-1">
                  <div>• <strong>SGPA Formula:</strong> ∑(Course Credits × Grade Points Earned) / ∑(Total Course Credits Registered)</div>
                  <div>• <strong>Degree Classification:</strong> CGPA ≥ 7.10 with no backlog confers <em>First Class with Distinction</em>.</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Academics;
