'use client';

import { motion } from 'framer-motion';
import { animation } from '@/lib/animations';
import type { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const wordVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.normal, ease: animation.easing },
  },
};

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

export default function RevealText({
  children,
  delay = 0,
  className,
  as: Tag = 'h1',
}: RevealTextProps) {
  const text = typeof children === 'string' ? children : '';
  if (!text) return <Tag className={className}>{children}</Tag>;

  const words = text.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={animation.viewport}
      custom={delay}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
