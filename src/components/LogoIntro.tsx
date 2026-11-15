import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Layers } from 'lucide-react';

export function LogoIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('fm_intro_seen') !== '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem('fm_intro_seen', '1');
    } catch {
      // Ignore storage access errors
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#090909]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white">
              <Layers className="h-5 w-5 stroke-[2.3]" />
            </span>
            <span className="font-display text-3xl font-extrabold tracking-tight lowercase text-white sm:text-4xl">
              funmedia
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
