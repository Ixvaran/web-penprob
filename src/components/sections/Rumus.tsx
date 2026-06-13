import { useState } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import NormalCurve from '../charts/NormalCurve';
import { CHART_COLORS } from '../../utils/constants';

// Use double backslash in JSX string attrs: \f = form-feed, \l = l, etc.
// So ALL LaTeX commands need \\ prefix inside JSX attribute strings.
const PDF_LATEX = "f(x;\\mu,\\sigma) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-\\dfrac{(x-\\mu)^2}{2\\sigma^2}}";
const CDF_LATEX = "F(x) = \\Phi\\!\\left(\\dfrac{x-\\mu}{\\sigma}\\right) = \\int_{-\\infty}^{x} f(t)\\,dt";

export default function Rumus() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const xValue = 0.5;
  const meanId = 'rumus-mean';
  const stdDevId = 'rumus-std-dev';

  return (
    <Section
      id="rumus"
      title="Rumus Distribusi Normal"
      subtitle="Fungsi kepadatan probabilitas (PDF) dan fungsi distribusi kumulatif (CDF)"
      gradient="teal"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* PDF */}
        <Card delay={0.1}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
            Fungsi Kepadatan Probabilitas (PDF)
          </h3>
          <div className="glass rounded-xl p-5 mb-4 overflow-x-auto">
            <Formula latex={PDF_LATEX} display={true} />
          </div>
          <div className="space-y-2 text-gray-600 text-xs">
            <p><strong className="text-primary-600">f(x)</strong> = nilai fungsi kepadatan probabilitas di titik x</p>
            <p><strong className="text-secondary-600">μ</strong> = mean (rata-rata) populasi</p>
            <p><strong className="text-accent-600">σ</strong> = standar deviasi populasi</p>
            <p><strong className="text-gray-700">π</strong> = 3.14159..., <strong className="text-gray-700">e</strong> = 2.71828...</p>
          </div>
        </Card>

        {/* CDF */}
        <Card delay={0.2}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
            Fungsi Distribusi Kumulatif (CDF)
          </h3>
          <div className="glass rounded-xl p-5 mb-4 overflow-x-auto">
            <Formula latex={CDF_LATEX} display={true} />
          </div>
          <div className="space-y-2 text-gray-600 text-xs">
            <p><strong className="text-primary-600">F(x)</strong> = P(X ≤ x), probabilitas kumulatif dari -∞ sampai x</p>
            <p><strong className="text-secondary-600">Φ(z)</strong> = fungsi distribusi kumulatif normal baku</p>
          </div>
        </Card>
      </div>

      {/* Interactive PDF Explorer */}
      <Card delay={0.3} variant="">
        <h3 className="text-lg font-heading font-bold text-gray-900 text-center mb-6">
          Eksplorasi Kurva Normal
        </h3>
        <p className="text-gray-600 text-sm text-center mb-6">
            Geser parameter untuk melihat bagaimana μ dan σ mempengaruhi bentuk kurva
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <label htmlFor={meanId}>Mean (μ) — posisi puncak</label>
              <span className="text-primary-600 font-semibold">{mean}</span>
            </div>
            <input
              id={meanId}
              type="range" min={-3} max={3} step={0.1}
              value={mean} onChange={(e) => setMean(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Menggeser kurva ke kiri/kanan tanpa mengubah bentuk
            </p>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <label htmlFor={stdDevId}>Std Dev (σ) — lebar kurva</label>
              <span className="text-secondary-600 font-semibold">{stdDev}</span>
            </div>
            <input
              id={stdDevId}
              type="range" min={0.3} max={2.5} step={0.1}
              value={stdDev} onChange={(e) => setStdDev(Number(e.target.value))}
              className="w-full accent-secondary-500"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Semakin kecil σ, semakin tinggi dan runcing kurva
            </p>
          </div>
        </div>

        <div className="bg-white/[0.02] rounded-xl p-4">
          <NormalCurve
            mean={mean}
            stdDev={stdDev}
            shadeLeft={xValue}
            shadeColor={CHART_COLORS.primaryFill}
            height={260}
          />
        </div>

        {/* Explanation card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            {
              title: 'σ kecil (σ < 1)',
              desc: 'Data mengelompok di sekitar mean, kurva tinggi dan runcing (leptokurtic)',
              example: 'Data presisi tinggi',
            },
            {
              title: 'σ sedang (σ ≈ 1)',
              desc: 'Sebaran data normal, kurva dengan keruncingan standar (mesokurtic)',
              example: 'Kebanyakan data alami',
            },
            {
              title: 'σ besar (σ > 1)',
              desc: 'Data tersebar luas, kurva rendah dan landai (platikurtic)',
              example: 'Data dengan variasi tinggi',
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-xl p-4 text-center">
              <p className="text-xs font-semibold text-primary-600 mb-1">{item.title}</p>
              <p className="text-[11px] text-gray-600">{item.desc}</p>
              <p className="text-[10px] text-gray-500 mt-1 italic">{item.example}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
