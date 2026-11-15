import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Layers } from 'lucide-react';

export function LogoIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#090909]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
