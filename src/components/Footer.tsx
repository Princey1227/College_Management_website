import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ExternalLink,
  GraduationCap
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gtu-blue text-white border-t border-blue-900/40">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gtu-orange rounded-full flex items-center justify-center shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Atharva Tech University</h3>
                <p className="text-xs text-white/70">State University • Govt of Gujarat</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Premier institution dedicated to technological advancement, multidisciplinary research, student entrepreneurship, and global education benchmarks.
            </p>
            <div className="flex space-x-2 pt-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-9 w-9" asChild>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-9 w-9" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-9 w-9" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-9 w-9" asChild>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home Portal</Link></li>
              <li><Link to="/academics" className="text-white/80 hover:text-white transition-colors">Academics & Syllabus</Link></li>
              <li><Link to="/results" className="text-white/80 hover:text-white transition-colors">Examination & Results</Link></li>
              <li><Link to="/admissions" className="text-white/80 hover:text-white transition-colors">Admissions 2024</Link></li>
              <li><Link to="/library" className="text-white/80 hover:text-white transition-colors">Digital E-Library</Link></li>
              <li><Link to="/innovation" className="text-white/80 hover:text-white transition-colors">Startup & Innovation</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Grievance & Contact</Link></li>
            </ul>
          </div>

          {/* Academic Resources */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white uppercase tracking-wider text-xs">Portals & Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="text-white/80 hover:text-white transition-colors flex items-center">
                  Student ERP Login <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/login?role=faculty" className="text-white/80 hover:text-white transition-colors flex items-center">
                  Faculty Portal <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/login?role=admin" className="text-white/80 hover:text-white transition-colors flex items-center">
                  Admin Control Center <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-white/80 hover:text-white transition-colors">
                  Research Journals (IEEE/Springer)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Anti-Ragging Helpline
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white uppercase tracking-wider text-xs">Contact Headquarters</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-gtu-orange shrink-0" />
                <p className="text-white/80 text-xs leading-relaxed">
                  Atharva University Campus, Highway Corridor,<br />
                  Gandhinagar - Ahmedabad Highway,<br />
                  Gujarat - 382424, India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gtu-orange shrink-0" />
                <span className="text-white/80 text-xs">+91-79-23267521 / 22 / 23</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gtu-orange shrink-0" />
                <span className="text-white/80 text-xs">registrar@atharva.edu.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gtu-orange shrink-0" />
                <span className="text-white/80 text-xs">examhelp@atharva.edu.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-4">
          <p>&copy; {new Date().getFullYear()} Atharva Technological University. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">RTI Cell</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;