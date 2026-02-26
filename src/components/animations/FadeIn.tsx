'use client';

import { motion } from 'framer-motion';
import { animation, fadeInVariants, type FadeDirection } from '@/lib/animations';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = animation.duration.normal,
  className,
}: FadeInProps) {
  const variants = fadeInVariants(direction, duration);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={animation.viewport}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
