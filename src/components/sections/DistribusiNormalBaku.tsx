import { useMemo } from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Formula from '../ui/Formula';
import ZScoreCalculator from '../interactive/ZScoreCalculator';
import { normalCDF } from '../../utils/normalDistribution';

export default function DistribusiNormalBaku() {
  const decimals = useMemo(() => [0.00, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09], []);
  const zTableRows = useMemo(
    () =>
      Array.from({ length: 35 }, (_, row) => {
        const zMain = row * 0.1;
        return {
          zMain,
          values: decimals.map((dec) => ({ dec, z: zMain + dec, value: normalCDF(zMain + dec) })),
        };
      }),
    [decimals]
  );

  return (
    <Section
      id="normal-baku"
      title="Distribusi Normal Baku"
      subtitle="Standardisasi distribusi normal dengan Z-score"
      gradient="dark"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card delay={0.1}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Apa itu Distribusi Normal Baku?</h3>
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong className="text-primary-600">Distribusi Normal Baku</strong> (Standard Normal Distribution)
              adalah distribusi normal dengan mean <strong className="text-secondary-600">μ = 0</strong> dan
              standar deviasi <strong className="text-secondary-600">σ = 1</strong>.
            </p>
            <p>
              Setiap distribusi normal <strong className="text-primary-600">N(μ, σ²)</strong> dapat
              ditransformasikan menjadi distribusi normal baku <strong className="text-primary-600">N(0, 1)</strong>.
            </p>
            <div className="glass rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-600 mb-2 font-medium">Rumus Standardisasi (Z-Score):</p>
              <Formula latex={String.raw`Z = \frac{X - \mu}{\sigma}`} display={true} />
            </div>
          </div>
        </Card>

        <Card delay={0.2}>
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">Mengapa Standardisasi?</h3>
          <div className="space-y-4">
            {[
              {
                title: 'Perbandingan',
                desc: 'Memungkinkan perbandingan nilai dari distribusi normal yang berbeda',
                formula: 'Z_1 = Z_2 \\implies \\text{posisi relatif sama}',
              },
              {
                title: 'Probabilitas',
                desc: 'Memudahkan perhitungan probabilitas menggunakan tabel Z',
                formula: 'P(a < X < b) = \\Phi(Z_b) - \\Phi(Z_a)',
              },
              {
                title: 'Interpretasi',
                desc: 'Z-score menunjukkan seberapa jauh suatu nilai dari mean (dalam satuan σ)',
                formula: 'Z = 1 \\implies \\text{satu SD di atas mean}',
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-lg p-3">
                <p className="text-sm font-semibold text-primary-600">{item.title}</p>
                <p className="text-xs text-gray-600 mb-2">{item.desc}</p>
                <Formula latex={item.formula} display={false} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Z-Score Calculator */}
      <Card delay={0.3} variant="">
        <ZScoreCalculator />
      </Card>

      {/* Tabel Z */}
      <Card delay={0.4} className="mt-8">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-6">Tabel Z (CDF Normal Baku)</h3>
        <p className="text-gray-600 text-sm mb-6">
          Tabel berikut menunjukkan Φ(z) = P(Z ≤ z) untuk nilai z dari 0 sampai 4.
          Nilai pada tabel merepresentasikan luas area di bawah kurva normal baku dari -∞ sampai z.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-xs md:text-sm">
            <caption className="sr-only">
              Tabel Z untuk fungsi distribusi kumulatif normal baku dari z 0 sampai 3.49.
            </caption>
            <thead>
              <tr className="bg-gradient-to-r from-primary-500/10 via-primary-400/5 to-secondary-500/10">
                <th scope="col" className="py-3 px-3 text-left text-primary-700 font-bold sticky left-0 bg-inherit z-10">z</th>
                {decimals.map((dec) => (
                  <th key={dec} scope="col" className="py-3 px-1 text-center text-primary-700 font-bold">
                    {dec.toFixed(2)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zTableRows.map((row, rowIndex) => (
                  <tr
                    key={row.zMain}
                    className={`border-b border-gray-100 transition-colors duration-200 ${
                      rowIndex % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/40'
                    } hover:bg-primary-50/60`}
                  >
                    <th scope="row" className="py-2 px-3 text-left text-primary-600 font-bold sticky left-0 bg-inherit z-10">
                      {row.zMain.toFixed(1)}
                    </th>
                    {row.values.map((cell) => (
                      <td
                        key={`${row.zMain}-${cell.dec}`}
                        className="py-2 px-1 text-center text-gray-700 font-mono tabular-nums"
                      >
                        {cell.value.toFixed(4)}
                      </td>
                    ))}
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
}
