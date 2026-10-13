import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  FileText, 
  CreditCard, 
  Bell,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Legend 
} from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const currentCourses = [
  { code: "3160704", name: "Data Science with Python", faculty: "Dr. K. R. Trivedi", attendance: 92, status: "Active" },
  { code: "3160712", name: "Cloud Computing & DevOps", faculty: "Prof. S. M. Patel", attendance: 86, status: "Active" },
  { code: "3160713", name: "Web Technology & Full Stack", faculty: "Prof. Ankit Shah", attendance: 94, status: "Active" },
  { code: "3160714", name: "Cyber Security & Forensics", faculty: "Dr. Deepa Joshi", attendance: 82, status: "Active" },
  { code: "3160715", name: "Design Engineering - II B", faculty: "Er. Vivek Parmar", attendance: 88, status: "Active" },
];

const todaysLectures = [
  { time: "09:30 AM - 10:30 AM", subject: "Cloud Computing & DevOps", room: "Lab 402, CS Block", faculty: "Prof. S. M. Patel" },
  { time: "10:30 AM - 11:30 AM", subject: "Data Science with Python", room: "LH-12, Main Building", faculty: "Dr. K. R. Trivedi" },
  { time: "11:45 AM - 01:45 PM", subject: "Full Stack Development Lab", room: "Software Lab 3", faculty: "Prof. Ankit Shah" },
  { time: "02:30 PM - 03:30 PM", subject: "Cyber Security & Forensics", room: "LH-12, Main Building", faculty: "Dr. Deepa Joshi" },
];

