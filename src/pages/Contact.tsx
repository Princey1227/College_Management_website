import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2,
  Building,
  User
} from "lucide-react";
import { toast } from "sonner";

const departments = [
  { name: "Registrar Secretariat", head: "Dr. K. N. Sheth", phone: "+91-79-23267521", email: "registrar@atharva.edu.in" },
  { name: "Controller of Examinations", head: "Prof. R. M. Patel", phone: "+91-79-23267555", email: "coe@atharva.edu.in" },
  { name: "Admissions Directorate (ACPC)", head: "Dr. S. K. Joshi", phone: "+91-79-23267530", email: "admissions@atharva.edu.in" },
  { name: "Student Welfare & Grievance", head: "Prof. Neha Trivedi", phone: "+91-79-23267540", email: "welfare@atharva.edu.in" },
  { name: "Training & Placement Cell", head: "Er. Amit Shah", phone: "+91-79-23267562", email: "placements@atharva.edu.in" },
  { name: "Anti-Ragging Helpline (24/7)", head: "Campus Security Squad", phone: "1800-180-5522", email: "antiragging@atharva.edu.in" },
];

import { backendApi } from "@/services/mockBackend";

const Contact = () => {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      toast.error("Please fill in your Name, Email, and Message.");
      return;
    }
    setIsSubmitting(true);
    const created = await backendApi.inquiries.submit({
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      department: formSubject.trim() || "General Inquiry",
      message: formMessage.trim(),
    });
    setIsSubmitting(false);
    toast.success(`Inquiry ticket #${created.id} registered in database!`);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormSubject("");
    setFormMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <Phone className="h-4 w-4 text-gtu-orange" />
            <span>CENTRAL HELP & STUDENT GRIEVANCE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Contact University Administration
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Reach out to department registrars, examination cells, student welfare council, or submit a formal digital ticket.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Details & Campus Card */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gtu-orange" />
                  Campus Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <strong className="text-foreground block">Atharva Technological University</strong>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Nr. Vista Knowledge Corridor, Gandhinagar - Ahmedabad Highway,<br />
                    Chandkheda, Ahmedabad, Gujarat - 382424
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 text-gtu-blue shrink-0" />
                    <span>+91-79-23267521 / 22 / 23</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 text-gtu-blue shrink-0" />
                    <span>info@atharva.edu.in</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-gtu-blue shrink-0" />
                    <span>Mon - Sat: 10:30 AM to 06:10 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-destructive/10 border-destructive/20 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-destructive text-sm">Emergency Anti-Ragging Helpline</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Zero tolerance policy. 24x7 National Toll Free Hotline:
                  </p>
                  <div className="font-mono font-bold text-sm text-foreground mt-1">
                    1800-180-5522 / +91-79-23267540
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Send Digital Inquiry or Grievance</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Your ticket will be routed directly to the designated department officer with an acknowledgment SMS.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Your Full Name *</label>
                      <Input
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Email Address *</label>
                      <Input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Mobile Phone Number</label>
                      <Input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +91 9876543210"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Department / Category</label>
                      <Input
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="e.g. Exam Marksheet, Transcript, Admission"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Detailed Description / Grievance *</label>
                    <Textarea
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Please specify your enrollment number (if applicable) and describe your query in detail..."
                      required
                    />
                  </div>

                  <Button type="submit" variant="cta" disabled={isSubmitting} className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Dispatching Ticket..." : "Submit Inquiry Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Directory Table */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gtu-blue" />
            <h2 className="text-xl font-bold text-foreground">Departmental Contact Directory</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, idx) => (
              <Card key={idx} className="border-border p-4 text-xs space-y-2">
                <strong className="text-sm text-foreground block font-bold">{dept.name}</strong>
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gtu-orange" />
                  <span>Head: {dept.head}</span>
                </p>
                <div className="pt-2 border-t border-border space-y-1 font-mono text-muted-foreground">
                  <div>📞 {dept.phone}</div>
                  <div>✉️ {dept.email}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
