import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Layers, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { NAV_ITEMS } from '../data/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-200 ${
          scrolled || mobileOpen
            ? 'border-b border-white/10 bg-[#090909]/95 backdrop-blur-md'
            : 'border-b border-transparent bg-[#090909]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Zone 1: Clean Brand Mark matching Finguard top-left badge + lowercase geometric wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight lowercase text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F17] sm:text-2xl"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#090909]"
            >
              <Layers className="h-4 w-4 stroke-[2.4]" />
            </span>
            <span>funmedia</span>
          </Link>

          {/* Zone 2: Centered Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active ? 'text-[#FF4F17]' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 bottom-0 left-0 h-0.5 bg-[#FF4F17] transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Right Single Action Link matching Finguard "Sign up ↗" */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:text-[#FF4F17] sm:inline-flex"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#FF4F17]" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-[#FF4F17] hover:text-[#FF4F17] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-30 flex flex-col justify-between overflow-y-auto bg-[#090909] px-6 py-8 text-white lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex min-h-[54px] items-center justify-between font-display text-2xl font-bold tracking-tight transition-colors ${
                      active ? 'text-[#FF4F17]' : 'text-white hover:text-[#FF4F17]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-[#FF4F17]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link
                to="/contact"
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#FF4F17] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#e54310]"
              >
                Let&apos;s Talk
              </Link>
              <p className="mt-4 text-center text-xs text-white/60">
                hello@funmedia.com.np · Nepal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
