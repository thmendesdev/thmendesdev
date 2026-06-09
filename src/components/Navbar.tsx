import { useState, useEffect, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { handleSectionLinkClick } from '@/utils/scrollToSection';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onSectionLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false
  ) => {
    handleSectionLinkClick(event, href);
    if (closeMenu) {
      setIsMenuOpen(false);
    }
  };
  
  const navLinks = [
    { name: t('home'), href: '#home' },
    { name: t('about'), href: '#about' },
    { name: t('projects'), href: '#projects' },
    { name: t('contact'), href: '#contact' }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 isolate transition-all duration-300 px-6 md:px-12',
      isScrolled ? 'py-4 bg-background/80 backdrop-blur-lg shadow-sm' : 'py-6'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => onSectionLinkClick(e, '#home')}
          className="text-2xl font-heading font-bold tracking-tighter"
        >
          dev<span className="text-gradient">_folio</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative h-6 overflow-hidden"
              onMouseEnter={() => setHoveredItem(link.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a 
                href={link.href}
                onClick={(e) => onSectionLinkClick(e, link.href)}
                className={cn(
                  "relative text-sm font-medium transition-all duration-500 ease-cubic-bezier block will-change-transform",
                  hoveredItem === link.name ? "transform -translate-y-full opacity-70" : "hover:text-foreground/80"
                )}
              >
                {link.name}
              </a>
              {hoveredItem === link.name && (
                <a 
                  href={link.href}
                  onClick={(e) => onSectionLinkClick(e, link.href)}
                  className="absolute top-full left-0 text-sm font-medium animate-slide-up will-change-transform"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => onSectionLinkClick(e, '#contact')}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('letsTalk')}
          </a>
        </nav>
        <div className="hidden md:block ml-4">
          <LanguageSwitcher />
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          'mobile-nav-overlay fixed inset-0 bg-background/90 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center',
          isMenuOpen ? 'opacity-100 z-40 pointer-events-auto' : 'opacity-0 -z-10 pointer-events-none'
        )}
        aria-hidden={!isMenuOpen}
        tabIndex={isMenuOpen ? 0 : -1}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav
          className="flex flex-col gap-8 items-center text-center w-full max-w-xs mx-auto"
          role="menu"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => onSectionLinkClick(e, link.href, true)}
              className={cn(
                'text-2xl md:text-3xl font-semibold transition-all duration-300 hover:text-primary focus:text-primary outline-none',
                isMenuOpen && 'animate-fade-in'
              )}
              style={{ animationDelay: `${i * 100}ms` }}
              tabIndex={isMenuOpen ? 0 : -1}
              role="menuitem"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => onSectionLinkClick(e, '#contact', true)}
            className={cn(
              'px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg md:text-xl hover:bg-primary/90 transition-colors mt-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary',
              isMenuOpen && 'animate-fade-in'
            )}
            style={{ animationDelay: `${navLinks.length * 100}ms` }}
            tabIndex={isMenuOpen ? 0 : -1}
            role="menuitem"
          >
            {t('letsTalk')}
          </a>
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
