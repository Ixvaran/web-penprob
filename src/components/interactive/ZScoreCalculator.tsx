import { useState } from 'react';
import { motion } from 'framer-motion';
import NormalCurve from '../charts/NormalCurve';
import Formula from '../ui/Formula';
import { computeZScore, normalCDF, roundTo } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

export default function ZScoreCalculator() {
  const [x, setX] = useState(85);
  const [mean, setMean] = useState(70);
  const [stdDev, setStdDev] = useState(10);

  const z = computeZScore(x, mean, stdDev);
  const probZ = normalCDF(z);
  const probRight = 1 - probZ;
  const ids = {
    x: 'z-score-x',
    mean: 'z-score-mean',
    stdDev: 'z-score-std-dev',
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Kalkulator Z-Score</h4>
        <p className="text-gray-600 text-sm">Hitung Z-score dan probabilitas dari suatu nilai</p>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor={ids.x} className="block text-xs text-gray-600 mb-2 font-medium">Nilai X</label>
          <input
            id={ids.x}
            type="range"
            min={mean - 4 * stdDev}
            max={mean + 4 * stdDev}
            step={0.5}
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="text-center mt-1">
            <span className="text-lg font-semibold text-primary-600">{x}</span>
          </div>
        </div>
        <div>
          <label htmlFor={ids.mean} className="block text-xs text-gray-600 mb-2 font-medium">Mean (μ)</label>
          <input
            id={ids.mean}
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={mean}
            onChange={(e) => setMean(Number(e.target.value))}
            className="w-full accent-secondary-500"
          />
          <div className="text-center mt-1">
            <span className="text-lg font-semibold text-secondary-600">{mean}</span>
          </div>
        </div>
        <div>
          <label htmlFor={ids.stdDev} className="block text-xs text-gray-600 mb-2 font-medium">Std Dev (σ)</label>
          <input
            id={ids.stdDev}
            type="range"
            min={1}
            max={30}
            step={0.5}
            value={stdDev}
            onChange={(e) => setStdDev(Number(e.target.value))}
            className="w-full accent-accent-500"
          />
          <div className="text-center mt-1">
            <span className="text-lg font-semibold text-accent-600">{stdDev}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/[0.02] rounded-xl p-4">
        <NormalCurve
          mean={mean}
          stdDev={stdDev}
          shadeLeft={x}
          shadeColor={CHART_COLORS.primaryFill}
          annotations={[
            { x, label: `X=${x}`, color: '#fbbf24' },
          ]}
          height={250}
        />
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">Z-Score</p>
          <p className="text-2xl font-bold text-primary-600">{roundTo(z, 4)}</p>
          <p className="text-[10px] text-gray-500 mt-1">
            <Formula latex={`Z = \\frac{${x} - ${mean}}{${stdDev}} = ${roundTo(z, 4)}`} display={false} />
          </p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">P(Z &lt; {roundTo(z, 2)})</p>
          <p className="text-2xl font-bold text-secondary-600">{roundTo(probZ, 4)}</p>
          <p className="text-[10px] text-gray-500 mt-1">Probabilitas kumulatif</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">P(Z &gt; {roundTo(z, 2)})</p>
          <p className="text-2xl font-bold text-accent-600">{roundTo(probRight, 4)}</p>
          <p className="text-[10px] text-gray-500 mt-1">Probabilitas ekor kanan</p>
        </div>
      </motion.div>

      {/* Langkah Penyelesaian Dinamis */}
      <div className="glass rounded-2xl p-6 border border-primary-500/10 shadow-sm relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500" />
        
        <h5 className="text-base font-heading font-bold text-gray-900 mb-5 flex items-center gap-2 pl-2">
          📝 Langkah Penyelesaian Dinamis (Langkah-demi-Langkah)
        </h5>

        <div className="space-y-6 text-sm text-gray-700 pl-2">
          {/* Langkah 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950/40 text-primary-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-gray-800">Standardisasi Nilai X ke Z-Score</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kita gunakan rumus Z-score untuk menghitung berapa standar deviasi nilai X = {x} berada dari rata-rata (μ = {mean}):
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`Z = \frac{X - \mu}{\sigma} = \frac{${x} - ${mean}}{${stdDev}} = \frac{${roundTo(x - mean, 4)}}{${stdDev}} = ${roundTo(z, 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Nilai Z = {roundTo(z, 4)} menunjukkan bahwa data kita berada sekitar{' '}
                <strong className="text-primary-600">{roundTo(Math.abs(z), 2)}</strong> standar deviasi di{' '}
                <strong className="text-primary-600">{z >= 0 ? 'kanan (atas)' : 'kiri (bawah)'}</strong> rata-rata.
              </p>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-950/40 text-secondary-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-gray-800">Menentukan Probabilitas Kumulatif Ekor Kiri P(X &lt; {x})</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kita cari nilai Z = {roundTo(z, 2)} di tabel distribusi normal baku Φ(z) untuk mencari probabilitas data bernilai kurang dari {x}:
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`P(X < ${x}) = P(Z < ${roundTo(z, 2)}) = \Phi(${roundTo(z, 2)}) \approx ${roundTo(probZ, 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Artinya, peluang terpilihnya nilai kurang dari {x} secara acak adalah sekitar{' '}
                <strong className="text-secondary-600">{roundTo(probZ * 100, 2)}%</strong>.
              </p>
            </div>
          </div>

          {/* Langkah 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-gray-800">Menentukan Probabilitas Ekor Kanan P(X &gt; {x})</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Karena total area di bawah kurva probabilitas normal bernilai 1, peluang data bernilai lebih dari {x} adalah komplemen dari ekor kiri:
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`P(X > ${x}) = 1 - P(X < ${x}) = 1 - ${roundTo(probZ, 4)} = ${roundTo(probRight, 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Sehingga peluang terpilihnya nilai lebih besar dari {x} adalah{' '}
                <strong className="text-accent-600">{roundTo(probRight * 100, 2)}%</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
