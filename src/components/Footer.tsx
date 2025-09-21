import { Button } from "@components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gtu-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gtu-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">GTU</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Atharva Technological University</h3>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Leading institution in technical education, fostering innovation and excellence 
              across Atharva's educational landscape.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Examination</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Faculty</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Grievance Portal</a></li>
            </ul>
          </div>

          {/* Academic Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Academic Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center">
                  GTU Library <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center">
                  GCAS Portal <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Syllabus Downloads</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Innovation Council</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">OSTC Workshops</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Startup Support</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-gtu-orange" />
                <div>
                  <p className="text-white/80">
                    Nr. Vista Atharva, Gandhinagar - Ahmedabad Highway,<br />
                    Chandkheda, Ahmedabad - 382424
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gtu-orange" />
                <span className="text-white/80">+91-79-23267521/22/23</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gtu-orange" />
                <span className="text-white/80">info@gtu.edu.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gtu-orange" />
                <span className="text-white/80">elibrary@gtu.edu.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; 2024 Atharva Technological University. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;