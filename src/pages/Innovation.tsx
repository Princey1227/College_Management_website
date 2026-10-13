import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Rocket, 
  Lightbulb, 
  ShieldCheck, 
  Users, 
  Coins, 
  ArrowRight,
  Sparkles,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const studentStartups = [
  {
    name: "AgriVision AI",
    founders: "Devanshi Shah & Harshil Dave (B.Tech CSE)",
    tagline: "Drone-assisted multispectral crop health detection & automated spraying algorithms.",
    funding: "₹5.5 Lakhs SSIP Grant",
    status: "Incubated & Scaling",
    category: "AgriTech"
  },
  {
    name: "VoltCharge Mobility",
    founders: "Rohan Mehta (B.Tech Mechanical)",
    tagline: "Smart modular battery swapping stations with real-time BMS telematics for 2-wheelers.",
    funding: "₹10 Lakhs Seed Fund",
    status: "Pilot in Ahmedabad",
    category: "CleanTech / EV"
  },
  {
    name: "MedSecure Cloud",
    founders: "Ananya Trivedi (B.Tech IT)",
    tagline: "Zero-knowledge encryption medical record transfer platform for diagnostic labs.",
    funding: "₹3.8 Lakhs SSIP 2.0",
    status: "Commercial Launch",
    category: "HealthTech"
  }
];

const innovationPillars = [
  {
    icon: Coins,
    title: "SSIP 2.0 Prototype Grants",
    description: "Financial assistance up to ₹2.5 Lakhs per student innovator for Proof-of-Concept (PoC) and hardware prototypes."
  },
  {
    icon: ShieldCheck,
    title: "IP Clinic & Patent Filing",
    description: "100% financial reimbursement for filing National and International Patents, Trademarks, and Design Copyrights."
  },
  {
    icon: Rocket,
    title: "TBI Incubation Center",
    description: "Co-working desk space, 3D printing lab, cloud computing credits from AWS/Azure, and legal mentoring."
  },
  {
    icon: Users,
    title: "Venture Capital Mentorship",
    description: "Quarterly pitch demo days with Gujarat Angel Network, institutional VCs, and successful alumni entrepreneurs."
  }
];

const Innovation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <Trophy className="h-4 w-4 text-gtu-orange" />
            <span>STARTUP ECOSYSTEM & RESEARCH COMMERCIALIZATION</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Innovation & Startup Council
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Transforming student classroom ideas into high-growth enterprise ventures with grants, patents, and seed funding support.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => toast.success("SSIP Grant application form opened")}
            >
              <Lightbulb className="h-5 w-5 mr-2" /> Apply for SSIP Grant (₹2.5L)
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/contact")}
            >
              Consult IP Patent Clinic
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1 space-y-16">
        {/* Innovation Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Card className="p-6 border-border">
            <div className="text-3xl md:text-4xl font-black text-gtu-blue">320+</div>
            <div className="text-xs text-muted-foreground mt-1">Student Startups Funded</div>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl md:text-4xl font-black text-gtu-orange">₹14 Cr+</div>
            <div className="text-xs text-muted-foreground mt-1">Grants Disbursed</div>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl md:text-4xl font-black text-emerald-600">85+</div>
            <div className="text-xs text-muted-foreground mt-1">Patents Filed & Granted</div>
          </Card>
          <Card className="p-6 border-border">
            <div className="text-3xl md:text-4xl font-black text-purple-600">4,500+</div>
            <div className="text-xs text-muted-foreground mt-1">Hackathon Innovators</div>
          </Card>
        </div>

        {/* 4 Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              FOUNDATION PROGRAMMES
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">How We Support Your Startup Journey</h2>
            <p className="text-sm text-muted-foreground mt-2">
              From ideation phase to product-market fit, we provide end-to-end institutional backing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovationPillars.map((item, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow border-border">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-gtu-orange/10 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-gtu-orange" />
                  </div>
                  <CardTitle className="text-base font-bold text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Student Startups */}
        <section className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Student Founder Spotlight</h2>
              <p className="text-xs text-muted-foreground">Successful companies built inside Atharva University incubation labs</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info("Full startups catalog directory")}>
              Browse All Incubated Ventures →
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studentStartups.map((st, idx) => (
              <Card key={idx} className="hover:shadow-elevated transition-all border-border flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-[11px] font-semibold">{st.category}</Badge>
                    <Badge className="bg-emerald-600 text-white text-[10px]">{st.status}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mt-2">{st.name}</CardTitle>
                  <p className="text-xs text-muted-foreground font-medium">Founders: {st.founders}</p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.tagline}</p>
                  <div className="p-3 bg-muted/50 rounded-xl border border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Grant Received:</span>
                    <strong className="text-gtu-blue font-bold">{st.funding}</strong>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Innovation;
