import { useId, useMemo } from 'react';
import { motion } from 'framer-motion';

interface EmpiricalRuleChartProps {
  activeSigma: number; // 1, 2, or 3
  onSigmaChange: (sigma: number) => void;
}

const SIGMAS = [1, 2, 3] as const;

export default function EmpiricalRuleChart({ activeSigma, onSigmaChange }: EmpiricalRuleChartProps) {
  const titleId = useId();
  const descId = useId();
  const percentages: Record<number, string> = {
    1: '68.27%',
    2: '95.45%',
    3: '99.73%',
  };

  const descriptions: Record<number, string> = {
    1: '≈ 68% data berada dalam 1 standar deviasi dari mean',
    2: '≈ 95% data berada dalam 2 standar deviasi dari mean',
    3: '≈ 99.7% data berada dalam 3 standar deviasi dari mean',
  };

  const curveData = useMemo(() => {
    const w = 600;
    const h = 220;
    const cx = 300;
    const cy = 140;
    const scaleX = 70;
    const scaleY = 100;
    const pts: string[] = [];

    for (let i = -250; i <= 250; i++) {
      const z = i / scaleX;
      const y = Math.exp(-0.5 * z * z) * scaleY;
      pts.push(`${i === -250 ? 'M' : 'L'}${cx + i},${cy - y}`);
    }

    const areas = SIGMAS.map((sigma) => {
      const areaPts: string[] = [];
      for (let i = -sigma * scaleX; i <= sigma * scaleX; i++) {
        const z = i / scaleX;
        const y = Math.exp(-0.5 * z * z) * scaleY;
        areaPts.push(`${i === -sigma * scaleX ? 'M' : 'L'}${cx + i},${cy - y}`);
      }
      areaPts.push(`L${cx + sigma * scaleX},${cy}Z`);
      return areaPts.join('');
    });

    return { w, h, cx, cy, scaleY, scaleX, curve: pts.join(''), areas };
  }, []);

  return (
    <div className="space-y-6">
      {/* Sigma selector */}
      <div className="flex justify-center gap-3">
        {SIGMAS.map((sigma) => (
          <button
            key={sigma}
            type="button"
            onClick={() => onSigmaChange(sigma)}
            aria-pressed={activeSigma === sigma}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeSigma === sigma
                ? 'bg-primary-500/30 text-primary-600 border border-primary-500/50 shadow-lg shadow-primary-500/10'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {sigma}σ ({percentages[sigma]})
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="relative h-48 md:h-56 flex items-center justify-center">
        <svg
          viewBox="0 0 600 220"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>Visualisasi aturan empiris distribusi normal</title>
          <desc id={descId}>{descriptions[activeSigma]}.</desc>
          {/* Bell curve */}
          {(() => {
            // Colored regions based on activeSigma
            const colors = ['rgba(59,130,246,0.15)', 'rgba(16,185,129,0.15)', 'rgba(245,158,11,0.15)'];
            const strokes = ['#3b82f6', '#10b981', '#f59e0b'];

            return (
              <>
                {/* Shaded areas for active sigma */}
                {Array.from({ length: activeSigma }, (_, layer) => {
                  const sigma = layer + 1;
                  const isActive = sigma === activeSigma;

                  return (
                    <motion.path
                      key={sigma}
                      d={curveData.areas[sigma - 1]}
                      fill={isActive ? colors[sigma - 1] : 'transparent'}
                      stroke={isActive ? strokes[sigma - 1] : 'transparent'}
                      strokeWidth={isActive ? 2 : 0}
                      strokeDasharray="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}

                {/* The curve outline */}
                <path d={curveData.curve} fill="none" stroke="#3b82f6" strokeWidth={2.5} />

                {/* Center line */}
                <line x1={curveData.cx} y1={curveData.cy} x2={curveData.cx} y2={curveData.cy - curveData.scaleY} stroke="rgba(0,0,0,0.15)" strokeWidth={1} strokeDasharray="4,4" />
              </>
            );
          })()}

          {/* Axis labels */}
          {[-3, -2, -1, 0, 1, 2, 3].map((sigma) => {
            const x = 300 + sigma * 70;
            return (
              <text key={sigma} x={x} y={200} textAnchor="middle" fill="rgb(156,163,175)" fontSize="12">
                {sigma === 0 ? 'μ' : sigma > 0 ? `+${sigma}σ` : `${sigma}σ`}
              </text>
            );
          })}
        </svg>

        {/* Percentage badge */}
            <motion.div
          key={activeSigma}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 glass-strong rounded-full px-5 py-2"
            aria-live="polite"
            aria-atomic="true"
        >
          <span className="text-2xl font-bold text-gradient">{percentages[activeSigma]}</span>
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        key={activeSigma}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-700 text-sm"
      >
        {descriptions[activeSigma]}
      </motion.p>
    </div>
  );
}