import { backendApi, StudentResult, UserSession } from "@/services/mockBackend";
import { useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [studentResult, setStudentResult] = useState<StudentResult | null>(null);

  useEffect(() => {
    const user = backendApi.auth.getCurrentUser();
    const effectiveRoll = user?.rollNo || "210010116001";
    setCurrentUser(user || {
      id: "u-1",
      name: "Aarav Patel",
      username: "210010116001",
      role: "student",
      email: "aarav.p@gec.edu.in",
      rollNo: "210010116001",
      branch: "Computer Science & Engineering",
      semester: "Semester 6",
    });

    backendApi.results.getByRoll(effectiveRoll).then((res) => {
      if (res) setStudentResult(res);
    });
  }, []);

  const handleLogout = () => {
    backendApi.auth.logout();
    toast.info("Logged out of Student ERP portal.");
    navigate("/");
  };

  const displayName = studentResult?.studentName || currentUser?.name || "AARAV PATEL";
  const displayRoll = studentResult?.rollNo || currentUser?.rollNo || "210010116001";
  const displaySgpa = studentResult?.sgpa ?? 8.84;
  const displayCgpa = studentResult?.cgpa ?? 8.62;
  const initials = displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "ST";

  const semesterPerformance = [
    { semester: "Sem 1", sgpa: 8.20, cgpa: 8.20 },
    { semester: "Sem 2", sgpa: 8.45, cgpa: 8.32 },
    { semester: "Sem 3", sgpa: 8.60, cgpa: 8.41 },
    { semester: "Sem 4", sgpa: 8.50, cgpa: 8.43 },
    { semester: "Sem 5", sgpa: 8.75, cgpa: 8.50 },
    { semester: "Sem 6", sgpa: displaySgpa, cgpa: displayCgpa },
  ];

  const attendanceData = currentCourses.map((c) => ({
    subject: c.code.slice(-3),
    fullName: c.name,
    attendance: c.attendance,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Profile Header Bar */}
      <section className="bg-gradient-to-r from-gtu-blue to-blue-900 text-white py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-2xl font-bold backdrop-blur-md shadow-lg">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{displayName}</h1>
                  <Badge className="bg-emerald-500 text-white font-semibold text-xs">Regular Student</Badge>
                </div>
                <p className="text-xs md:text-sm text-white/80 mt-1 font-mono">
                  Enrollment: {displayRoll} • {studentResult?.branch || currentUser?.branch || "Computer Science"} ({studentResult?.semester || "Semester 6"})
                </p>
                <p className="text-xs text-white/70">
                  {studentResult?.institute || "Government Engineering College, Sector 28"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/results?roll=210010116001")}
                className="border border-white/40 text-white hover:bg-white/20 hover:text-white"
              >
                <Award className="h-4 w-4 mr-1.5 text-gtu-orange" /> View Marksheets
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="border border-white/40 text-white hover:bg-destructive hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-1.5" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className="container mx-auto px-4 py-10 flex-1 space-y-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Latest SGPA</div>
              <div className="text-3xl font-black text-gtu-blue mt-1">{displaySgpa}</div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-3 w-3" /> Top 5% of Department
              </span>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Cumulative CGPA</div>
              <div className="text-3xl font-black text-gtu-blue mt-1">{displayCgpa}</div>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                Across 6 Semesters
              </span>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Overall Attendance</div>
              <div className="text-3xl font-black text-emerald-600 mt-1">88.4%</div>
              <Progress value={88.4} className="h-1.5 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5">
              <div className="text-xs text-muted-foreground uppercase font-semibold">Earned Credits</div>
              <div className="text-3xl font-black text-gtu-orange mt-1">134 / 160</div>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                Degree Completion: 83.7%
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Strip */}
        <div className="p-5 rounded-2xl bg-muted/40 border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gtu-orange" />
            <span className="text-sm font-semibold text-foreground">Winter 2024 Hall Ticket is now ready for download</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => toast.success("Hall Ticket for Winter 2024 Exam downloaded successfully!")}
            >
              <Download className="h-4 w-4 mr-1.5" /> Download Hall Ticket
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("Fee Payment Receipt #ATH-2024-8902 downloaded.")}
            >
              <CreditCard className="h-4 w-4 mr-1.5" /> Fee Receipt
            </Button>
          </div>
        </div>

        {/* Visual Analytics Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart 1: SGPA & CGPA Progression */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gtu-blue" />
                    Academic Growth & SGPA Trend
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Semester 1 to Semester 6 Progression</p>
                </div>
                <Badge variant="outline" className="text-xs font-mono bg-primary/5 text-primary">
                  Current: {displaySgpa}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={semesterPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sgpaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1e40af" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="semester" tick={{ fontSize: 11 }} />
                    <YAxis domain={[6.0, 10.0]} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                    <Area type="monotone" dataKey="sgpa" stroke="#1e40af" strokeWidth={2.5} fillOpacity={1} fill="url(#sgpaGradient)" name="SGPA (Semester)" />
                    <Area type="monotone" dataKey="cgpa" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#cgpaGradient)" name="CGPA (Cumulative)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Chart 2: Course Attendance vs 75% Cutoff */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-emerald-600" />
                    Course Attendance vs Criteria (75%)
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Eligibility check for University End-Sem Hall Ticket</p>
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  All Qualified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                    <Tooltip 
                      formatter={(val: number, name: string, item: any) => [`${val}%`, item.payload.fullName]}
                      contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                    />
                    <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "75% Mandatory", fill: "#ef4444", fontSize: 10, position: "top" }} />
                    <Bar dataKey="attendance" fill="#059669" radius={[6, 6, 0, 0]} name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2-Column: Lectures & Registered Courses */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Lectures */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-gtu-blue" />
                Today's Schedule
              </h2>
              <Badge variant="outline" className="text-xs">Tuesday</Badge>
            </div>

            <div className="space-y-3">
              {todaysLectures.map((lec, idx) => (
                <Card key={idx} className="border-border p-4 space-y-1.5">
                  <div className="text-xs font-mono font-semibold text-gtu-orange">{lec.time}</div>
                  <strong className="text-sm text-foreground block">{lec.subject}</strong>
                  <div className="text-xs text-muted-foreground flex justify-between pt-1">
                    <span>{lec.room}</span>
                    <span className="font-medium">{lec.faculty}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Registered Semester Subjects */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gtu-orange" />
                Semester 6 Registered Courses
              </h2>
              <Badge variant="secondary" className="text-xs">5 Theory & Labs</Badge>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-muted font-semibold">
                  <tr>
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3 text-center">Attendance</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {currentCourses.map((c, idx) => (
                    <tr key={idx} className="hover:bg-muted/20">
                      <td className="p-3 font-mono font-semibold text-gtu-blue">{c.code}</td>
                      <td className="p-3 font-medium text-foreground">{c.name}</td>
                      <td className="p-3 text-muted-foreground">{c.faculty}</td>
                      <td className="p-3 text-center font-bold">
                        <span className={c.attendance >= 85 ? "text-emerald-600" : "text-amber-600"}>
                          {c.attendance}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className="text-[11px] bg-emerald-50 text-emerald-700 border-emerald-200">
                          {c.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
