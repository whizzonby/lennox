import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/LTG_logo.svg";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Jobseekers", path: "/jobseekers" },
  { label: "Employers", path: "/employers" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lennox Talent Group" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background border-t border-border pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-accent bg-accent/10 border-l-4 border-accent"
                  : "text-foreground/80 hover:text-accent border-l-4 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <a href="https://calendly.com/lena-lennoxtalentgroup" target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
