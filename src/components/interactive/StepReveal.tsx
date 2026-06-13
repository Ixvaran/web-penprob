import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  content: React.ReactNode;
}

interface StepRevealProps {
  steps: Step[];
  title?: string;
}

export default function StepReveal({ steps, title = 'Penyelesaian' }: StepRevealProps) {
  const [revealed, setRevealed] = useState<number>(0);
  const baseId = useId();
  const allRevealed = revealed >= steps.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h4 className="text-lg font-heading font-bold text-gray-800">{title}</h4>
        {!allRevealed ? (
          <button
            onClick={() => setRevealed(steps.length)}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            aria-label={`Lihat semua langkah ${title}`}
          >
            Lihat Semua
          </button>
        ) : (
          <button
            onClick={() => setRevealed(0)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={`Sembunyikan semua langkah ${title}`}
          >
            Sembunyikan
          </button>
        )}
      </div>

      <div className="space-y-3" role="list">
        {steps.map((step) => {
          const isExpanded = revealed >= step.number;
          const buttonId = `${baseId}-step-${step.number}-button`;
          const contentId = `${baseId}-step-${step.number}-content`;
          return (
            <div
              key={step.number}
              role="listitem"
              className={`glass rounded-xl border transition-all duration-300 ${
                isExpanded ? 'border-primary-500 ring-2 ring-primary-500/10 shadow-sm' : 'border-gray-200'
              }`}
            >
              {/* Header Button */}
              <button
                id={buttonId}
                onClick={() => setRevealed(isExpanded ? step.number - 1 : step.number)}
                className="w-full p-4 md:p-5 flex items-center justify-between text-left group"
                aria-expanded={isExpanded}
                aria-controls={contentId}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isExpanded ? 'bg-primary-50 text-primary-600' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                    {isExpanded ? (
                      <CheckCircle2 size={15} className="stroke-[2.5]" aria-hidden="true" />
                    ) : (
                      <span className="text-xs font-bold">{step.number}</span>
                    )}
                  </div>
                  <span className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
                    isExpanded ? 'text-primary-700' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    Langkah {step.number}: {step.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 group-hover:text-gray-600"
                  aria-hidden="true"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 md:px-5 md:pb-6 pt-0 border-t border-gray-100 text-gray-700 text-sm leading-relaxed space-y-2">
                      {step.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
