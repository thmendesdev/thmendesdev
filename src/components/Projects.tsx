import { useEffect, useRef } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { ExternalLink, Github } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation, Trans } from 'react-i18next';

const GITHUB_BASE = 'https://github.com/thmendesdev';

type Project = {
  title: string;
  description: string;
  image: string;
  category: string[];
  link: string;
  github?: string;
  showViewCode: boolean;
};

const Projects = () => {
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

  const projects: Project[] = [
    {
      title: t('magInvestimentosTitle'),
      description: t('magInvestimentosDesc'),
      image: '/projects/mag-investimentos.png',
      category: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'],
      link: 'https://maginvestimentos.com.br',
      showViewCode: false,
    },
    {
      title: t('magInstitucionalTitle'),
      description: t('magInstitucionalDesc'),
      image: '/projects/mag-institucional.png',
      category: ['HTML5', 'CSS3', 'PHP', 'ACF'],
      link: 'https://mag.com.br',
      showViewCode: false,
    },
    {
      title: t('usabitTitle'),
      description: t('usabitDesc'),
      image: '/projects/usabit.png',
      category: ['PHP', 'JavaScript', 'HTML5', 'CSS3'],
      link: 'https://usabit.com.br/',
      showViewCode: false,
    },
    {
      title: t('spaceTourismTitle'),
      description: t('spaceTourismDesc'),
      image: '/projects/space-tourism.png',
      category: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://space-tourism-thmendesdev.vercel.app/',
      github: `${GITHUB_BASE}/space-tourism`,
      showViewCode: true,
    },
    {
      title: t('dessertShopTitle'),
      description: t('dessertShopDesc'),
      image: '/projects/dessert-shop.png',
      category: ['JavaScript', 'HTML5', 'CSS3'],
      link: 'https://dessert-shop-thmendesdev.vercel.app/',
      github: `${GITHUB_BASE}/dessert-shop`,
      showViewCode: true,
    },
    {
      title: t('sunnysideTitle'),
      description: t('sunnysideDesc'),
      image: '/projects/sunnyside-agency.png',
      category: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://sunnyside-agency-thmendesdev.vercel.app/',
      github: `${GITHUB_BASE}/sunnyside-agency`,
      showViewCode: true,
    },
  ];

  return (
    <section id="projects" className="section-padding px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium px-3 py-1 bg-secondary rounded-full mb-4 reveal">
            {t('myWork')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 reveal">
            <Trans i18nKey="recentProjects">
              Recent <span className="text-gradient">Projects</span>
            </Trans>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            {t('projectsIntro')}
          </p>
        </div>
        
        <div className="reveal">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2 flex">
                  <div 
                    className="group flex flex-col h-full w-full overflow-hidden rounded-2xl border border-border hover:shadow-xl transition-all duration-500"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end justify-start p-8">
                        <div className="flex gap-4">
                          {project.showViewCode && project.github && (
                            <a 
                              href={project.github} 
                              className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={t('viewCode')}
                            >
                              <Github size={18} />
                            </a>
                          )}
                          <a 
                            href={project.link} 
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label={t('liveDemo')}
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-8">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1 min-h-[4.5rem]">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.category.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 bg-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-auto">
                        {project.showViewCode && project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-all"
                          >
                            <Github size={16} />
                            {t('viewCode')}
                          </a>
                        )}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                        >
                          <ExternalLink size={16} />
                          {t('liveDemo')}
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static translate-y-0 mr-4 hover:bg-primary hover:text-primary-foreground" />
              <CarouselNext className="static translate-y-0 hover:bg-primary hover:text-primary-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
