import { Link } from "react-router-dom";
import { MessageCircle, Mail, Github, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/class-whisper-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={logo} 
                alt="Class Whisper Logo" 
                className="h-8 w-8 group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-bold">Class Whisper</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-3">
              Where Silence Speaks.
            </p>
            <p className="text-xs text-muted-foreground">
              Silent communication for modern classrooms.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/institutions" className="text-muted-foreground hover:text-primary transition-colors">For Institutions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/how-it-feels" className="text-muted-foreground hover:text-primary transition-colors">Experience Demo</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="mailto:classwhisper@gmail.com" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://x.com/classwhisper" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/classwhisper" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://github.com/soumya27062005/classwhisper" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Class Whisper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
