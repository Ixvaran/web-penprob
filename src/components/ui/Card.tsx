import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'glass-strong' | '';
  delay?: number;
}

export default function Card({ children, className = '', variant = 'glass', delay = 0 }: CardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const variantClasses = {
    'glass': 'glass rounded-2xl p-6 md:p-8',
    'glass-strong': 'glass-strong rounded-2xl p-6 md:p-8',
    '': 'glass-strong rounded-2xl p-6 md:p-8',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`card-hover ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
