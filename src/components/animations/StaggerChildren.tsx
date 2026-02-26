'use client';

import { motion } from 'framer-motion';
import { animation, staggerContainer } from '@/lib/animations';
import type { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerChildren({
  children,
  staggerDelay = 0.15,
  className,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={animation.viewport}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
