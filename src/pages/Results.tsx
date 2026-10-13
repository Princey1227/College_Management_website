import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Download, 
  Printer, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  FileText,
  FileCheck
} from "lucide-react";
import { toast } from "sonner";

import { backendApi, StudentResult } from "@/services/mockBackend";

const examTimetable = [
  { course: "B.Tech Sem 7 & 8 (Remedial/Regular)", date: "Nov 25, 2024", status: "Published", link: "#" },
  { course: "M.Tech Sem 3 & 4 (Regular)", date: "Dec 02, 2024", status: "Published", link: "#" },
  { course: "MBA Sem 1 to 4 (Winter 2024)", date: "Dec 08, 2024", status: "Drafting", link: "#" },
  { course: "Diploma Engineering Sem 5 & 6", date: "Nov 28, 2024", status: "Published", link: "#" },
];

const Results = () => {
  const [searchParams] = useSearchParams();
  const [rollInput, setRollInput] = useState("");
  const [searchedRoll, setSearchedRoll] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const rollFromQuery = searchParams.get("roll");
    if (rollFromQuery) {
      setRollInput(rollFromQuery);
      handleSearch(rollFromQuery);
    }
  }, [searchParams]);

  const handleSearch = async (roll: string) => {
    const cleaned = roll.trim();
    if (!cleaned) {
      toast.error("Please enter a valid Roll Number or Enrollment No.");
      return;
    }
    setIsSearching(true);
    setSearchedRoll(cleaned);
    const found = await backendApi.results.getByRoll(cleaned);
    setIsSearching(false);
    if (found) {
      setSelectedResult(found);
      toast.success("Result fetched from university database!");
    } else {
      setSelectedResult(null);
      toast.info("Result not found. Try demo roll numbers: 210010116001 or 220020119042, or publish one in /admin!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-hero text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <GraduationCap className="h-4 w-4 text-gtu-orange" />
            <span>OFFICIAL EXAMINATION PORTAL</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Examination Results & Marksheets
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mt-3 text-sm md:text-base">
            Check your semester grades, download provisional transcripts, and view re-checking schedules.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(rollInput);
              }} 
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value)}
                placeholder="Enter 12-Digit Enrollment / Roll Number..."
                className="bg-white text-slate-900 placeholder:text-slate-500 h-12 text-base font-mono"
              />
              <Button type="submit" variant="cta" className="h-12 px-6 shrink-0 font-bold shadow-md">
                <Search className="h-4 w-4 mr-2" /> Check Result
              </Button>
            </form>
            <div className="flex items-center justify-center gap-2 text-xs text-white/80 mt-2.5">
              <span>Quick Demo Rolls:</span>
              <button 
                type="button"
                onClick={() => { setRollInput("210010116001"); handleSearch("210010116001"); }}
                className="font-mono underline hover:text-gtu-orange"
              >
                210010116001
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => { setRollInput("220020119042"); handleSearch("220020119042"); }}
                className="font-mono underline hover:text-gtu-orange"
              >
                220020119042
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <Tabs defaultValue="results" className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto h-11">
            <TabsTrigger value="results">Result Card</TabsTrigger>
            <TabsTrigger value="timetable">Exam Schedule</TabsTrigger>
            <TabsTrigger value="rechecking">Re-checking</TabsTrigger>
          </TabsList>

          {/* TAB 1: RESULTS */}
          <TabsContent value="results" className="space-y-6">
            {selectedResult ? (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-semibold text-foreground">Verified Official Grade Card</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="h-4 w-4 mr-1.5" /> Print
                    </Button>
                    <Button variant="default" size="sm" onClick={() => toast.success("Provisional grade sheet downloaded!")}>
                      <Download className="h-4 w-4 mr-1.5" /> Download PDF
                    </Button>
                  </div>
                </div>

                {/* Marksheet Card */}
                <Card className="border-2 border-border shadow-lg overflow-hidden bg-card">
                  {/* Marksheet Header */}
                  <div className="bg-gtu-blue text-white p-6 border-b border-border text-center relative">
                    <div className="text-xs uppercase tracking-widest text-gtu-orange font-bold">Atharva Technological University</div>
                    <h2 className="text-xl md:text-2xl font-black mt-1">STATEMENT OF MARKS & GRADES</h2>
                    <p className="text-xs text-white/80 mt-1">{selectedResult.examSession} • Regular Examination</p>
                  </div>

                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* Student Metadata Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm bg-muted/40 p-4 rounded-xl border border-border">
                      <div>
                        <span className="text-muted-foreground block">Student Full Name:</span>
                        <strong className="text-foreground text-base">{selectedResult.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Enrollment / Roll No:</span>
                        <strong className="text-foreground text-base font-mono">{selectedResult.rollNo}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Degree & Branch:</span>
                        <span className="font-semibold text-foreground">{selectedResult.course} - {selectedResult.branch}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Institute:</span>
                        <span className="font-semibold text-foreground">{selectedResult.institute}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Semester & Session:</span>
                        <span className="font-semibold text-foreground">{selectedResult.semester} ({selectedResult.declarationDate})</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Result Status:</span>
                        <Badge className="bg-emerald-600 text-white font-bold">{selectedResult.status}</Badge>
                      </div>
                    </div>

                    {/* Subject Grades Table */}
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-muted/70 text-foreground font-semibold border-b border-border">
                          <tr>
                            <th className="p-3">Code</th>
                            <th className="p-3">Subject Name</th>
                            <th className="p-3 text-center">Credits</th>
                            <th className="p-3 text-center">Theory</th>
                            <th className="p-3 text-center">Practical</th>
                            <th className="p-3 text-center">Total</th>
                            <th className="p-3 text-center font-bold">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {selectedResult.subjects.map((sub, idx) => (
                            <tr key={idx} className="hover:bg-muted/20">
                              <td className="p-3 font-mono font-medium text-gtu-blue">{sub.code}</td>
                              <td className="p-3 font-medium text-foreground">{sub.name}</td>
                              <td className="p-3 text-center">{sub.credits}</td>
                              <td className="p-3 text-center">{sub.external}</td>
                              <td className="p-3 text-center">{sub.internal}</td>
                              <td className="p-3 text-center font-semibold">{sub.total}/100</td>
                              <td className="p-3 text-center">
                                <Badge variant="secondary" className="font-bold text-xs">
                                  {sub.grade}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Result Summary Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">Current SGPA</div>
                        <div className="text-2xl md:text-3xl font-black text-gtu-blue">{selectedResult.sgpa}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Cumulative CGPA</div>
                        <div className="text-2xl md:text-3xl font-black text-gtu-blue">{selectedResult.cgpa}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Total Backlogs</div>
                        <div className="text-2xl md:text-3xl font-black text-emerald-600">0</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Final Division</div>
                        <div className="text-sm md:text-base font-bold text-foreground mt-1">FIRST CLASS WITH DIST.</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-muted-foreground border-t border-border pt-4 text-center">
                      Note: This is an electronically generated provisional result for informational purposes. The original grade card will be issued by your affiliated college.
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : searchedRoll ? (
              <Card className="max-w-md mx-auto text-center p-8 border-dashed">
                <AlertCircle className="h-12 w-12 text-gtu-orange mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground">No Result Record Found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We couldn't locate enrollment <strong className="font-mono">{searchedRoll}</strong> for this session.
                </p>
                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  Try viewing demo student results:
                  <div className="flex justify-center gap-3 mt-2 font-mono">
                    <Button variant="outline" size="sm" onClick={() => { setRollInput("210010116001"); handleSearch("210010116001"); }}>
                      Aarav Patel (210010116001)
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { setRollInput("220020119042"); handleSearch("220020119042"); }}>
                      Priya Sharma (220020119042)
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-16 h-16 bg-gtu-blue/10 text-gtu-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Look Up Student Examination Result</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Enter your 12-digit university roll number above to instantly generate your verified marksheet with SGPA, CGPA, and subject credits.
                </p>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: TIMETABLES */}
          <TabsContent value="timetable" className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gtu-blue" />
                  Upcoming Examination Schedules (Winter 2024)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {examTimetable.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{item.course}</h4>
                        <span className="text-xs text-muted-foreground">Tentative Start: {item.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">{item.status}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast.success(`Downloaded timetable for ${item.course}`)}
                        >
                          <Download className="h-4 w-4 mr-1 text-gtu-orange" /> PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: RE-CHECKING */}
          <TabsContent value="rechecking" className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gtu-orange" />
                  Online Re-Checking & Re-Assessment Application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  Students dissatisfied with their evaluation can apply for Re-checking (₹100/subject) or Re-assessment (₹250/subject) within 10 days of result publication.
                </p>
                <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                  <div className="font-semibold text-foreground">Important Dates for Summer 2024:</div>
                  <div className="text-xs text-muted-foreground">Last date for re-assessment application: <strong>September 10, 2024</strong></div>
                  <div className="text-xs text-muted-foreground">Late fee application window: <strong>September 15, 2024</strong></div>
                </div>
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={() => toast.info("Re-checking window for current semester is currently accepting applications.")}
                >
                  Apply For Re-Assessment Form
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
