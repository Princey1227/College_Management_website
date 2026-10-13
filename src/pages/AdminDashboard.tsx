import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Bell, 
  Database, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Search,
  ExternalLink,
  Users,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { backendApi, StudentResult, AdmissionApplication, ContactInquiry, BookItem, AnnouncementItem } from "@/services/mockBackend";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(backendApi.system.getDatabaseStats());
  const [resultsList, setResultsList] = useState<StudentResult[]>([]);
  const [admissionsList, setAdmissionsList] = useState<AdmissionApplication[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>([]);
  const [booksList, setBooksList] = useState<BookItem[]>([]);
  const [announcementsList, setAnnouncementsList] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(false);

  // New Result Form State
  const [newRoll, setNewRoll] = useState("");
  const [newName, setNewName] = useState("");
  const [newBranch, setNewBranch] = useState("Computer Science & Engineering");
  const [newSem, setNewSem] = useState("Semester 6");
  const [newSgpa, setNewSgpa] = useState("8.50");

  // New Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnDesc, setNewAnnDesc] = useState("");

  const branchAdmissionsData = [
    { branch: "CSE & AI", count: 32, fill: "#2563eb" },
    { branch: "IT", count: 24, fill: "#0284c7" },
    { branch: "Mech", count: 18, fill: "#f59e0b" },
    { branch: "Civil", count: 14, fill: "#10b981" },
    { branch: "M.Tech", count: 12, fill: "#8b5cf6" },
  ];

  const gradeDistributionData = [
    { name: "Grade AA (10)", value: 42, color: "#10b981" },
    { name: "Grade AB (9)", value: 30, color: "#3b82f6" },
    { name: "Grade BB (8)", value: 18, color: "#f59e0b" },
    { name: "Grade BC/CC (6-7)", value: 8, color: "#a855f7" },
    { name: "Backlogs", value: 2, color: "#ef4444" },
  ];

  const refreshAll = async () => {
    setLoading(true);
    const [res, adm, inq, bks, ann] = await Promise.all([
      backendApi.results.getAll(),
      backendApi.admissions.getAll(),
      backendApi.inquiries.getAll(),
      backendApi.library.getBooks(),
      backendApi.announcements.getAll(),
    ]);
    setResultsList(res);
    setAdmissionsList(adm);
    setInquiriesList(inq);
    setBooksList(bks);
    setAnnouncementsList(ann);
    setStats(backendApi.system.getDatabaseStats());
    setLoading(false);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // Handle Create Result
  const handleCreateResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoll.trim() || !newName.trim()) {
      toast.error("Please provide Roll Number and Student Name");
      return;
    }

    const calculatedSgpa = parseFloat(newSgpa) || 8.0;
    const newStudentResult: StudentResult = {
      rollNo: newRoll.trim(),
      studentName: newName.trim().toUpperCase(),
      course: "Bachelor of Technology",
      branch: newBranch,
      institute: "Atharva Institute of Technology",
      semester: newSem,
      examSession: "Winter 2024 Examination",
      declarationDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      sgpa: calculatedSgpa,
      cgpa: calculatedSgpa,
      status: "PASS",
      subjects: [
        { code: "3160701", name: "Advanced Algorithm Design", credits: 4, internal: 28, external: 62, total: 90, grade: "AA" },
        { code: "3160702", name: "Distributed Systems & Cloud", credits: 4, internal: 26, external: 59, total: 85, grade: "AB" },
        { code: "3160703", name: "Applied Machine Learning", credits: 4, internal: 29, external: 64, total: 93, grade: "AA" },
        { code: "3160704", name: "Enterprise Project Work", credits: 3, internal: 30, external: 67, total: 97, grade: "AA" },
      ],
    };

    await backendApi.results.saveResult(newStudentResult);
    toast.success(`Result published for ${newRoll}! It can now be searched on /results.`);
    setNewRoll("");
    setNewName("");
    refreshAll();
  };

  // Handle Delete Result
  const handleDeleteResult = async (rollNo: string) => {
    await backendApi.results.deleteResult(rollNo);
    toast.info(`Result ${rollNo} deleted from database`);
    refreshAll();
  };

  // Handle Admission Status Change
  const handleAdmissionStatus = async (id: string, status: AdmissionApplication["status"]) => {
    await backendApi.admissions.updateStatus(id, status);
    toast.success(`Application #${id} status changed to ${status}`);
    refreshAll();
  };

  // Handle Inquiry Status Change
  const handleInquiryStatus = async (id: string, status: ContactInquiry["status"]) => {
    await backendApi.inquiries.updateStatus(id, status);
    toast.success(`Ticket #${id} marked as ${status}`);
    refreshAll();
  };

  // Handle Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnDesc.trim()) return;
    await backendApi.announcements.create({
      title: newAnnTitle.trim(),
      description: newAnnDesc.trim(),
      type: "urgent",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      active: true,
      link: "/results",
    });
    toast.success("Broadcast notice published across university portal!");
    setNewAnnTitle("");
    setNewAnnDesc("");
    refreshAll();
  };

  // Handle Delete Announcement
  const handleDeleteAnnouncement = async (id: string) => {
    await backendApi.announcements.delete(id);
    toast.info("Notice removed");
    refreshAll();
  };

  // Reset to Demo Data
  const handleResetDb = () => {
    if (confirm("Reset local storage database to default demo seed data? All custom additions will be restored to defaults.")) {
      backendApi.system.resetToDemoData();
      toast.success("LocalStorage database restored to initial seed state!");
      refreshAll();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Admin Header */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gtu-orange flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">University Control Center</h1>
                  <Badge className="bg-emerald-600 text-white text-xs">LocalStorage Backend Active</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Manage student marks, admission applications, helpdesk tickets, and library stacks in real time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshAll}
                className="border-slate-700 text-slate-200 hover:bg-slate-800"
              >
                <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleResetDb}
                className="shadow-sm"
              >
                <Database className="h-4 w-4 mr-1.5" /> Reset Demo DB
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Exam Results</div>
              <div className="text-2xl font-bold text-white mt-1">{stats.resultsCount}</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Admissions</div>
              <div className="text-2xl font-bold text-gtu-orange mt-1">{stats.admissionsCount}</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Inquiry Tickets</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.inquiriesCount}</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Books Catalog</div>
              <div className="text-2xl font-bold text-blue-400 mt-1">{stats.booksCount}</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Reservations</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">{stats.reservationsCount}</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="text-xs text-slate-400">Active Notices</div>
              <div className="text-2xl font-bold text-yellow-400 mt-1">{stats.announcementsCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Workspace */}
      <main className="container mx-auto px-4 py-10 flex-1">
        {/* Visual Analytics KPI Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-gtu-blue" />
                    Admissions Demand by Discipline
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Application distribution across engineering faculties</p>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {stats.admissionsCount + 90} Total Inquiries
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchAdmissionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="branch" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4 text-emerald-600" />
                    University Grading Distribution
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Aggregate percentage performance across institutes</p>
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  98% Pass Rate
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 max-w-2xl mx-auto h-auto p-1 bg-muted">
            <TabsTrigger value="results" className="text-xs py-2">
              <GraduationCap className="h-3.5 w-3.5 mr-1.5" /> Exam Marksheets
            </TabsTrigger>
            <TabsTrigger value="admissions" className="text-xs py-2">
              <FileText className="h-3.5 w-3.5 mr-1.5" /> Admissions
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="text-xs py-2">
              <Users className="h-3.5 w-3.5 mr-1.5" /> Support Tickets
            </TabsTrigger>
            <TabsTrigger value="library" className="text-xs py-2">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Library Stacks
            </TabsTrigger>
            <TabsTrigger value="announcements" className="text-xs py-2">
              <Bell className="h-3.5 w-3.5 mr-1.5" /> Broadcast Notices
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: RESULTS MANAGEMENT */}
          <TabsContent value="results" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Form to Add Result */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Plus className="h-4 w-4 text-gtu-blue" />
                    Publish Student Marksheet
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Adds records directly to the backend database.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateResult} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Roll / Enrollment No *</label>
                      <Input
                        value={newRoll}
                        onChange={(e) => setNewRoll(e.target.value)}
                        placeholder="e.g. 210010116099"
                        className="font-mono h-9"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Student Full Name *</label>
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. SNEHA MEHTA"
                        className="h-9"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Branch Discipline</label>
                      <Input
                        value={newBranch}
                        onChange={(e) => setNewBranch(e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-semibold text-foreground">Semester</label>
                        <Input
                          value={newSem}
                          onChange={(e) => setNewSem(e.target.value)}
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-foreground">SGPA</label>
                        <Input
                          value={newSgpa}
                          onChange={(e) => setNewSgpa(e.target.value)}
                          placeholder="8.50"
                          className="h-9 font-mono"
                        />
                      </div>
                    </div>
                    <Button type="submit" variant="cta" className="w-full h-9 font-bold text-xs mt-2">
                      Save & Publish Marksheet
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Results List */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-foreground">Published Marksheets ({resultsList.length})</h3>
                  <span className="text-xs text-muted-foreground">Persisted in LocalStorage</span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {resultsList.map((res) => (
                    <Card key={res.rollNo} className="border-border p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-sm text-foreground">{res.studentName}</strong>
                            <Badge variant="outline" className="font-mono text-[11px] bg-primary/5 text-primary">
                              {res.rollNo}
                            </Badge>
                            <Badge className="bg-emerald-600 text-white text-[10px]">{res.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {res.branch} • {res.semester} • SGPA: <strong className="text-foreground">{res.sgpa}</strong>
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {res.subjects.length} Subjects graded • Declared: {res.declarationDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => navigate(`/results?roll=${res.rollNo}`)}
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Marksheet
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteResult(res.rollNo)}
                            title="Delete marksheet"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: ADMISSIONS PIPELINE */}
          <TabsContent value="admissions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground">Admission Inquiries & Applications ({admissionsList.length})</h3>
              <span className="text-xs text-muted-foreground">Submissions from /admissions</span>
            </div>

            <div className="divide-y divide-border border rounded-xl overflow-hidden bg-card">
              {admissionsList.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-xs">
                  No admission applications submitted yet.
                </div>
              ) : (
                admissionsList.map((app) => (
                  <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-foreground">{app.candidateName}</strong>
                        <Badge variant="secondary" className="text-xs">{app.course}</Badge>
                        <Badge 
                          className={`text-[10px] ${
                            app.status === "Accepted" ? "bg-emerald-600 text-white" :
                            app.status === "Rejected" ? "bg-destructive text-white" :
                            "bg-amber-500 text-white"
                          }`}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Email: {app.email} • Mobile: {app.phone} • Score: <strong>{app.score}</strong>
                      </p>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">Submitted: {app.submittedAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => handleAdmissionStatus(app.id, "Accepted")}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs text-amber-600 hover:bg-amber-50"
                        onClick={() => handleAdmissionStatus(app.id, "Under Review")}
                      >
                        Review
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs text-destructive hover:bg-destructive/10"
                        onClick={() => handleAdmissionStatus(app.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* TAB 3: INQUIRIES & GRIEVANCES */}
          <TabsContent value="inquiries" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground">Support & Grievance Tickets ({inquiriesList.length})</h3>
              <span className="text-xs text-muted-foreground">Inquiries from /contact</span>
            </div>

            <div className="divide-y divide-border border rounded-xl overflow-hidden bg-card">
              {inquiriesList.map((inq) => (
                <div key={inq.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-gtu-blue">#{inq.id}</span>
                      <strong className="text-sm text-foreground ml-2">{inq.name}</strong>
                      <span className="text-xs text-muted-foreground ml-2">({inq.email})</span>
                      <Badge variant="outline" className="ml-2 text-[10px]">{inq.department}</Badge>
                    </div>
                    <Badge className={inq.status === "Resolved" ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"}>
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground/80 bg-muted/40 p-2.5 rounded-lg border border-border">
                    {inq.message}
                  </p>
                  <div className="flex justify-between items-center pt-1 text-xs">
                    <span className="text-muted-foreground text-[10px]">Logged: {inq.submittedAt}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7"
                        onClick={() => handleInquiryStatus(inq.id, "In Progress")}
                      >
                        Mark In Progress
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="text-xs h-7 bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleInquiryStatus(inq.id, "Resolved")}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Mark Resolved
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 4: LIBRARY STACKS */}
          <TabsContent value="library" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground">Library Book Inventory & Live Copies</h3>
              <span className="text-xs text-muted-foreground">Real-time availability updates</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {booksList.map((bk) => (
                <Card key={bk.id} className="p-4 border-border space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-foreground">{bk.title}</strong>
                      <p className="text-xs text-muted-foreground mt-0.5">{bk.author}</p>
                    </div>
                    <Badge variant="outline" className="font-mono text-[11px]">{bk.callNo}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                    <span className="text-muted-foreground">Category: {bk.category}</span>
                    <span className="font-bold text-emerald-600">
                      {bk.copiesAvailable} / {bk.totalCopies} copies available
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 5: BROADCAST NOTICES */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Plus className="h-4 w-4 text-gtu-orange" />
                    Broadcast Instant Notice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Notice Title *</label>
                      <Input
                        value={newAnnTitle}
                        onChange={(e) => setNewAnnTitle(e.target.value)}
                        placeholder="e.g. Winter 2024 Hall Tickets Released"
                        className="h-9"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Detailed Description *</label>
                      <Input
                        value={newAnnDesc}
                        onChange={(e) => setNewAnnDesc(e.target.value)}
                        placeholder="e.g. Download before Nov 20 from student portal."
                        className="h-9"
                        required
                      />
                    </div>
                    <Button type="submit" variant="cta" className="w-full h-9 font-bold text-xs mt-2">
                      Broadcast to Entire Portal
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-bold text-foreground">Active Notices ({announcementsList.length})</h3>
                <div className="space-y-2">
                  {announcementsList.map((ann) => (
                    <Card key={ann.id} className="p-4 border-border flex justify-between items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-foreground">{ann.title}</strong>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold">{ann.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{ann.description}</p>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">Date: {ann.date}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        title="Delete notice"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
