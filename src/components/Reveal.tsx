import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  duration = 550,
  threshold = 0.04,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(getPrefersReducedMotion);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (getPrefersReducedMotion()) return true;
    return typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      const matches = mediaQuery.matches;
      setReducedMotion(matches);
      if (matches) {
        setIsVisible(true);
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || isVisible) return;

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold,
        rootMargin: '0px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, reducedMotion, threshold]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
