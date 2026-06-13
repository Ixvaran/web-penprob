import { useState } from 'react';
import { motion } from 'framer-motion';
import NormalCurve from '../charts/NormalCurve';
import Formula from '../ui/Formula';
import { computeZScore, normalCDF, probabilityBetween, roundTo } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

export default function ProbabilitySlider() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [a, setA] = useState(-1);
  const [b, setB] = useState(1);

  const prob = probabilityBetween(a, b, mean, stdDev);
  const zA = computeZScore(a, mean, stdDev);
  const zB = computeZScore(b, mean, stdDev);
  const ids = {
    mean: 'probability-mean',
    stdDev: 'probability-std-dev',
    lower: 'probability-lower-bound',
    upper: 'probability-upper-bound',
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          Kalkulator Probabilitas P(a &lt; X &lt; b)
        </h4>
        <p className="text-gray-600 text-sm">
          Geser batas a dan b untuk melihat area probabilitas
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor={ids.mean} className="block text-xs text-gray-600 mb-2 font-medium">Mean (μ)</label>
          <input
            id={ids.mean}
            type="range" min={-3} max={3} step={0.1}
            value={mean} onChange={(e) => setMean(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <span className="text-sm text-gray-700">{mean}</span>
        </div>
        <div>
          <label htmlFor={ids.stdDev} className="block text-xs text-gray-600 mb-2 font-medium">Std Dev (σ)</label>
          <input
            id={ids.stdDev}
            type="range" min={0.5} max={2.5} step={0.1}
            value={stdDev} onChange={(e) => setStdDev(Number(e.target.value))}
            className="w-full accent-secondary-500"
          />
          <span className="text-sm text-gray-700">{stdDev}</span>
        </div>
        <div>
          <label htmlFor={ids.lower} className="block text-xs text-gray-600 mb-2 font-medium">Batas Bawah (a)</label>
          <input
            id={ids.lower}
            type="range" min={mean - 3 * stdDev} max={mean + 3 * stdDev} step={0.1}
            value={a} onChange={(e) => setA(Math.min(Number(e.target.value), b))}
            className="w-full accent-accent-500"
          />
          <span className="text-sm text-gray-700">{roundTo(a, 2)}</span>
        </div>
        <div>
          <label htmlFor={ids.upper} className="block text-xs text-gray-600 mb-2 font-medium">Batas Atas (b)</label>
          <input
            id={ids.upper}
            type="range" min={mean - 3 * stdDev} max={mean + 3 * stdDev} step={0.1}
            value={b} onChange={(e) => setB(Math.max(Number(e.target.value), a))}
            className="w-full accent-accent-500"
          />
          <span className="text-sm text-gray-700">{roundTo(b, 2)}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/[0.02] rounded-xl p-4">
        <NormalCurve
          mean={mean}
          stdDev={stdDev}
          shadeLeft={a}
          shadeRight={b}
          shadeColor={CHART_COLORS.secondaryFill}
          annotations={[
            { x: a, label: `a=${roundTo(a, 2)}`, color: '#2dd4bf' },
            { x: b, label: `b=${roundTo(b, 2)}`, color: '#2dd4bf' },
          ]}
          height={250}
        />
      </div>

      {/* Results */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong rounded-xl p-6 text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-gray-600 mb-2">P({roundTo(a, 2)} &lt; X &lt; {roundTo(b, 2)})</p>
        <p className="text-4xl md:text-5xl font-bold text-gradient">{roundTo(prob * 100, 2)}%</p>
        <p className="text-lg text-gray-700 mt-1">= {roundTo(prob, 6)}</p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
          <span>Z₁ = {roundTo(zA, 4)}</span>
          <span>Z₂ = {roundTo(zB, 4)}</span>
        </div>
      </motion.div>

      <div className="glass rounded-xl p-5">
        <p className="text-sm text-gray-700 mb-3 font-medium">Rumus:</p>
        <div className="flex justify-center">
          <Formula latex={`P(${roundTo(a, 2)} < X < ${roundTo(b, 2)}) = \\Phi(${roundTo(zB, 3)}) - \\Phi(${roundTo(zA, 3)}) = ${roundTo(prob, 6)}`} display={true} />
        </div>
      </div>
    </div>
  );
}
