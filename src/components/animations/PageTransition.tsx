'use client';

import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/lib/animations';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
