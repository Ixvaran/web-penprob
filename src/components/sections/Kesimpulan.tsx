import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import { CheckCircle2, BarChart3, Calculator } from 'lucide-react';

export default function Kesimpulan() {
  return (
    <Section
      id="kesimpulan"
      title="Kesimpulan"
      subtitle="Ringkasan konsep-konsep penting yang telah dipelajari"
      gradient="purple"
    >
      {/* Key takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card delay={0.1} variant="glass-strong">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={20} className="text-primary-600" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-gray-900">Distribusi Normal</h4>
              <p className="text-xs text-gray-600">Distribusi probabilitas kontinu yang simetris</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Berbentuk lonceng (bell-shaped) dan simetris terhadap mean',
              'Mean = Median = Mode (terletak di puncak kurva)',
              'Total luas area di bawah kurva = 1 (100%)',
              'Dua parameter: μ (lokasi) dan σ (bentuk/lebar)',
              'Aturan Empiris: 68-95-99.7% data dalam 1-2-3 σ',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card delay={0.2} variant="glass-strong">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
              <Calculator size={20} className="text-secondary-600" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-gray-900">Normal Baku &amp; Invers</h4>
              <p className="text-xs text-gray-600">Standardisasi dan fungsi kuantil</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              'Distribusi Normal Baku: N(0, 1) dengan μ=0, σ=1',
              'Z-Score: mengukur jarak dari mean dalam satuan σ',
              'Rumus: Z = (X - μ) / σ',
              'Tabel Z: digunakan untuk mencari probabilitas',
              'Invers Normal: Φ⁻¹(p) = z, mencari Z dari probabilitas',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-secondary-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Rumus Inti */}
      <Card delay={0.3} variant="">
        <h4 className="text-lg font-heading font-bold text-gray-900 text-center mb-6">Rumus-rumus Inti</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'PDF Normal',
              formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}',
            },
            {
              title: 'Z-Score',
              formula: 'Z = \\frac{X - \\mu}{\\sigma}',
            },
            {
              title: 'Invers Normal',
              formula: 'X = \\mu + \\Phi^{-1}(p) \\cdot \\sigma',
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-xl p-5 text-center">
              <p className="text-xs text-gray-600 mb-3">{item.title}</p>
              <Formula latex={item.formula} display={true} />
            </div>
          ))}
        </div>
      </Card>

      {/* Daftar Pustaka */}
      <Card delay={0.4} variant="glass" className="mt-8">
        <h4 className="text-lg font-heading font-bold text-gray-900 mb-4">Daftar Pustaka</h4>
        <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
          <li>
            Walpole, R. E., Myers, R. H., Myers, S. L., &amp; Ye, K. (1993).{' '}
            <em>Probability and statistics for engineers and scientists</em> (Vol. 5, pp. 326–332). New York: Macmillan.
          </li>
          <li>
            Pratikno, A. S., Prastiwi, A. A., &amp; Ramahwati, S. (2020). Sebaran peluang acak kontinu, distribusi normal,
            distribusi normal baku, distribusi T, distribusi Chi Square, dan distribusi F.{' '}
            <em>Osf Preprints</em>, 27(3), 1–5.
          </li>
        </ol>
      </Card>
    </Section>
  );
}
