import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export default function Formula({ latex, display = true, className = '' }: FormulaProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latex, ref.current, {
          displayMode: display,
          throwOnError: false,
          output: 'html',
        });
      } catch (e) {
        console.error('KaTeX error:', e);
        if (ref.current) {
          ref.current.textContent = latex;
        }
      }
    }
  }, [latex, display]);

  // Both display and inline: render as a span, let the parent handle overflow.
  // Never add overflow/max-width here — it breaks KaTeX's sqrt line rendering.
  return <span ref={ref} className={className} />;
}
