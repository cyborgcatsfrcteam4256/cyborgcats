import { Button } from '@/components/ui/button';
import { Instagram, Mail, MapPin, Phone, Zap, ArrowUp, Home, Users, Trophy, Heart, Camera, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border" aria-label="Site footer">
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
              {t('hero.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/cyborgcats4256" className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover-glow transition-cyber" aria-label="Follow us on Instagram">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="mailto:team@cyborgcats4256.org" className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover-glow transition-cyber" aria-label="Email us">
                <Mail className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <Link to="/about" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Home className="w-4 h-4" />
                {t('nav.about')}
              </Link>
              <Link to="/team" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Users className="w-4 h-4" />
                {t('nav.team')}
              </Link>
              <Link to="/impact" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Heart className="w-4 h-4" />
                {t('nav.impact')}
              </Link>
              <Link to="/sponsors" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Trophy className="w-4 h-4" />
                {t('nav.sponsors')}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-orbitron font-semibold text-lg mb-4">{t('footer.getInvolved')}</h3>
            <div className="space-y-2">
              <a href="/#media" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Camera className="w-4 h-4" />
                {t('nav.media')}
              </a>
              <a href="/#resources" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <BookOpen className="w-4 h-4" />
                {t('nav.resources')}
              </a>
              <a href="/contact?subject=join" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Users className="w-4 h-4" />
                {t('nav.joinUs')}
              </a>
              <Link to="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-cyber font-inter">
                <Trophy className="w-4 h-4" />
                {t('footer.partnerWithUs')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-orbitron font-semibold text-lg mb-4">{t('footer.contactInfo')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-inter text-sm">
                  {t('footer.location')}<br />{t('footer.city')}
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-inter text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">{t('footer.termsOfService')}</Link>
            <a href="https://www.firstinspires.org/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-cyber font-inter text-sm">{t('footer.firstRobotics')}</a>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-cyber font-inter text-sm"
            >
              <ArrowUp className="w-4 h-4" />
              {t('footer.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};