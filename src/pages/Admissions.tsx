import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  CheckCircle2, 
  Calendar, 
  FileCheck, 
  Award, 
  Download, 
  Sparkles,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";

import { backendApi } from "@/services/mockBackend";

const steps = [
  { step: "01", title: "Entrance Exam", desc: "Appear for GUJCET / JEE Main (for B.Tech) or CMAT (for MBA) or GATE (for M.Tech)." },
  { step: "02", title: "Online Registration", desc: "Register on the centralized admission portal (ACPC) with academic credentials." },
  { step: "03", title: "Choice Filling & Merit", desc: "Lock institute preferences based on university cutoff merit rank." },
  { step: "04", title: "Seat Allotment & Fees", desc: "Download provisional admission letter and complete physical document verification." },
];

const Admissions = () => {
  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("B.Tech Computer Science & AI");
  const [score, setScore] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !email.trim()) {
      toast.error("Please fill in candidate name and email.");
      return;
    }
    setIsSubmitting(true);
    await backendApi.admissions.submit({
      candidateName: candidateName.trim(),
      email: email.trim(),
      phone: phone.trim() || "+91 9800000000",
      course: course.trim(),
      score: score.trim() || "Pending Verification",
    });
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Admissions inquiry submitted and logged to university database!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <GraduationCap className="h-4 w-4 text-gtu-orange" />
            <span>ADMISSIONS 2024 - 2025</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Apply to Atharva Tech University
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Join over 500,000 future technologists, managers, and entrepreneurs across 50+ programs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1 space-y-16">
        {/* Step by Step Roadmap */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              ADMISSION ROADMAP
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How To Secure Your Seat</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <Card key={idx} className="border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/10 text-primary font-black text-2xl p-3 rounded-bl-2xl">
                  {st.step}
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="text-base font-bold text-foreground">{st.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 2-Column: Application Form & Eligibility */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Online Admission Inquiry Form</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Receive personalized cutoff rank guidance, scholarship eligibility, and campus tour invite.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="p-8 text-center space-y-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-bold">Application Registered!</h3>
                    <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                      Thank you, {candidateName}. Your provisional inquiry ticket has been logged. Our admissions desk will reach out at {phone || email}.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Candidate Full Name *</label>
                        <Input
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          placeholder="e.g. Yashika Patel"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Email Address *</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yashika@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Mobile Phone Number *</label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Intended Program</label>
                        <Input
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g. B.Tech Computer Science"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Entrance Exam Score / 12th Board %</label>
                      <Input
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="e.g. GUJCET 94.5 Percentile / JEE Main 92%ile"
                      />
                    </div>

                    <Button type="submit" variant="cta" className="w-full sm:w-auto font-bold">
                      Submit Admission Inquiry
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Scholarship & Fees Info */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-gtu-orange" />
                  Government Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground block">MYSY (Mukhyamantri Yuva Swavalamban)</strong>
                  50% tuition fee waiver for Gujarat domicile candidates with &gt;80 percentile in 12th Science.
                </div>
                <div className="pt-2 border-t border-border">
                  <strong className="text-foreground block">Digital Gujarat SC/ST/OBC Scholarship</strong>
                  100% tuition assistance and book allowances for eligible category students.
                </div>
                <div className="pt-2 border-t border-border">
                  <strong className="text-foreground block">AICTE Pragati for Girls</strong>
                  ₹50,000 per annum grant for female engineering entrants.
                </div>
              </CardContent>
            </Card>

            <Card className="border-border p-5 text-center space-y-3 bg-muted/40">
              <h4 className="font-bold text-sm text-foreground">Have Admission Questions?</h4>
              <p className="text-xs text-muted-foreground">
                Speak directly with our central counseling desk.
              </p>
              <div className="font-mono text-sm font-bold text-gtu-blue">
                +91-79-23267530 / 31
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admissions;
