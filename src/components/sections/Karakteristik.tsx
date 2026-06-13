import { useState } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import EmpiricalRuleChart from '../charts/EmpiricalRuleChart';

export default function Karakteristik() {
  const [activeSigma, setActiveSigma] = useState(1);

  return (
    <Section
      id="karakteristik"
      title="Karakteristik Distribusi Normal"
      subtitle="Parameter-parameter penting yang mendefinisikan distribusi normal dan aturan empiris"
      gradient="purple"
    >
      {/* Parameter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card delay={0.1}>
          <div className="text-center">
            <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-2">Mean (μ)</h4>
            <p className="text-4xl font-bold text-gradient-primary mb-3">μ</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ukuran tendensi sentral. Menentukan posisi puncak kurva dan pusat distribusi.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200 overflow-x-auto text-center">
              <Formula latex={String.raw`\mu = \frac{\sum_{i=1}^{n} x_i}{n}`} display={true} />
            </div>
          </div>
        </Card>

        <Card delay={0.2}>
          <div className="text-center">
            <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-2">Variance (σ²)</h4>
            <p className="text-4xl font-bold text-secondary-600 mb-3">σ²</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ukuran penyebaran data. Semakin besar variance, semakin lebar kurva normal.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200 overflow-x-auto text-center">
              <Formula latex={String.raw`\sigma^2 = \frac{\sum (x_i - \mu)^2}{n}`} display={true} />
            </div>
          </div>
        </Card>

        <Card delay={0.3}>
          <div className="text-center">
            <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-2">Std Dev (σ)</h4>
            <p className="text-4xl font-bold text-accent-600 mb-3">σ</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Akar kuadrat dari variance. Mengukur sebaran data dalam satuan yang sama dengan data.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200 overflow-x-auto text-center">
              <Formula latex={String.raw`\sigma = \sqrt{\sigma^2}`} display={true} />
            </div>
          </div>
        </Card>
      </div>

      {/* Empirical Rule */}
      <Card delay={0.4} variant="" className="mb-8">
        <h3 className="text-xl font-heading font-bold text-gray-900 text-center mb-6">
          Aturan Empiris (Empirical Rule)
        </h3>
        <p className="text-gray-600 text-sm text-center max-w-2xl mx-auto mb-6">
          Aturan ini berlaku untuk distribusi normal dan menjelaskan persentase data
          yang berada dalam kisaran standar deviasi tertentu dari mean.
        </p>
        <EmpiricalRuleChart activeSigma={activeSigma} onSigmaChange={setActiveSigma} />
      </Card>

      {/* Additional characteristics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card delay={0.5}>
          <h4 className="text-lg font-heading font-bold text-gray-900 mb-4">Skewness &amp; Kurtosis</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-600">γ₁</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Skewness (Kemencengan)</p>
                <p className="text-xs text-gray-600">
                  Distribusi normal memiliki skewness = <strong className="text-secondary-600">0</strong>,
                  artinya kurva simetris sempurna.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-accent-400/10 flex items-center justify-center">
                <span className="text-xl font-bold text-accent-600">γ₂</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Kurtosis (Keruncingan)</p>
                <p className="text-xs text-gray-600">
                  Distribusi normal memiliki kurtosis = <strong className="text-accent-600">3</strong>
                  {' '}(mesokurtic — keruncingan sedang).
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card delay={0.6}>
          <h4 className="text-lg font-heading font-bold text-gray-900 mb-4">Nilai Penting Lainnya</h4>
          <div className="space-y-3">
            {[
              { label: 'Range interkuartil', value: 'IQR = 1.35σ', desc: 'Q₃ - Q₁ = 1.35 × σ' },
              { label: 'Mean Absolute Deviation', value: 'MAD = 0.80σ', desc: 'Rata-rata deviasi absolut dari mean' },
              { label: 'Median', value: '= μ', desc: 'Sama dengan mean pada distribusi normal' },
              { label: 'Mode', value: '= μ', desc: 'Sama dengan mean pada distribusi normal' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between glass rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-600">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <span className="text-sm font-bold text-primary-600">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
