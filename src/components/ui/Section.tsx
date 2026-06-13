import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: 'dark' | 'purple' | 'teal';
}

const gradientClasses = {
  dark: 'from-bg-deep via-bg-deep to-bg-mid',
  purple: 'from-bg-mid via-bg-deep to-bg-mid',
  teal: 'from-bg-deep via-bg-teal-via to-bg-mid',
};

export default function Section({ id, title, subtitle, children, className = '', gradient = 'dark' }: SectionProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 px-4 bg-gradient-to-b ${gradientClasses[gradient]} ${className}`}
    >
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {title && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">{title}</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
            />
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
