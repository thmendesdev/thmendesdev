import { useEffect, useRef } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { handleSectionLinkClick } from '@/utils/scrollToSection';

const Footer = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    observerRef.current = setupScrollReveal();
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <footer className="px-6 md:px-12 py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 reveal">
          <div>
            <a href="#" className="text-3xl font-heading font-bold tracking-tighter inline-block mb-6">
              dev<span className="opacity-80">_folio</span>
            </a>
            <p className="text-primary-foreground/80 max-w-md mb-8">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/thmendesdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/thiago-mendes-92359525a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:thiagosmm.freelancer@gmail.com"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">{t('siteMap')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" onClick={(e) => handleSectionLinkClick(e, '#home')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Home</a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => handleSectionLinkClick(e, '#about')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About</a>
                </li>
                <li>
                  <a href="#projects" onClick={(e) => handleSectionLinkClick(e, '#projects')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Projects</a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleSectionLinkClick(e, '#contact')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">{t('contact')}</h4>
              <address className="not-italic text-primary-foreground/80">
                <p className="mb-2">{t('locationPlace')}</p>
                <p className="mb-2">
                  <a href="mailto:thiagosmm.freelancer@gmail.com" className="hover:text-primary-foreground transition-colors">
                    thiagosmm.freelancer@gmail.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary-foreground/20 reveal">
          <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {t('copyright')}
          </p>
          <a 
            href="#home" 
            className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            {t('backToTop')} <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
