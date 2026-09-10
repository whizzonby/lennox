import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">Lennox Talent Group</h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
            People first. Partnerships always. Talent that thrives.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/lennox-talent-group/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:lena@lennoxtalentgroup.com"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Home</Link>
            <Link to="/jobseekers" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Jobseekers</Link>
            <Link to="/employers" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Employers</Link>
            <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Contact Us</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/60">Contact</h4>
          <div className="space-y-3">
            <p className="text-sm text-primary-foreground/70">lena@lennoxtalentgroup.com</p>
            <a
              href="https://calendly.com/lena-lennoxtalentgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Schedule a Call →
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Lennox Talent Group. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
