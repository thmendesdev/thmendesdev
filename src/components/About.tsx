import { useEffect, useRef } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { Code, Layout, Zap, PackageCheck } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
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

  const skills = [
    { category: 'Front-End', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'PHP', 'Tailwind CSS', 'Sass'] },
    { category: 'WordPress', items: ['Custom Themes', 'Elementor', 'Performance Optimization'] },
    { category: 'Tools', items: ['Git', 'Figma', 'Webpack'] }
  ];
  
  const services = [
    {
      icon: <Layout className="h-6 w-6" />,
      title: 'WebDevelopment',
      description: 'WebDevelopmentDesc'
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'FrontEndDevelopment',
      description: 'FrontEndDevelopmentDesc'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'PerformanceOptimization',
      description: 'PerformanceOptimizationDesc'
    },
    {
      icon: <PackageCheck className="h-6 w-6" />,
      title: 'CodeQuality',
      description: 'CodeQualityDesc'
    }
  ];

  return (
    <section id="about" className="section-padding px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 bg-secondary rounded-full mb-4 reveal">
            {t('aboutMe')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 reveal">
            <Trans i18nKey="fromIntern">
              From Intern to <span className="text-gradient">Junior Front-End Developer</span>
            </Trans>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            {t('aboutIntro')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-6 reveal">{t('whoIAm')}</h3>
            <p className="text-muted-foreground mb-6 reveal">
              {t('whoIAmDesc1')}
            </p>
            <p className="text-muted-foreground mb-6 reveal">
              {t('whoIAmDesc2')}
            </p>
            <p className="text-muted-foreground reveal">
              {t('whoIAmDesc3')}
            </p>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6 reveal">
            <div className="p-1 bg-gradient-to-r from-primary/20 to-secondary rounded-3xl">
              <div className="bg-background rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6">{t('mySkills')}</h3>
                <div className="space-y-8">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.category}>
                      <h4 className="font-bold mb-3">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item) => (
                          <span 
                            key={item}
                            className="px-3 py-1 bg-secondary rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16 text-center reveal">
          <h3 className="text-2xl md:text-3xl font-bold mb-16">{t('servicesIOffer')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all duration-300 reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-6">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{t(service.title)}</h4>
                <p className="text-muted-foreground">{t(service.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
