import { Button } from '@/components/ui/button';
import { Instagram, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-primary">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron font-bold text-lg text-glow">Cyborg Cats</span>
                <span className="font-inter text-xs text-muted-foreground">FRC Team 4256</span>
              </div>
            </Link>
            <p className="text-muted-foreground font-inter text-sm">
              Building robots, building futures. From Westminster Christian Academy in St. Louis, Missouri.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/cyborgcats4256" className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover-glow transition-cyber">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="mailto:team@cyborgcats4256.org" className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover-glow transition-cyber">
                <Mail className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">About Us</Link>
              <a href="/#impact" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Impact & Outreach</a>
              <a href="/#photos" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Competitions</a>
              <Link to="/team" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Our Team</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-orbitron font-semibold text-lg mb-4">Get Involved</h4>
            <div className="space-y-2">
              <a href="/#sponsors" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Become a Sponsor</a>
              <a href="/contact?subject=join" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Join Our Team</a>
              <a href="/contact?subject=partnership" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Partner With Us</a>
              <a href="/contact?subject=media" className="block text-muted-foreground hover:text-primary transition-cyber font-inter">Download Media Kit</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-inter text-sm">
                  Westminster Christian Academy<br />St. Louis, MO
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-inter text-sm">
                  team@cyborgcats4256.org
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-inter text-sm">
                  @cyborgcats4256
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-border my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground font-inter text-sm">
            © 2025 Cyborg Cats FRC Team 4256. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">Terms of Service</Link>
            <a href="https://www.firstinspires.org/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">FIRST Robotics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};