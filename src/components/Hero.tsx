import { useEffect, useRef } from 'react';
import { ArrowDown, ExternalLink, Github, Linkedin } from 'lucide-react';
import { addStaggeredDelay } from '@/utils/animations';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (containerRef.current) {
      addStaggeredDelay(containerRef.current, '.stagger-item', 150);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const moveIntensity = 20;
      containerRef.current.style.transform = `perspective(1000px) rotateY(${x * moveIntensity}deg) rotateX(${-y * moveIntensity}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    };
    
    const element = containerRef.current;
    element?.addEventListener('mousemove', handleMouseMove);
    element?.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element?.removeEventListener('mousemove', handleMouseMove);
      element?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div 
          ref={containerRef}
          className="relative transition-all duration-300 ease-out"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-sm font-medium px-3 py-1 bg-secondary rounded-full mb-6 stagger-item reveal visible">
                {t('frontEndDeveloper')}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 stagger-item reveal visible">
                {t('welcome')} | <span className="text-gradient">WordPress</span> {t('specialist')}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg stagger-item reveal visible">
                {t('heroDescription')}
              </p>
              
              <div className="flex flex-wrap gap-4 stagger-item reveal visible">
                <a 
                  href="#projects" 
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
                >
                  {t('seeMyWork')}
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-full border border-border bg-transparent font-medium hover:bg-secondary transition-all"
                >
                  {t('contactMe')}
                </a>
              </div>
              
              <div className="flex mt-12 gap-6 stagger-item reveal visible">
                <a href="https://github.com/Thiagosmmrio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/thiago-mendes-92359525a/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-secondary/50 backdrop-blur-sm animate-float flex items-center justify-center">
                <img
                  src="/profile-portfolio.png"
                  alt="Profile working at the computer"
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl border-4 border-primary shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full transform scale-150 opacity-50"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm mb-2">{t('scrollDown')}</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
