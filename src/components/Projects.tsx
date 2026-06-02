import { useEffect, useRef } from 'react';
import { setupScrollReveal } from '@/utils/animations';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation, Trans } from 'react-i18next';

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

  const projects = [
    {
      title: t('magInvestimentosTitle'),
      description: t('magInvestimentosDesc'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1504&q=80',
      category: ['WordPress', 'HTML5', 'CSS3', 'JavaScript'],
      link: 'https://maginvestimentos.com.br',
      github: '#'
    },
    {
      title: t('usabitTitle'),
      description: t('usabitDesc'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      category: ['PHP', 'Tailwind CSS', 'Sass'],
      link: 'https://usabit.com.br/',
    },
    {
      title: t('travelBlogTitle'),
      description: t('travelBlogDesc'),
      image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80',
      category: ['UI/UX', 'JavaScript'],
      link: '#',
      github: '#'
    },
    {
      title: t('weatherAppTitle'),
      description: t('weatherAppDesc'),
      image: 'https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      category: ['React', 'JavaScript'],
      link: '#',
      github: '#'
    }
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div 
                    className="group overflow-hidden rounded-2xl border border-border hover:shadow-xl transition-all duration-500"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end justify-start p-8">
                        <div className="flex gap-4">
                          <a 
                            href={project.github} 
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Github size={18} />
                          </a>
                          <a 
                            href={project.link} 
                            className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.category.map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 bg-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
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
