// A utility to add scroll reveal animations to elements
export const setupScrollReveal = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target as HTMLElement;
      
      // Skip form elements from animation but ensure they're interactive
      if (target.tagName === 'FORM' || target.closest('form')) {
        target.style.pointerEvents = 'auto';
        return;
      }
      
      if (entry.isIntersecting) {
        // Add visible class and ensure pointer events are enabled
        target.classList.add('visible');
        target.style.pointerEvents = 'auto';
        
        // Add a one-time transition end listener to ensure pointer events stay enabled
        const handleTransitionEnd = () => {
          target.style.pointerEvents = 'auto';
          target.removeEventListener('transitionend', handleTransitionEnd);
        };
        
        target.addEventListener('transitionend', handleTransitionEnd);
        observer.unobserve(target);
      } else {
        // During animation, ensure pointer events are enabled for form elements
        if (target.querySelector('form, input, textarea, button, select')) {
          target.style.pointerEvents = 'auto';
        }
      }
    });
  }, options);

  // Observe all elements with the 'reveal' class
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(element => {
    const el = element as HTMLElement;
    
    // Ensure form elements are always interactive
    if (el.querySelector('form, input, textarea, button, select')) {
      el.style.pointerEvents = 'auto';
    }
    
    observer.observe(el);
  });

  return observer;
};

// Add staggered animation delay to children elements
export const addStaggeredDelay = (parent: HTMLElement, childSelector: string, baseDelay: number = 100) => {
  const children = parent.querySelectorAll(childSelector);
  children.forEach((child, index) => {
    const el = child as HTMLElement;
    el.style.transitionDelay = `${baseDelay * index}ms`;
    
    // Ensure form elements remain interactive during staggered animations
    if (el.querySelector('form, input, textarea, button, select')) {
      el.style.pointerEvents = 'auto';
    }
  });
};

// Cursor follow animation
export const initializeCursorFollow = (element: HTMLElement) => {
  const updatePosition = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    window.requestAnimationFrame(() => {
      element.style.transform = `translate(${clientX}px, ${clientY}px)`;
    });
  };

  document.addEventListener('mousemove', updatePosition);

  return () => {
    document.removeEventListener('mousemove', updatePosition);
  };
};

// Parallax effect on scroll
export const initializeParallax = (elements: NodeListOf<Element>, strength: number = 0.1) => {
  const parallaxScroll = () => {
    const scrollPosition = window.pageYOffset;
    elements.forEach((element) => {
      const offset = (element as HTMLElement).getBoundingClientRect().top;
      const distance = offset - scrollPosition;
      (element as HTMLElement).style.transform = `translateY(${distance * strength}px)`;
    });
  };

  window.addEventListener('scroll', parallaxScroll);

  return () => {
    window.removeEventListener('scroll', parallaxScroll);
  };
};
