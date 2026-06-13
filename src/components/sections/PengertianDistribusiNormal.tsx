import { useState } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import NormalCurve from '../charts/NormalCurve';

export default function PengertianDistribusiNormal() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const meanId = 'pengertian-mean';
  const stdDevId = 'pengertian-std-dev';

  return (
    <Section
      id="pengertian"
      title="Pengertian Distribusi Normal"
      subtitle="Memahami konsep dasar distribusi normal dan karakteristik kurva distribusi normal"
      gradient="dark"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card delay={0.1}>
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Apa itu Distribusi Normal?</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              <strong className="text-primary-600">Distribusi Normal</strong> (juga dikenal sebagai
              <strong className="text-secondary-600"> Distribusi Gauss</strong>) adalah distribusi probabilitas
              yang paling penting dalam statistika. Distribusi ini menggambarkan bagaimana data
              cenderung terdistribusi secara simetris di sekitar nilai rata-rata (mean).
            </p>
            <p>
              Distribusi normal pertama kali diperkenalkan oleh <strong className="text-accent-600">Abraham de Moivre</strong>
              pada tahun 1733, kemudian dikembangkan lebih lanjut oleh
              <strong className="text-accent-600"> Carl Friedrich Gauss</strong> (1809) dan
              <strong className="text-accent-600"> Pierre-Simon Laplace</strong> (1812).
            </p>
            <p>
              Banyak fenomena alam dan sosial yang mengikuti distribusi normal, seperti tinggi badan,
              berat badan, nilai ujian, kesalahan pengukuran, dan lain sebagainya.
            </p>
          </div>
        </Card>

        <Card delay={0.2}>
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Kurva Normal Interaktif</h3>
          <p className="text-gray-600 text-sm mb-4">
            Geser slider untuk mengubah parameter mean (μ) dan standar deviasi (σ):
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <label htmlFor={meanId}>Mean (μ)</label>
                <span className="text-primary-600 font-semibold">{mean}</span>
              </div>
              <input
                id={meanId}
                type="range" min={-3} max={3} step={0.1}
                value={mean} onChange={(e) => setMean(Number(e.target.value))}
                className="w-full accent-primary-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <label htmlFor={stdDevId}>Std Dev (σ)</label>
                <span className="text-secondary-600 font-semibold">{stdDev}</span>
              </div>
              <input
                id={stdDevId}
                type="range" min={0.5} max={2.5} step={0.1}
                value={stdDev} onChange={(e) => setStdDev(Number(e.target.value))}
                className="w-full accent-secondary-500"
              />
            </div>
          </div>
          <div className="mt-4 bg-white/[0.02] rounded-xl p-3">
            <NormalCurve mean={mean} stdDev={stdDev} height={220} />
          </div>
        </Card>
      </div>

      {/* Sifat-sifat Kurva Normal */}
      <Card delay={0.3}>
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Sifat-sifat Kurva Normal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Simetris',
              desc: 'Kurva berbentuk simetris terhadap mean (μ). Sisi kiri dan kanan kurva adalah cerminan satu sama lain.',
              formula: 'f(\\mu + x) = f(\\mu - x)',
            },
            {
              title: 'Mean = Median = Mode',
              desc: 'Ketiga ukuran tendensi sentral berada pada titik yang sama di puncak kurva.',
              formula: '\\bar{x} = Me = Mo = \\mu',
            },
            {
              title: 'Bentuk Lonjong (Bell-shaped)',
              desc: 'Kurva berbentuk seperti lonceng dengan puncak di mean dan menurun gradually ke kedua sisi.',
              formula: '\\lim_{x \\to \\pm\\infty} f(x) = 0',
            },
            {
              title: 'Luas Total = 1',
              desc: 'Total area di bawah kurva sama dengan 1 (100%), menggambarkan total probabilitas.',
              formula: '\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1',
            },
            {
              title: 'Dibatasi Sumbu X',
              desc: 'Kurva mendekati (tapi tidak pernah menyentuh) sumbu X di kedua arah tak hingga.',
              formula: 'f(x) > 0 \\; \\forall x \\in \\mathbb{R}',
            },
            {
              title: 'Titik Belok',
              desc: 'Terdapat titik belok pada x = μ ± σ, di mana kurva berubah dari cekung ke cembung.',
              formula: "f''(x) = 0 \\text{ di } x = \\mu \\pm \\sigma",
            },
          ].map((sifat, i) => (
            <div
              key={sifat.title}
              className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-300"
            >
              <h4 className="text-sm font-bold text-primary-600 mb-2">{sifat.title}</h4>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">{sifat.desc}</p>
              <div className="flex justify-center">
                <Formula latex={sifat.formula} display={false} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
