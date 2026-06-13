import { useState } from 'react';
import { motion } from 'framer-motion';
import NormalCurve from '../charts/NormalCurve';
import Formula from '../ui/Formula';
import { inverseNormalCDF, normalCDF, roundTo, computeZScore } from '../../utils/normalDistribution';
import { CHART_COLORS } from '../../utils/constants';

export default function InverseNormalCalc() {
  const [probability, setProbability] = useState(0.5);
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);

  const z = inverseNormalCDF(probability);
  const x = mean + z * stdDev;
  const ids = {
    probability: 'inverse-probability',
    mean: 'inverse-mean',
    stdDev: 'inverse-std-dev',
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Kalkulator Invers Normal Baku</h4>
        <p className="text-gray-600 text-sm">Cari nilai Z dari probabilitas kumulatif</p>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor={ids.probability} className="block text-xs text-gray-600 mb-2 font-medium">
            Probabilitas P(Z &lt; z)
          </label>
          <input
            id={ids.probability}
            type="range"
            min={0.001}
            max={0.999}
            step={0.001}
            value={probability}
            onChange={(e) => setProbability(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
          <div className="text-center mt-1">
            <span className="text-lg font-semibold text-primary-600">{roundTo(probability, 4)}</span>
          </div>
        </div>
        <div>
          <label htmlFor={ids.mean} className="block text-xs text-gray-600 mb-2 font-medium">Mean (μ)</label>
          <input
            id={ids.mean}
            type="range"
            min={-5}
            max={5}
            step={0.1}
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
            min={0.5}
            max={3}
            step={0.1}
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
          shadeRight={x}
          shadeColor={CHART_COLORS.primaryFill}
          annotations={[
            { x, label: `z=${roundTo(z, 3)}`, color: '#fbbf24' },
          ]}
          height={250}
        />
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-gray-600 mb-2">Nilai Z</p>
          <p className="text-3xl font-bold text-primary-600">{roundTo(z, 4)}</p>
          <p className="text-xs text-gray-500 mt-2">
            <Formula latex={`\\Phi^{-1}(${roundTo(probability, 4)}) = ${roundTo(z, 4)}`} display={false} />
          </p>
        </div>
        <div className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-gray-600 mb-2">Nilai X (untuk μ={mean}, σ={stdDev})</p>
          <p className="text-3xl font-bold text-secondary-600">{roundTo(x, 4)}</p>
          <p className="text-xs text-gray-500 mt-2">
            <Formula latex={`X = \\mu + Z \\cdot \\sigma = ${mean} + (${roundTo(z, 4)}) \\cdot ${stdDev} = ${roundTo(x, 4)}`} display={false} />
          </p>
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
              <p className="font-semibold text-gray-800">Menemukan Nilai Z-Score dari Tabel Invers</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kita cari nilai Z yang membatasi luas area di sebelah kiri kurva sebesar p = {roundTo(probability, 4)} menggunakan fungsi invers CDF (Φ⁻¹):
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`Z = \Phi^{-1}(p) = \Phi^{-1}(${roundTo(probability, 4)}) = ${roundTo(z, 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Nilai Z = {roundTo(z, 4)} adalah batas standar deviasi pada distribusi normal baku N(0, 1).
              </p>
            </div>
          </div>

          {/* Langkah 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-950/40 text-secondary-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-gray-800">Konversi Nilai Z ke Nilai Asli X (De-standardisasi)</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kita kembalikan nilai Z ke skala variabel asli X menggunakan parameter rata-rata (μ = {mean}) dan standar deviasi (σ = {stdDev}):
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`X = \mu + Z \cdot \sigma = ${mean} + (${roundTo(z, 4)}) \cdot ${stdDev} = ${roundTo(x, 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Sehingga, nilai variabel asli X yang memisahkan {roundTo(probability * 100, 2)}% data di sebelah kiri adalah <strong className="text-secondary-600">{roundTo(x, 4)}</strong>.
              </p>
            </div>
          </div>

          {/* Langkah 3 (Verifikasi) */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-gray-800">Verifikasi Probabilitas Kumulatif</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mari kita verifikasi hasil ini dengan menghitung probabilitas kumulatif untuk nilai Z = {roundTo(z, 4)} menggunakan fungsi CDF normal baku (Φ):
              </p>
              <div className="bg-white/5 dark:bg-white/[0.04] rounded-xl p-3 inline-block overflow-x-auto max-w-full">
                <Formula latex={String.raw`P(Z < ${roundTo(z, 4)}) = \Phi(${roundTo(z, 4)}) \approx ${roundTo(normalCDF(z), 4)}`} display={false} />
              </div>
              <p className="text-xs text-gray-500">
                Nilai probabilitas hasil perhitungan kembali adalah <strong className="text-accent-600">{roundTo(normalCDF(z), 4)}</strong>, yang{' '}
                {Math.abs(normalCDF(z) - probability) < 0.001 ? 'cocok (Valid ✓)' : 'mendekati'} dengan nilai probabilitas target awal Anda ({roundTo(probability, 4)}).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
